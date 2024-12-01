import ErrorMessage from "@/components/error/errorText";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ChangeEventHandler, DetailedHTMLProps, SelectHTMLAttributes } from "react";

const Select = ({
    id,
    value,
    label,
    options,
    onChange,
    dummySelectLabel
}: {
    id: string,
    value?: string,
    label?: string,
    options: { id: string, value: string, label: string }[],
    onChange?: ChangeEventHandler<HTMLSelectElement>,
    dummySelectLabel?: string
}) => {
    const themeData = useTheme();
    return (<div className='flex flex-col gap-5 w-full'>
       {label ? <label htmlFor={id} className="block font-medium">
            {label}
        </label> : <></>}
        <div className='flex flex-row gap-5'>
            <div className="relative w-full border-2 border-highlight rounded-lg">
                <select
                    id={id}
                    name={id}
                    className="appearance-none w-full p-5 pr-10 border-none outline-none bg-transparent cursor-pointer"
                    onChange={onChange}
                    value={value}
                >
                    {[...(dummySelectLabel ? [<option key={'dummy'} value={'dummy'}>
                            {dummySelectLabel}
                        </option>] : []), ...options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))]}
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
        <ErrorMessage message={""}/>
    </div>);
}

export default Select;