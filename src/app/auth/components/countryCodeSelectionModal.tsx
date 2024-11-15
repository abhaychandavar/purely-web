'use client';

import countryCodes from '@/utils/countriesAndDialCodes';
import { useState, useRef, useEffect } from 'react';

const CountryCodeSelectionModal = ({
    triggerElement,
    setCountryCode,
}: {
    triggerElement: React.ReactNode;
    setCountryCode: ({ countryCode, countryName, dialCode }: { countryCode: string, countryName: string, dialCode: string }) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [placeholder, setPlaceholder] = useState('');

    const typingSpeed = 100; // Speed of typing (shortened)
    const backspacingSpeed = 80; // Speed of backspacing (shortened)
    const loopDelay = 1000; // Shortened delay after one complete cycle

    // Randomly select a country from the list and return the formatted details
    const getRandomCountryDetails = () => {
        const randomIndex = Math.floor(Math.random() * countryCodes.length);
        const country = countryCodes[randomIndex];
        return [
            `${country.dial_code}`,   // Prefix with "Search for" + dial code
            `${country.code || 'N/A'}`, // Prefix with "Search for" + country code
            `${country.name}`          // Prefix with "Search for" + country name
        ];
    };

    // Typing effect logic
    useEffect(() => {
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;
        const countryDetails = getRandomCountryDetails();

        const type = () => {
            const currentDetail = countryDetails[currentIndex];
            if (isDeleting) {
                currentText = currentDetail.slice(0, currentText.length - 1);
                setPlaceholder(currentText);
                if (currentText.length === 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % countryDetails.length;
                    timeoutId = setTimeout(type, loopDelay); // Wait before starting next detail
                } else {
                    timeoutId = setTimeout(type, backspacingSpeed); // Faster backspacing
                }
            } else {
                currentText = currentDetail.slice(0, currentText.length + 1);
                setPlaceholder(currentText);
                if (currentText.length === currentDetail.length) {
                    isDeleting = true;
                    timeoutId = setTimeout(type, loopDelay); // Shorter pause after completing detail
                } else {
                    timeoutId = setTimeout(type, typingSpeed); // Faster typing
                }
            }
        };

        // Start typing effect when the modal is open
        if (isOpen) {
            type();
        }

        // Cleanup effect on unmount or when modal is closed
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isOpen]);

    // Filter the country codes based on the search query
    const filteredCountries = countryCodes.filter((country) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            country.dial_code.toLowerCase().includes(searchLower) ||
            country.code.toLowerCase().includes(searchLower) ||
            country.name.toLowerCase().includes(searchLower)
        );
    });

    const handleCountryCode = (data: {
        countryCode: string;
        countryName: string;
        dialCode: string;
    }) => {
        setCountryCode(data);
        setIsOpen(false); // Optional: Close modal after selection
    };

    // Close the modal if clicked outside of it
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    // Add event listener on component mount and cleanup on unmount
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Render trigger element */}
            <div className="p-0 m-0 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {triggerElement}
            </div>

            {isOpen && (
                <div className="absolute z-10 top-0 left-0 bg-overlay w-full h-full flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="w-3/4 max-w-3xl h-3/4 overflow-y-auto rounded-2xl shadow-lg bg-card p-5 flex flex-col md:flex-col-reverse" // Change to flex-col-reverse for md screens
                    >
                        {/* Table */}
                        <div className="overflow-y-auto flex-1"> {/* Make the table container grow to take available space */}
                            <table className="w-full table-auto mb-4">
                                <thead>
                                    <tr className="bg-highlight sticky top-0 z-10">
                                        <th className="px-4 py-2 text-left">Dial Code</th>
                                        {/* Hide Country Code on mobile */}
                                        <th className="hidden md:table-cell px-4 py-2 text-left">Country Code</th>
                                        <th className="px-4 py-2 text-left">Country Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCountries
                                        .sort((a, b) => (a.code > b.code ? 1 : -1)) // Sorting from A-Z by country code
                                        .map((country, index) => (
                                            <tr
                                                key={index}
                                                className="cursor-pointer hover:bg-highlight"
                                                onClick={() => handleCountryCode({
                                                    countryCode: country.code,
                                                    dialCode: country.dial_code,
                                                    countryName: country.name,
                                                })}
                                            >
                                                <td className="px-4 py-2">{country.dial_code}</td>
                                                {/* Hidden Country Code on mobile */}
                                                <td className="hidden md:table-cell px-4 py-2">{country.code || 'N/A'}</td>
                                                <td className="px-4 py-2">{country.name}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Search bar at the bottom on small screens, and at the top on md+ screens */}
                        <div className="mb-4 md:mt-4 md:mb-0">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search for ${placeholder}`}
                                className="w-full p-5 pt-2 pb-2 m-0 md:mb-4 border-2 bg-transparent border-solid border-overBackgroundOutline rounded-full outline-none focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CountryCodeSelectionModal;
