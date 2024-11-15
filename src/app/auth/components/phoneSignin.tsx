'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
import FirebaseApp from '@/utils/helpers/firebase/firebase';
import Divider from '@/components/divider/divider';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import CountryCodeSelectionModal from './countryCodeSelectionModal';
import PrimaryButton from '@/components/primaryButton';

const auth = getAuth(FirebaseApp.getApp());

const PhoneSignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState({ dialCode: '+91', countryCode: 'IN' });
  const themeData = useTheme();

  return (
    <div className='flex flex-col gap-5 p-5 w-full md:w-1/3'>
      <h1 className='text-left text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] leading-tight'>
  We need your <strong>phone number!</strong> No Creepy Calls, Pinky Swear
</h1>
      <div className='flex flex-row gap-[10px] p-2 md:p-5 rounded-full border-2 border-solid border-overBackgroundOutline items-center min-w-fit justify-center'>
        <CountryCodeSelectionModal setCountryCode={(data: {
          countryCode: string,
          countryName: string,
          dialCode: string
        }) => {
          setCountry({
            countryCode: data.countryCode,
            dialCode: data.dialCode,
          });
        }} triggerElement={<div className='flex flex-row gap-2' >
          <h2 className='hidden md:flex'><strong>{country.countryCode}</strong></h2>
          <h2>{country.dialCode}</h2>
          <Image
            src={themeData.systemTheme === 'dark' ? "/icons/angleDownLight.svg" : "/icons/angleDown.svg"}
            alt="Expand"
            width={20}
            height={20}
            priority
            className='opacity-30'
          />
        </div>}></CountryCodeSelectionModal>
        <Divider isVertical={true} />
        <input maxLength={10} className='w-full h-full border border-none outline-none focus:outline-none bg-transparent text-[1.5rem] text-overBackground' type='tel' pattern="[0-9]{10}" placeholder='1234567890'></input>
      </div>
      <PrimaryButton title='Continue' className='text-[1.5rem]' />
    </div>
  );
};

export default PhoneSignIn;
