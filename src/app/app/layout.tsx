import NavPanel from "@/components/nav/navPanel";

const appLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-row gap-0">
            <NavPanel className="flex-[0.5]" />
            <div className="flex-[0.5]"></div>
            <div className="min-h-full overflow-y-scroll p-10 flex-1">
                {children}
            </div>
            <div className="flex-[0.5]">
            </div>
        </main>
    );
}

export default appLayout;