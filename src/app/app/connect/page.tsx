'use client';
import NavPanel from "@/components/nav/navPanel";
import ProfileComponent from "@/components/profiles/profileComponent";
import profileService from "@/services/profile";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Connect = () => {
    const [profiles, setProfiles] = useState<Array<Record<string, any>>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getProfiles = async () => {
        const profiles = await profileService.getProfiles();
        setProfiles(profiles);
    }

    useEffect(() => {
        getProfiles();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1 < profiles.length ? prev + 1 : 0));
    };

    const currentProfile = profiles?.[currentIndex];

    return (
        <main className="h-full w-full">
            <AnimatePresence mode="wait">
                {currentProfile && (
                    <motion.div
                        key={currentProfile._id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex justify-center"
                    >
                        <ProfileComponent
                            bio={currentProfile.bio}
                            name={currentProfile.name}
                            prompts={currentProfile.prompts.map((p: any) => ({
                                label: p.prompt.label,
                                answer: p.answer,
                                id: p.prompt._id,
                                order: p.prompt.order
                            }))}
                            media={currentProfile.mediaDetails.map((md: Record<string, any>) => ({
                                orgImgURL: md.media?.url,
                                blurredImgURL: md.blurredImage?.url,
                                order: md?.order || 0,
                                id: md._id
                            }))}
                            onNextProfile={
                                handleNext
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default Connect;
