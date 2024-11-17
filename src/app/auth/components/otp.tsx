'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
import FirebaseApp from '@/utils/helpers/firebase/firebase';
import Divider from '@/components/divider/divider';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import CountryCodeSelectionModal from './countryCodeSelectionModal';
import PrimaryButton from '@/components/primaryButton';// Assuming OTPInput is placed under /components
import OTPInput from './otpInput';
import CircularSecondaryButton from '@/components/circularSecondaryButton';

const auth = getAuth(FirebaseApp.getApp());

const OtpView = ({
  verificationId,
  goBack
}: {
  verificationId: string,
  goBack: () => void;
}) => {
  const handleOTPComplete = async (otp: string) => {
    console.log('OTP Entered:', otp);
    const authCredential = PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await signInWithCredential(auth, authCredential);
    if (userCredential.user) {
      
    }
  };

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
