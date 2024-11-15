'use client';

import { useState } from 'react';

const CircularSecondaryButton = ({
    subElement,
    className = '',
}: {
    subElement: React.ReactNode;
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
            className={`flex aspect-square justify-center items-center bg-secondary rounded-full p-2 md:p-5 text-overBackground cursor-pointer transition-all transform ${
                isPressed ? 'scale-95' : 'scale-100'
            } ${className}`}
        >
            {subElement}
        </div>
    );
};

export default CircularSecondaryButton;
