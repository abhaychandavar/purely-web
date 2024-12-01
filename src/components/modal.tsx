import { useEffect, useState } from "react";

const Modal = ({
    triggerElement,
    title,
    body,
    onAffirmation,
    affirmationText = "Yes",
    cancelText = "No",
    onClose,
    open,
    modalControls = true,
    onOpen,
}: {
    triggerElement: React.ReactNode;
    title: string;
    body?: React.ReactNode;
    onAffirmation?: () => void;
    affirmationText?: string;
    cancelText?: string;
    onClose?: () => void;
    modalControls?: boolean;
    open?: boolean;
    onOpen?: () => void;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open ?? false);

    // Sync local state with external open prop
    useEffect(() => {
        if (typeof open === "boolean") {
            setIsOpen(open);
        }
    }, [open]);

    const handleAffirmation = () => {
        onAffirmation?.();
        setIsOpen(false);
        onClose?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    const handleOpen = () => {
        setIsOpen(true);
        onOpen?.();
    };

    return (
        <div className="w-full">
            {/* Trigger element to open the modal */}
            <div onClick={handleOpen} className="cursor-pointer">
                {triggerElement}
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full z-50 bg-overlay flex items-center justify-center"
                    onClick={handleClose} // Close modal when clicking on the overlay
                >
                    {/* Prevent clicks inside the modal content from closing the modal */}
                    <div
                        className="bg-card rounded-lg p-5 gap-5 flex flex-col min-w-[30%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1>{title}</h1>
                        <div>{body}</div>
                        {modalControls && (
                            <div className="flex flex-row justify-end gap-2 w-full">
                                <button
                                    className="bg-secondary p-2 pl-5 pr-5 rounded-full"
                                    onClick={handleClose}
                                >
                                    {cancelText}
                                </button>
                                <button
                                    className="bg-primary p-2 pl-5 pr-5 rounded-full"
                                    onClick={handleAffirmation}
                                >
                                    {affirmationText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
