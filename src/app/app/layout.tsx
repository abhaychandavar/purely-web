'use client'
import NavPanel from "@/components/nav/navPanel";
import { useEffect, useRef, useState } from "react";

const appLayout = ({ children }: { children: React.ReactNode }) => {
    const navRef = useRef<HTMLDivElement>();
    const [navBarHeight, setNavBarHeight] = useState(0);
    useEffect(() => {
        console.log('navRef?.current?.offsetHeight', navRef?.current?.offsetHeight)
        setNavBarHeight(navRef?.current?.offsetHeight || 0)
    }, [navRef?.current?.offsetHeight])
    return (
        <main className="flex flex-col lg:flex-row gap-0 h-full">
            <NavPanel ref={navRef} />
            <div className={`hidden md:flex flex-[0.5]`}></div>
            <div className="overflow-y-scroll flex-1">
                {children}
            </div>
            <div className="hidden lg:flex lg:flex-[0.5]">
            </div>
            <div className={`min-h-[${navBarHeight}px] min-w-[100%] lg:hidden`} style={{
                minHeight: `${navBarHeight}px`,
                minWidth: '100%'
            }}></div>
        </main>
    );
}

export default appLayout;