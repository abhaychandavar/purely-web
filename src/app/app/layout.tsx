import NavPanel from "@/components/nav/navPanel";

const appLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-row gap-0">
            <NavPanel />
            {children}
        </main>
    );
}

export default appLayout;