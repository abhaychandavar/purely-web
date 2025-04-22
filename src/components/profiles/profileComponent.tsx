"use client";

import Image from "next/image";
import PrimaryButton from "../primaryButton";
import { useTheme } from "next-themes";
import CircularSecondaryButton from "../circularSecondaryButton";

const ProfileComponent = (params: {
    media: Array<{
        orgImgURL: string,
        blurredImgURL?: string,
        order: number,
        id: string
    }>,
    name: string,
    bio: string,
    prompts: Array<{
        label: string,
        answer: string,
        id: string,
        order: number
    }>
    onNextProfile: () => void
}) => {
    const themeData = useTheme();
    const { media, name, bio, prompts, onNextProfile } = params;

    const LikeButton = () => (
        <div className="rounded-full shadow-md p-2 cursor-pointer">
            <Image
                alt="heart"
                src={"/icons/heartPrimary.svg"}
                width={24}
                height={24}
            />
        </div>
    );

    const displayPrompts = () => {
        prompts.sort((a, b) => a.order - b.order);
        return prompts.map((prompt) => (
            <div key={prompt.id}>
                <div className="font-bold">{prompt.label}</div>
                <p>{prompt.answer}</p>
                <LikeButton />
            </div>
        ));
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Top Bar */}
            <div className="w-full h-full overflow-y-auto">
            <div id="topBar" className="flex items-center gap-5 p-5">
                <Image
                    src={media?.[0]?.blurredImgURL || media?.[0].orgImgURL}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt={name}
                />
                <div className="font-bold">{name}</div>
            </div>

            {/* Scrollable Content */}
            <div id="profileDetails" className="flex-1 p-5 space-y-5">
                <div>
                    <p className="font-bold">Bio</p>
                    <p>{bio}</p>
                    <LikeButton />
                    <div className="h-0.5 bg-overBackgroundOutline" />
                </div>
                <div className="flex flex-col gap-5">
                    {displayPrompts()}
                </div>
            </div>
            </div>
            {/* Bottom Bar */}
            <div id="bottomBar" className="flex  flex-row md:flex-row-reverse gap-5 items-center p-5 shadow-md">
                <CircularSecondaryButton
                    onClick={onNextProfile}
                    subElement={
                        <Image
                            alt="next"
                            src={`/icons/${themeData.systemTheme === 'dark' ? 'closeLight' : 'close'}.svg`}
                            width={24}
                            height={24}
                        />
                    }
                />
                <PrimaryButton
                    className="w-full"
                    child={
                        <div className="flex gap-2 items-center">
                            <p>Message me</p>
                            <Image
                                alt="message"
                                src={`/icons/${themeData.systemTheme === 'dark' ? 'messageLight' : 'message'}.svg`}
                                width={24}
                                height={24}
                            />
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default ProfileComponent;
