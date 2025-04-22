'use client';

import { useState } from 'react';

const CircularSecondaryButton = ({
    subElement,
    className = '',
    onClick = () => { }
}: {
    subElement: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(true);
        onClick();
        setTimeout(() => {
            setIsPressed(false);
        }, 300);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                w-14 h-14
                min-w-14 min-h-14
                max-w-14 max-h-14
                inline-flex justify-center items-center 
                bg-secondary text-overBackground 
                rounded-full 
                cursor-pointer 
                transition-transform 
                ${isPressed ? 'scale-95' : 'scale-100'} 
                ${className}
            `}
        >
            {subElement}
        </button>
    );
};

export default CircularSecondaryButton;