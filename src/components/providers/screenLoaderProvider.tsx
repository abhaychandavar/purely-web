'use effect';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Lottie from 'lottie-react';
interface ScreenLoaderContextType {
  setLoading: (value: boolean) => void;
}

const ScreenLoaderContext = createContext<ScreenLoaderContextType | undefined>(undefined);

interface ScreenLoaderProviderProps {
  children: ReactNode;
}

export const ScreenLoaderProvider: React.FC<ScreenLoaderProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/lottie/purelyLogoLoop.json')
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
      })
      .catch((error) => {
        console.log('Error loading Lottie animation:', error);
      });
  }, []);
  
  return (
    <ScreenLoaderContext.Provider value={{ setLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-overlay z-20">
          <Lottie
            animationData={animationData}
            className="flex justify-center items-center w-20"
            loop={true}
            autoplay={true}
          />
        </div>
      )}
    </ScreenLoaderContext.Provider>
  );
};

export const useScreenLoader = (): ScreenLoaderContextType => {
  const context = useContext(ScreenLoaderContext);
  if (!context) {
    throw new Error('useScreenLoader must be used within a ScreenLoaderProvider');
  }
  return context;
};
