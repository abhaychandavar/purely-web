'use client';
import NavPanel from "@/components/nav/navPanel";
import profileService from "@/services/profile";
import { useEffect, useState } from "react";

const Connect = () => {
    const [profiles, setProfiles] = useState<Array<Record<string, any>>>([]);
    const getProfiles = async () => {
        const profiles = await profileService.getProfiles();
        setProfiles(profiles);
    }
    useEffect(() => {
        getProfiles();
    }, [])
    return (
        <main className="flex flex-row gap-0">
            {
                profiles?.map((profile) => <div key={profile.id}>{JSON.stringify(profile)}</div>) || <></>
            }
        </main>
    );
}

export default Connect;