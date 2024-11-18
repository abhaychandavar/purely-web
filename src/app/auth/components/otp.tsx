'use client';

import React, { useState, useEffect } from 'react';
import { type Auth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithCustomToken, signInWithPhoneNumber } from 'firebase/auth';
import FirebaseApp from '@/utils/helpers/firebase/firebase';
import Divider from '@/components/divider/divider';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import CountryCodeSelectionModal from './countryCodeSelectionModal';
import PrimaryButton from '@/components/primaryButton';// Assuming OTPInput is placed under /components
import OTPInput from './otpInput';
import CircularSecondaryButton from '@/components/circularSecondaryButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const OtpView = ({
  verificationId,
  goBack
}: {
  verificationId: string,
  goBack: () => void;
}) => {
  const [auth, setAuth] = useState<Auth>();
  const navigator = useRouter();

  useEffect(() => {
    setAuth(auth);
  }, []);
  const handleOTPComplete = async (otp: string) => {
    if (!auth) return;
    console.log('OTP Entered:', otp);
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
    const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8080';
    const { data: tokenData } = await axios.get(`${host}/token`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    await signInWithCustomToken(auth, tokenData.data);
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
              width={80}
              height={80}
              className='opacity-50'
            />
        } className='flex-[0.05]' onClick={goBack}/>
        <PrimaryButton title='Get in!' className='text-[1rem] md:text-[1.5rem] flex-1' />
        </div>

        <p>Didn't receive the code yet? <span className='text-blue-500 underline cursor-pointer'>Resend it!</span> in <span>00:00</span></p>
    </div>
  );
};

export default OtpView;
