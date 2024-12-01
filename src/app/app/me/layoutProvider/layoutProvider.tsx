'use client'
import profileService from "@/services/profile";
import { createContext, useContext, useEffect, useState } from "react";

type LayoutProviderContextType = {
    layout: Array<Record<string, any>>;
}

const layoutProviderContext = createContext<LayoutProviderContextType | undefined>(undefined);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [layout, setLayout] = useState([]);
    const getCreateProfileLayout = async () => {
        const profile = await profileService.getProfileLayout();
        return profile;
    }
    const handleGetLayout = async () => {
        const layoutData = await getCreateProfileLayout();
        if (layoutData) {
            setLayout(layoutData);
        }
    }
    useEffect(() => {
        handleGetLayout();
    }, []);
    return (
        <layoutProviderContext.Provider value={{
            layout
        }}>
            {children}
        </layoutProviderContext.Provider>
    );
}

export default LayoutProvider;

export const useLayout = (): LayoutProviderContextType => {
    const context = useContext(layoutProviderContext);
    if (!context) {
      throw new Error('useLayout must be used within a LayoutProviderContextType');
    }
    return context;
  };