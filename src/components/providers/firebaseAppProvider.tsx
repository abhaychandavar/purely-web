'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import firebaseConfig from '@/utils/helpers/firebase/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';

interface FirebaseAppProviderContextType {
  app: FirebaseApp | undefined;
}

const FirebaseAppProviderContext = createContext<FirebaseAppProviderContextType | undefined>(undefined);

interface FirebaseAppProviderContext {
  children: ReactNode;
}

export const FirebaseAppProvider: React.FC<FirebaseAppProviderContext> = ({ children }) => {
  const [app, setApp] = useState<FirebaseApp>();
  const navigator = useRouter();
  const usePath = usePathname();

  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    setApp(firebaseApp);

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const token = await user?.getIdToken();
      console.log('USER ACCESS TOKEN', token);
      if (user && usePath !== '/auth/signin') {
        navigator.replace('/app/connect');
      } else {
        navigator.replace('/auth/signin');
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!app) return;
    
    
  }, [app, navigator]);
  
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