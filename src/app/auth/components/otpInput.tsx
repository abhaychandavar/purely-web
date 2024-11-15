import React, { useState, useRef } from 'react';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus next input field
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updatedOtp.join('').length === length) {
      onComplete(updatedOtp.join(''));
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData('text');
    if (/[^0-9]/.test(pastedValue)) return; // Allow only digits

    const updatedOtp = [...otp];
    const newOtp = pastedValue.split('').slice(0, length);
    newOtp.forEach((digit, index) => {
      updatedOtp[index] = digit;
    });
    setOtp(updatedOtp);

    // Set focus to the last input if the OTP is pasted
    inputRefs.current[length - 1]?.focus();
    onComplete(updatedOtp.join(''));
  };

  // Handle keydown event (for backspace)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="w-full flex space-x-4 justify-center">
      {new Array(length).fill('').map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          placeholder='0'
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-full  h-12 text-center text-[1.5rem] border-b-2 border-gray-300 focus:outline-none"
          ref={(el) => { inputRefs.current[index] = el; }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
