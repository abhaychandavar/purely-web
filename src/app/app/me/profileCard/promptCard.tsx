import Modal from "@/components/modal";
import Select from "@/components/select/select";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const PromptCard = ({id, selectedPromptId, answer, prompts, promptPlaceholder, setPromptAnswer, setSelectedPrompt}: {
    id: string
    promptPlaceholder: string
    selectedPromptId?: string,
    answer?: string,
    prompts: Array<{
        id: string;
        label: string;
    }>,
    setSelectedPrompt: (promptId: string) => void,
    setPromptAnswer: (promptAnswer: string, promptId: string) => void
}) => {
    const themeData = useTheme();
    const [localPromptAnswer, setLocalPromptAnswer] = useState(answer);
    const [localSelectedPromptId, setLocalSelectedPromptId] = useState(selectedPromptId);
    useEffect(() => {
        setLocalSelectedPromptId(selectedPromptId);
    }, [selectedPromptId]);
    useEffect(() => {
        setLocalPromptAnswer(answer);
    }, [answer]);
    return (
       <Modal triggerElement={
        <div className="w-full flex flex-col gap-5 rounded-lg border-2 border-overBackgroundOutline p-5">
            <div className="flex flex-row justify-between outline-overBackgroundOutline">
                <label>{localSelectedPromptId ? prompts.find((p) => p.id === localSelectedPromptId)?.label : promptPlaceholder || 'Select a prompt'}</label>
                <Image
                        src={`/icons/${themeData.systemTheme === 'dark' ? 'angleDownLight' : 'angleDown'}.svg`}
                        width={24}
                        height={24}
                        alt="Select"
                    />
            </div>
            {
                    answer ? <p>{answer}</p> : <></>
                }
            </div>
       }
       body={
        <div>
            <Select id={id} value={localSelectedPromptId} options={prompts.map((p) => ({
                id: p.id, label: p.label, value: p.id
            }))} onChange={(ele: ChangeEvent<HTMLSelectElement>) => setLocalSelectedPromptId(ele.currentTarget.value)} dummySelectLabel="Select a prompt"/>
            <textarea className="w-full p-5 bg-transparent outline-none resize-none border-2 border-overBackgroundOutline rounded-lg" value={localPromptAnswer} onChange={(e) => localSelectedPromptId ? setLocalPromptAnswer(e.target.value) : (() => {})()}/>
        </div>
       }
       title="Prompt"
       onAffirmation={() => {
        if (localPromptAnswer && localSelectedPromptId) {
            setPromptAnswer(localPromptAnswer, localSelectedPromptId)
            setLocalSelectedPromptId(localSelectedPromptId)
        }
       }}
       onClose={() => {
        setLocalPromptAnswer(answer)
        setLocalSelectedPromptId(selectedPromptId)
       }}
    />
    )
}

export default PromptCard