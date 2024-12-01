'use client';

import ErrorMessage from "@/components/error/errorText";
import { useState } from "react";

const SearchableSelect = ({
    id,
    title,
    defaultOptionIds,
    options,
    defaultId,
    onChange
}: {
    id: string;
    title: string;
    defaultOptionIds?: Array<string>;
    options: Array<{ id: string; label: string; value?: string; secondary?: boolean }>;
    defaultId?: string;
    onChange: (id: string) => void | Promise<void>;
}) => {
    const handleSelect = async (option?: Record<string, any>) => {
        if (!option || option?.secondary) return;
        const { id } = option
        await onChange(id);
    }
    return (
        <div className='flex flex-col gap-5 w-full' id={id}>
                <label className="block font-medium">
                    {title}
                </label>
                <div className='flex flex-row gap-5'>
                    {
                        defaultOptionIds ?
                            [...defaultOptionIds?.map((id) => options?.find((option) => option.id === id)), {
                                id: 'more',
                                label: 'More',
                                value: 'more',
                                secondary: true
                            }].map((option) => {
                                return (
                                    <div 
                                        onClick={() => handleSelect(option)}
                                        id={option?.id} 
                                        className={`p-5 flex justify-center items-center hover:bg-primary cursor-pointer rounded-full pr-10 pl-10 ${defaultId === option?.id ? 'bg-primary' : option?.secondary ? 'bg-tertiary' : 'bg-secondary'}`}>
                                        {
                                            option?.label
                                        }
                                    </div>
                                );
                            })
                            :
                            options?.map((option) => {
                                return (
                                    <div id={option.id} className={`p-5 flex justify-center items-center bg-secondary hover:bg-primary ${option?.secondary ? 'bg-tertiary' : 'bg-secondary'}`}>
                                        {
                                            option.label
                                        }
                                    </div>
                                );
                            })
                    }
                </div>
                <ErrorMessage message={''}/>
            </div>
    );
}

export default SearchableSelect;