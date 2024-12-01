'use client';

import React, { useState, useEffect } from 'react';
import { type Auth, getAuth, PhoneAuthProvider, signInWithCredential, signInWithCustomToken } from 'firebase/auth';
import Image from 'next/image';
import PrimaryButton from '@/components/primaryButton';// Assuming OTPInput is placed under /components
import OTPInput from './otpInput';
import CircularSecondaryButton from '@/components/circularSecondaryButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useFirebaseApp } from '@/components/providers/firebaseAppProvider';
import appConfig from '@/config/config';

const OtpView = ({
  verificationId,
  goBack
}: {
  verificationId: string,
  goBack: () => void;
}) => {
  const [auth, setAuth] = useState<Auth>();
  const navigator = useRouter();
  const { app } = useFirebaseApp();

  useEffect(() => {
    if (!app) return;
    const firebaseAuth = getAuth(app);
    setAuth(firebaseAuth);
  }, []);

  const handleOTPComplete = async (otp: string) => {
    if (!auth) return;
    const authCredential = PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await signInWithCredential(auth, authCredential);
    if (!userCredential.user) {
      throw new Error('Could not authorize user');
    }
    const idToken = await userCredential.user.getIdToken();
    await purelySignin(idToken);
  };

  const purelySignin = async (authToken: string) => {
    if (!auth) return;
    const host = appConfig.services.auth.baseUrl;
    const { data: tokenData } = await axios.get(`${host}/token`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const userCredential = await signInWithCustomToken(auth, tokenData.data);
    if (!userCredential.user) {
      throw new Error('Could not authorize user');
    }
    console.log('User data', userCredential.user);
    navigator.replace('/app/connect');
  }

  return (
    <div className='w-full flex flex-col gap-5 p-5 md:w-1/3'>
      <h1>
        We’ve sent you a <strong>code</strong><br /> Just Verify and You're Good to Go
      </h1>
      
      {/* OTP Input Section */}
        <OTPInput length={6} onComplete={handleOTPComplete} />

      {/* Button Section */}
      <div className='flex flex-row gap-2 items-center w-full'>
        <CircularSecondaryButton subElement={
            <Image
              src='/icons/backArrow.svg'
              alt='Back'
              width={40}
              height={40}
              className='opacity-50'
            />
        } onClick={goBack}/>
        <PrimaryButton title='Get in!' className='text-[1rem] md:text-[1.5rem] flex-1' />
        </div>

        <p>Didn't receive the code yet? <span className='text-blue-500 underline cursor-pointer'>Resend it!</span> in <span>00:00</span></p>
    </div>
  );
};

export default OtpView;
