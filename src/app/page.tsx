'use client';
import { useFirebaseApp } from "@/components/providers/firebaseAppProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const navigator = useRouter();
  const { app } = useFirebaseApp();

  useEffect(() => {
    if (!app) return;
    
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigator.replace('/app/connect');
      } else {
        navigator.replace('/auth/signin');
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [app, navigator]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image 
          src='/purely.svg'
          width={180*2}
          height={38*2}
          alt="Purely"
          className="object-contain"
        />
      </main>
    </div>
  );
}
