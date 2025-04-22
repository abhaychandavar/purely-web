'use client';

import { useState } from 'react';
import PurelyLoader from './purelyLoadingAnimation';

const PrimaryButton = ({
    title,
    className = '',
    id,
    child,
    isLoading = false,
    isDisabled = false,
    onClick
}: {
    title?: string;
    className?: string;
    id?: string;
    child?: React.ReactNode,
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
}) => {
    const [isPressed, setIsPressed] = useState(false);
    if (!child && !title) {
        throw new Error('Primary button requires either a title or a child element');
    }
    const handleClick = () => {
        setIsPressed(true);
        
        // Reset the pressed state after the animation ends (300ms in this case)
        setTimeout(() => {
            setIsPressed(false);
        }, 300);

        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            id={id}
            type='submit'
            onClick={(isLoading || isDisabled) ? () => {} : handleClick}
            className={`flex justify-center items-center bg-primary rounded-full p-2 md:p-5 text-background cursor-pointer transition-all transform ${
                isPressed ? 'scale-95' : 'scale-100'
            } ${className}`}
        >
            {isLoading ? <PurelyLoader className='h-[1.5rem] aspect-square'/> : title || child}
        </button>
    );
};

export default PrimaryButton;
