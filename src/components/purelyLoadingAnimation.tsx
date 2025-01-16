'use client';

import Lottie from "lottie-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const PurelyLoader = ({
    className
}: {
    className?: string
}) => {
    const themeData = useTheme();
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
      const type = themeData.systemTheme === 'light' ? 'light' : themeData.systemTheme === 'dark' ? 'dark' : 'primary';
      fetch(`/lottie/${type === 'light' ? 'purelyLogoLoopLight' : type === 'dark' ? 'purelyLogoLoopDark' : 'purelyLogoLoop'}.json`)
        .then((response) => response.json())
        .then((data) => {
          setAnimationData(data);
        })
        .catch((error) => {
          console.log('Error loading Lottie animation:', error);
        });
    }, []);
    
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={className}>
            <Lottie
                animationData={animationData}
                className={`flex justify-center items-center w-20 ${className || ''}`}
                loop={true}
                autoplay={true}
            />
            </motion.div>
          </AnimatePresence>
    );
}

export default PurelyLoader;