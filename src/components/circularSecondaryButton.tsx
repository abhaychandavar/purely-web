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
        // Reset the pressed state after the animation ends (300ms in this case)
        setTimeout(() => {
            setIsPressed(false);
        }, 300);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex aspect-square justify-center items-center bg-secondary rounded-full text-overBackground cursor-pointer transition-all transform ${isPressed ? 'scale-95' : 'scale-100'
                } ${className}`}
            style={{ padding: '0.5rem' }}
        >
            {subElement}
        </div>

    );
};

export default CircularSecondaryButton;
