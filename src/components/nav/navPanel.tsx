'use client';

import Image from "next/image";
import NavCard from "./navCard";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NavPanel = ({ className }: { className?: string }) => {
    const themeData = useTheme();
    const pathName = usePathname();
    useEffect(() => {
        console.log('Path name', pathName);
    }, [])
    return (
        <div className={`min-h-screen flex flex-col justify-between ${className || ''} fixed top-0`}>
            <NavCard icon={
                    <Image
                        src="/purely.svg"
                        alt="Purely logo"
                        width={180}
                        height={38}
                        priority
                    />
                }
                href="/"
                isActive={pathName === '/'}
            />

            <div className="w-full flex flex-col">
                <NavCard 
                    icon={
                        <Image
                            src={themeData.systemTheme === 'dark' ? '/icons/connect/connectLight.svg' :"/icons/connect/connect.svg"}
                            alt="Connect"
                            width={20}
                            height={20}
                            priority
                            className="w-[2rem]"
                        />
                    }
                    iconFilled={
                        <Image
                            src={themeData.systemTheme === 'dark' ? '/icons/connect/connectLightFilled.svg' :"/icons/connect/connectFilled.svg"}
                            alt="Connect"
                            width={20}
                            height={20}
                            priority
                            className="w-[2rem]"
                        />
                    }
                    text="Connect"
                    href="/app/connect"
                    isActive={pathName === '/app/connect'}
                />
                <NavCard 
                    icon={
                        <Image
                            src={themeData.systemTheme === 'dark' ? '/icons/bell/bellLight.svg' :"/icons/bell/bell.svg"}
                            alt="Bell"
                            width={20}
                            height={20}
                            priority
                            className="w-[2rem]"
                        />
                    }
                    iconFilled={
                        <Image
                            src={themeData.systemTheme === 'dark' ? '/icons/bell/bellLightFilled.svg' :"/icons/bell/bellFilled.svg"}
                            alt="Bell"
                            width={20}
                            height={20}
                            priority
                            className="w-[2rem]"
                        />
                    }
                    text="Notifications"
                    href="/app/notifications"
                    isActive={pathName === '/app/notifications'}
                />
                <NavCard 
                    icon={
                        <div className={`border-solid border-2 ${pathName === '/app/me' ? 'border-overBackground' : 'border-outline'} rounded-full aspect-square w-[2rem] h-[2rem]`}>
                            <Image
                                src="/defaultUserPic.png"
                                alt="Connect"
                                width={24}
                                height={24}
                                priority
                                className="min-h-full min-w-full rounded-full aspect-square"
                            />
                        </div>
                    }
                    text="Profile"
                    href="/app/me"
                    isActive={pathName === '/app/me'}
                />
            </div>

            <div></div>
        </div>
    ) 
}

export default NavPanel;