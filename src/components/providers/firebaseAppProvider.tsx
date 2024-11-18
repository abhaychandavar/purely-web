'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import firebaseConfig from '@/utils/helpers/firebase/config';
import { FirebaseApp, initializeApp } from 'firebase/app';

interface FirebaseAppProviderContextType {
  app: FirebaseApp | undefined;
}

const FirebaseAppProviderContext = createContext<FirebaseAppProviderContextType | undefined>(undefined);

interface FirebaseAppProviderContext {
  children: ReactNode;
}

export const FirebaseAppProvider: React.FC<FirebaseAppProviderContext> = ({ children }) => {
  const [app, setApp] = useState<FirebaseApp>();
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    setApp(firebaseApp);
  }, []);
  
  return (
    <FirebaseAppProviderContext.Provider value={{app}}>
      {children}
    </FirebaseAppProviderContext.Provider>
  );
};

export const useFirebaseApp = (): FirebaseAppProviderContextType => {
  const context = useContext(FirebaseAppProviderContext);
  if (!context) {
    throw new Error('useFirebaseApp must be used within a FirebaseAppProviderContext');
  }
  return context;
};