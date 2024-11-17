'use client';

import { ThemeProvider } from "next-themes";
import PhoneSignIn from "@/app/auth/components/phoneSignin";
import TopBar from "@/app/auth/components/topBar";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import FirebaseApp from "@/utils/helpers/firebase/firebase";
import { useEffect, useState } from "react";
import OtpView from "../components/otp";
import { RecaptchaVerifier } from "firebase/auth";
import { ScreenLoaderProvider } from "@/components/providers/screenLoaderProvider";

const auth = getAuth(FirebaseApp.getApp());

const Auth = () => {
    const [verificationId, setVerificationfId] = useState<string | null>(null);
    const handleAuth = async (phoneNumber: string) => {
        const applicationVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha',
            {
              size: 'invisible',
            },
          );
        const result = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
        console.log('result', result);
        if (!result.verificationId) {
            throw new Error('Could not authorize user');
        }
        setVerificationfId(result.verificationId);
    }
    return (
        <ScreenLoaderProvider>
            <main className="h-screen flex flex-col items-center">
                <TopBar />
                <div className="w-[90%] md:w-full h-full flex justify-center items-center">
                    <ThemeProvider attribute="class">
                        {verificationId ? <OtpView goBack={() => setVerificationfId(null)} verificationId={verificationId} /> : <PhoneSignIn handleAuth={handleAuth}/>}
                    </ThemeProvider>
                </div>
            </main>
        </ScreenLoaderProvider>
    )
}

export default Auth;