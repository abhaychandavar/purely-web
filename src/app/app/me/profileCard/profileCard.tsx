'use client'

import CircularSecondaryButton from '@/components/circularSecondaryButton';
import ErrorMessage from '@/components/error/errorText';
import PrimaryButton from '@/components/primaryButton';
import profileService from '@/services/profile';
import pAxios from '@/utils/http/pAxios';
import { profile } from 'console';
import { AnimatePresence, motion, Reorder } from 'motion/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useState } from 'react';

interface ImageElement {
    id?: string;
    type?: string;
    label?: string;
    requiredCount?: number;
    count?: number;
}

const RenderImageLayout = ({ element }: { element: ImageElement }) => {
    const { count = 0 } = element;

    // Initialize items
    const [items, setItems] = useState(
        Array.from({ length: count }, (_, index) => ({
            id: `image-${index}`,
            label: `Click to upload image ${index + 1}`,
        }))
    );

    // State to keep track of the currently dragged item
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    // Handle drag start
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    // Handle drop
    const handleDrop = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;

        // Reorder the items
        const updatedItems = [...items];
        const [draggedItem] = updatedItems.splice(draggedIndex, 1);
        updatedItems.splice(index, 0, draggedItem);

        setItems(updatedItems);
        setDraggedIndex(null);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                    <label htmlFor={item.id} className="flex flex-col items-center">
                        <span className="text-gray-600">{item.label}</span>
                        <input
                            type="file"
                            id={item.id}
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                </div>
            ))}
        </div>
    );
};


interface LayoutElement {
    id?: string;
    type?: string;
    label?: string;
    required?: boolean;
    iconUrl?: string;
    placeholder?: string;
    inputType?: string;
    isLogicalGroup?: boolean;
    elements?: LayoutElement[];
    inputElement?: {
        placeholder: string;
        inputType: string;
    };
    promptFetchEndpoint?: string;
    count?: number;
    uniquePrompts?: boolean;
    staticPrompts?: string[];
}

interface OptionElement {
    id?: string;
    type?: string;
    label?: string;
    required?: boolean;
    options?: Array<{
        "label": string,
        "value": string,
        "id": string,
        secondary?: boolean
    }>
    defaultOptionIds?: Array<string>
}

