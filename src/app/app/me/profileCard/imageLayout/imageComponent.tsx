import getCroppedImg from "@/components/imageCropper/cropper";
import ImageCropper from "@/components/imageCropper/imageCropper";
import Modal from "@/components/modal";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState } from "react";
import { Area } from "react-easy-crop";

const ImageComponent = ({
    item, index, handleFileChange, handleDragStart, handleDrop, handleRemoveMedia
}: {
    item: { mediaID: string, label?: string, mediaURL?: string },
    index: number,
    handleFileChange: (image: File, index: number) => Promise<void>,
    handleDragStart: (index: number) => void,
    handleDrop: (index: number) => void,
    handleRemoveMedia: (index: number) =>void
}) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const [mediaMods, setMediaMods] = useState({
        areaCrop: { x: 0, y: 0, width: 0, height: 0 },
        pixleCrop: { x: 0, y: 0, width: 0, height: 0 },
        rotation: 0,
        flip: { vertical: false, horizontal: false }
    });
    const handleMediaSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || !files.length) return
        const file = files[0];
        const reader = new FileReader()
        reader.addEventListener('load', () =>
            setSelectedImage(reader.result?.toString() || ''),
        )
        reader.readAsDataURL(file);
    }

    return <div
    key={item.mediaID}
    draggable
    onDragStart={() => handleDragStart(index)}
    onDragOver={(e) => e.preventDefault()}
    onDrop={() => handleDrop(index)}
    className={"border-2 border-dashed h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem] border-overBackgroundOutline rounded-lg cursor-pointer hover:bg-gray-50 relative"}
>
    <div className="flex items-center justify-center min-h-full cursor-pointer h-full w-full">
        {
            selectedImage ? 
                <Modal 
                    open = {selectedImage ? true : false}
                    title = "Show the real you"
                    affirmationText = "Upload"
                    cancelText = "Cancel"
                    onClose={() => setSelectedImage(undefined)}
                    body = {
                        <ImageCropper 
                        src={selectedImage} 
                        handleCrop={async (area: Area, pixles: Area, zoom: number) => {
                            setMediaMods({
                                areaCrop: area,
                                pixleCrop: pixles,
                                rotation: zoom,
                                flip: { vertical: false, horizontal: false }
                            })
                        }}
                        />
                    }
                    onAffirmation={async () => {
                        const file = await getCroppedImg(
                            selectedImage!,
                            mediaMods.pixleCrop,
                            mediaMods.rotation,
                            mediaMods.flip
                        )
                        if (!file) {
                            console.log('Could not get cropped media')
                            return;
                        }
                        console.log('called crop done')
                        await handleFileChange(file, index)
                    }}
                />
            : <></>
        }
    {
        isImageUploading ? 
            <Skeleton className="min-w-full rounded-md bg-overBackgroundDivider min-h-[5rem] lg:min-h-[10rem]" />
        :
        item?.mediaURL ? 
        <Modal 
            triggerElement={
                <div className="w-full h-full flex items-center">
                            <div className={`absolute top-0 right-0 transition-all bg-overBackground rounded-lg shadow-md`}
                                onClick={() => handleRemoveMedia(index)}
                            >
                                <Image 
                                    alt='close'
                                    src='/icons/close.svg'
                                    className="rounded-md w-full"
                                    width={500} 
                                    height={300} 
                                    quality={100}
                                />
                            </div>
                            <Image 
                                alt={item?.label || `image-${item.mediaID}`}
                                src={item.mediaURL}
                                className="rounded-md w-full"
                                width={500} 
                                height={300} 
                                quality={100}
                            />
                        </div>
            }
            title=""
            body={
                <Image 
                    alt={item?.label || `image-${item.mediaID}`}
                    src={item.mediaURL}
                    className="rounded-md w-full"
                    width={500} 
                    height={300} 
                    quality={100}
                />
            }
            modalControls={true}
            affirmationControl={false}
            cancelText="Close"
        />
        :
        <label htmlFor={item.mediaID} className="flex flex-col items-center justify-center h-full cursor-pointer">
            <span className="text-gray-600 text-center">{item.label}</span>
            <input
                type="file"
                id={item.mediaID}
                accept="image/*"
                className="hidden min-w-full min-h-full "
                onChange={async (event) => {
                    console.log('File type <><><><>', event.target.files?.[0].type)
                    setIsImageUploading(true);
                    try {
                        await handleMediaSelect(event);
                    }
                    finally {
                       setIsImageUploading(false);
                    }
                }}
            />
        </label>
    }
    </div>
</div>
}

export default ImageComponent;