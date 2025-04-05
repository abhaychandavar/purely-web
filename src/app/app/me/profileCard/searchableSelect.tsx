'use client';

import ErrorMessage from "@/components/error/errorText";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleSelect = async (option?: Record<string, any>) => {
        if (!option || option?.secondary) return;
        const { id } = option
        await onChange(id);
    }
    useEffect(() => {
        console.log('DEFAULT_ID', defaultId, options);
    }, [defaultId, options])
    return (
        <div className='flex flex-col gap-5 w-full' id={id} key={id}>
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
                            }].map((option, idx) => {
                                if ( option?.secondary) {
                                    return (<Modal
                                        key={idx + 'default-label'}
                                        triggerElement={
                                            <div 
                                                onClick={() => handleSelect(option)}
                                                id={option?.id} 
                                                className={`p-5 flex justify-center items-center hover:bg-primary cursor-pointer rounded-full pr-10 pl-10 bg-tertiary`}
                                                >
                                                {
                                                    option?.label
                                                }
                                            </div>
                                        }
                                        body={
                                            <div className="overflow-y-scroll max-h-[60%]">
                                                {
                                                    options.map((option, idx) => {
                                                        return (
                                                            <div key={idx + 'non-default-label'} onClick={() => {
                                                                handleSelect(option);
                                                                setIsOpen(false);
                                                            }}
                                                                className={
                                                                    `flex flex-row gap-5 p-5 cursor-pointer transition-all border-b-2 border-overBackgroundOutline hover:bg-highlight ${defaultId === option?.id ? 'bg-primary' : 'bg-transparent'}`
                                                                }
                                                            >
                                                                {
                                                                    option.label
                                                                }
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        }
                                        title={title}
                                        modalControls={false}
                                        open={isOpen}
                                        onClose={() => setIsOpen(false)}
                                    >

                                    </Modal>)
                                }
                                return (
                                    <div 
                                        onClick={() => handleSelect(option)}
                                        id={option?.id} 
                                        key={idx + 'primary-elements'}
                                        className={`p-5 flex justify-center items-center hover:bg-primary cursor-pointer rounded-full pr-10 pl-10 ${defaultId === option?.id ? 'bg-primary' : option?.secondary ? 'bg-tertiary' : 'bg-secondary'}`}
                                        >
                                        {
                                            option?.label
                                        }
                                    </div>
                                );
                            })
                            :
                            options?.map((option, idx) => {
                                return (
                                    <div onClick={() => handleSelect(option)} key={idx + "opt-list"} id={option.id} className={`flex flex-row justify-center items-center rounded-full gap-5 pt-2 pb-2 md:pb-5 md:pt-5 p-5 cursor-pointer transition-all border-b-2 border-overBackgroundOutline hover:bg-highlight ${defaultId === option?.id ? 'bg-primary' : 'bg-secondary'} outline-none border-none`}>
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