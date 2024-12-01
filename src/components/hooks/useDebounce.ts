'use client';

import { useRef } from "react";

function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timeoutRef = useRef<number | null>(null);

    const debouncedCallback = (...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
}

export default useDebounce;