const ProfileCard = ({ layoutData, continueButtonText, handleContinue, handleBack, currentCardIndex }: { layoutData: LayoutElement, currentCardIndex: number, continueButtonText: string, handleContinue: () => void, handleBack: () => void }) => {
    const themeData = useTheme();
    const [profileData, setProfileData] = useState<Record<string, any>>({});
    const [errorData, setErrorData] = useState<Record<string, any>>({});
    const [layoutValidationInfo, setLayoutValidationInfo] = useState<Record<string, any>>({});

    // Render input field
    const renderInput = (element: LayoutElement) => {
        if (element.id && !layoutValidationInfo[element.id]) {
            setLayoutValidationInfo({ ...layoutValidationInfo, [element.id]: {
                required: element.required,
                message: 'Please let us know your name'
            } });
        }
        return (
            <div key={element.id} className="flex flex-col gap-5">
                <label htmlFor={element.id} className="block font-medium">
                    {element.label}
                </label>
                <input
                    type={element.inputType || 'text'}
                    id={element.id}
                    name={element.id}
                    placeholder={element.placeholder || ''}
                    required={element.required}
                    className="mt-1 block w-full p-5 border-b-2 border-overBackgroundOutline focus:border-overBackgroundOutlinePrimary outline-none"
                    onChange={(e) => element.id ? (() => {setProfileData({ ...profileData, [element.id]: e.target.value }); setErrorData({ ...profileData, [element.id]: '' }) })() : (() => {})()}
                />
                <ErrorMessage message={element.id && errorData[element.id]}/>
            </div>
        );
    };

    // Render prompts
    const renderPrompts = (element: LayoutElement) => {
        const count = element?.count || 3;
        const uniquePrompts = element?.uniquePrompts || false;
        const promptElements: any[] = [];
        if (element.id && !layoutValidationInfo[element.id]) {
            setLayoutValidationInfo({ ...layoutValidationInfo, [element.id]: {
                required: element.required,
                message: `Prompts are mandatory, please fill them in`
            } });
        }
        if (element.id && !profileData[element.id] && element.staticPrompts) {
            const promptsDefaultData: Record<string, any> = {};
            for (let i = 0; i < count; i++) {
                promptsDefaultData[element.staticPrompts[i]] = '';
            }
        }

        for (let i = 0; i < count; i++) {
            promptElements.push(
                <div>
                <div key={element.id} className="flex flex-col gap-5">
                
                <select
                    defaultValue={element?.staticPrompts?.[i]}
                    className="appearance-none w-full p-5 pr-10 border-none outline-none bg-transparent cursor-pointer"
                >
                    {element.staticPrompts?.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Image
                        src={`/icons/${themeData.systemTheme === 'dark' ? 'angleDownLight' : 'angleDown'}.svg`}
                        width={24}
                        height={24}
                        alt="Select"
                    />
                </div>
            </div>
            <textarea
                    className='w-full resize-none border-2 outline-none border-overBackgroundOutline p-5 rounded-sm'
                    placeholder={element.placeholder}
                />
            </div>
            )
        }
        return (
            <div className='min-w-full'>
                {promptElements}
            </div>
        );
    };

    const renderImageLayout = (element: ImageElement) => {
        return (
            <RenderImageLayout element={element} />
        );
    }

    const renderSearchableSelect = (element: OptionElement) => {
        if (element.id && !layoutValidationInfo[element.id]) {
            setLayoutValidationInfo({ ...layoutValidationInfo, [element.id]: {
                required: element.required,
                message: 'Please select an option'
            } });
        }
        return (
            <div className='flex flex-col gap-5 w-full'>
                <label htmlFor={element.id} className="block font-medium">
                    {element.label}
                </label>
                <div className='flex flex-row gap-5'>
                    {
                        element?.defaultOptionIds ?
                            [...element.defaultOptionIds?.map((id) => element.options?.find((option) => option.id === id)), {
                                id: 'more',
                                label: 'More',
                                value: 'more',
                                secondary: true
                            }].map((option) => {
                                return (
                                    <div 
                                        onClick={() => option?.value !== 'more' && option?.id && element.id && setProfileData({
                                            ...profileData,
                                            [element.id]: option?.id
                                        })}
                                        id={option?.id} 
                                        className={`p-5 flex justify-center items-center hover:bg-primary cursor-pointer rounded-full pr-10 pl-10  ${element.id && (option?.id === profileData[element.id]) ? 'bg-primary' : option?.secondary ? 'bg-tertiary' : 'bg-secondary'}`}>
                                        {
                                            option?.label
                                        }
                                    </div>
                                );
                            })
                            :
                            element.options?.map((option) => {
                                return (
                                    <div id={option.id} className='p-5 flex justify-center items-center bg-secondary hover:bg-primary'>
                                        {
                                            option.label
                                        }
                                    </div>
                                );
                            })
                    }
                </div>
                <ErrorMessage message={element.id && errorData[element.id]}/>
            </div>
        )
    }

    const renderSelect = (element: OptionElement) => {
        if (element.id && !layoutValidationInfo[element.id]) {
            setLayoutValidationInfo({ ...layoutValidationInfo, [element.id]: {
                required: element.required,
                message: 'Please select an option'
            } });
        }
        if (element.id && !profileData[element.id]) {
            setProfileData({ ...profileData, [element.id]: element.options?.[0]?.value });
        }
        return (
            <div className='flex flex-col gap-5 w-full'>
                <label htmlFor={element.id} className="block font-medium">
                    {element.label}
                </label>
                <div className='flex flex-row gap-5'>
                    <div className="relative w-full border-2 border-highlight rounded-lg">
                        <select
                            id={element.id}
                            name={element.id}
                            defaultValue={element.options?.[0]?.value}
                            className="appearance-none w-full p-5 pr-10 border-none outline-none bg-transparent cursor-pointer"
                            onChange={(e) => {
                                element.id ? (() => {setProfileData({ ...profileData, [element.id]: e.target.value }); setErrorData({ ...profileData, [element.id]: '' })})() : (() => {})();
                            }}
                        >
                            {element.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Image
                                src={`/icons/${themeData.systemTheme === 'dark' ? 'angleDownLight' : 'angleDown'}.svg`}
                                width={24}
                                height={24}
                                alt="Select"
                            />
                        </div>
                    </div>
                </div>
                <ErrorMessage message={element.id && errorData[element.id]}/>
            </div>
        )
    }

    // Render layout elements recursively
    const renderElement = (element: LayoutElement): React.ReactNode => {
        switch (element?.type) {
            case 'input':
                return renderInput(element);
            case 'prompt':
                return renderPrompts(element);
            case 'searchableSelect':
                return renderSearchableSelect(element);
            case 'select':
                return renderSelect(element);
            case 'image':
                return renderImageLayout(element);
            default:
                return null;
        }
    };

    const buildLayout = (layout: LayoutElement): React.ReactNode => {
        return (
            <div key={layout.id} className="flex flex-col gap-5">
                {(layout?.elements && layout.elements.length) ? <h1>{layout.label}</h1> : <></>}
                {renderElement(layout)}
                {layout?.elements?.map((subElement) => buildLayout(subElement))}
            </div>
        );
    };

    const validateProfileData = (data: Record<string, any>, layoutInfo: Record<string, any>) => {
        console.log('data', data)
        for (const key in layoutInfo) {
            if (layoutInfo[key]?.required && !data[key]) {
                console.log('errorData', { ...errorData, [key]: 'This field is required' });
                setErrorData({ ...errorData, [key]: layoutInfo[key].message || 'This field is required' });
            } else {
                setErrorData({ ...errorData, [key]: '' });
            }
        }
    }
    const handleContinueClicked = async () => {
        console.log(profileData);
        await profileService.upsertProfile({
            data: profileData,
            purpose: 'date'
        });
        validateProfileData(profileData, layoutValidationInfo);
        // handleContinue();
    }

    return (<AnimatePresence mode='wait'>
        <motion.div key={layoutData.id} exit={{ opacity: 0 }} className='flex flex-col gap-5'>
            {buildLayout(layoutData)}
            <div className='flex flex-row gap-5 w-full'>
                {currentCardIndex > 0 && <CircularSecondaryButton subElement={<Image src={'/icons/backArrow.svg'} width={24} height={24} alt="Back" />} onClick={handleBack} />}
                <PrimaryButton title={continueButtonText || 'Next'} onClick={handleContinueClicked} className='flex-1' />
            </div>
        </motion.div>
    </AnimatePresence>);
};

export default ProfileCard;
