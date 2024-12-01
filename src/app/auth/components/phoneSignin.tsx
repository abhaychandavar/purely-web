'use client';

import React, { useState } from 'react';
import Divider from '@/components/divider/divider';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import CountryCodeSelectionModal from './countryCodeSelectionModal';
import PrimaryButton from '@/components/primaryButton';
import { useForm, SubmitHandler } from "react-hook-form"
import ErrorMessage from '@/components/error/errorText';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useScreenLoader } from '@/components/providers/screenLoaderProvider';

type Inputs = {
  phone: string
}

const PhoneSignIn = ({
  handleAuth
}: {
  handleAuth: (phoneNumber: string) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState({ dialCode: '+91', countryCode: 'IN' });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const countryCode = country.dialCode;
      const phone = `${countryCode}${data.phone.trim()}`;
      await handleAuth(phone);
      console.log('Verification code sent.');
      setLoading(false);
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const themeData = useTheme();

  return (
    <div className='flex flex-col gap-5 p-5 w-full md:w-1/3'>
      <h1 className='text-left text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] leading-tight'>
  We need your <strong>phone number!</strong> No Creepy Calls, Pinky Swear
</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
        <div className={`flex flex-row gap-[10px] p-2 md:p-5 rounded-full border-2 border-solid border-overBackgroundOutline items-center min-w-fit justify-center ${errors.phone && 'border-danger'}`}>
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
          <input maxLength={10} className='w-full h-full border border-none outline-none focus:outline-none bg-transparent text-[1.5rem] text-overBackground' type='tel' pattern="[0-9]{10}" placeholder='1234567890' {...register("phone", 
          { validate: (value: string) => {
            if (isValidPhoneNumber(`${country.dialCode}${value}`)) {
              return true;
            }
            return 'Please provide a valid phone number';
          }, maxLength: 10 })} ></input>
        </div>
        {errors.phone && <ErrorMessage message='Please provide a valid phone number' icon={
          <Image
            src="/icons/error.svg"
            width={20}
            height={20}
            alt='error'
          />
        } />}

          
        </div>
        <div id="recaptcha" className="absolute"></div>
        <PrimaryButton title='Continue' className='text-[1.5rem] min-w-full' isLoading={isLoading} />
      </form>
    </div>
  );
};

export default PhoneSignIn;

