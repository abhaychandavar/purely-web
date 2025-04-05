import NavPanel from "@/components/nav/navPanel";

const appLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col lg:flex-row gap-0">
            <NavPanel />
            <div className="flex-[0.5]"></div>
            <div className="min-h-full overflow-y-scroll p-10 flex-1">
                {children}
            </div>
            <div className="hidden lg:flex lg:flex-[0.5]">
            </div>
            <div className="min-h-20 lg:hidden"></div>
        </main>
    );
}

export default appLayout;