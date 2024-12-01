'use client';

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import profileService from "@/services/profile";
import Modal from "@/components/modal";
import Image from "next/image";
import { useTheme } from "next-themes";

const LocationSearch = ({
    handleLocationSelect,
    locationLabel,
    lat,
    lng,
    title
}: {
    handleLocationSelect?: (locationLabel: string, lat: number, lng: number) => void,
    locationLabel?: string,
    lat?: number,
    lng?: number,
    title?: string
}) => {
    const [searchStr, setSearchStr] = useState<string | null>(null);
    const [locations, setLocations] = useState<Array<Record<string, any>>>([]);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const themeData = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const debouncedSetProfile = useDebounce((value: string) => {
        setSearchStr(value);
    }, 300);

    const searchLocation = async (place: string) => {
        const res = await profileService.searchLocations({ query: place });
        setNextPageToken(res.nextPageToken || null);
        setLocations(res.results || []);
    };

    useEffect(() => {
        if (!searchStr) {
            setLocations([]);
            setNextPageToken(null);
            return;
        }
        searchLocation(searchStr);
    }, [searchStr]);

    return (
        <div className="w-full flex flex-col gap-5">
            <h1>{title || "Location"}</h1>
            <Modal 
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                open={isOpen}
                triggerElement={
                    <div className="p-5 w-full border-2 border-overBackgroundOutline rounded-md flex justify-between items-center">
                        {locationLabel ? locationLabel : "Select your location"}
                        <Image
                            width={24}
                            height={24}
                            src={`/icons/${themeData.systemTheme === 'dark' ? 'angleDownLight' : 'angleDown'}.svg`}
                            alt="Arrow"
                        />
                    </div>
                }
                body={
                    <div className="min-h-[30rem] max-h-[30rem]">
                        <div className="flex flex-row gap-2 w-full h-full">
                            <input
                                type="text"
                                placeholder={locationLabel || 'Search for a location'}
                                onChange={(e) => {
                                    debouncedSetProfile(e.target.value);
                                }}
                                className="outline-none p-5 w-full border-2 border-overBackgroundOutline rounded-md"
                            />
                        </div>
                        <div className="min-h-full overflow-y-scroll">
                            {locations.map((l, index) => (
                                <div key={index} className="flex flex-row gap-5 p-5 cursor-pointer bg-transparent hover:bg-card transition-all" onClick={()=>{
                                        handleLocationSelect?.(l.formatted_address, l.geometry.location.lat, l.geometry.location.lng);
                                        setIsOpen(false);
                                    }}>
                                    <p>{l.formatted_address || "Unknown address"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                title="Location"
                modalControls={false}
            />
        </div>
    );
};

export default LocationSearch;
