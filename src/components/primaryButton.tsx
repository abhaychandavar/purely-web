'use client';

import { useState } from 'react';

const PrimaryButton = ({
    title,
    className = '',
}: {
    title: string;
    className?: string;
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(true);

        // Reset the pressed state after the animation ends (300ms in this case)
        setTimeout(() => {
            setIsPressed(false);
        }, 300);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex justify-center items-center bg-primary rounded-full p-2 md:p-5 text-overBackground cursor-pointer transition-all transform ${
                isPressed ? 'scale-95' : 'scale-100'
            } ${className}`}
        >
            {title}
        </div>
    );
};

export default PrimaryButton;
