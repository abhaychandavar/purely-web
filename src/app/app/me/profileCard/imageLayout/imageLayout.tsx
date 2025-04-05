'use client';

import profileService from "@/services/profile";
import { useEffect, useState } from "react";
import ImageComponent from "./imageComponent";
import storageService from "@/services/storage";

const ImageLayout = ({title, handleChange, items }: { items: Array<{
    mediaID: string;
    order: number;
    label?: string;
    mediaURL: string | undefined;
}>, title: string, handleChange: (media: Array<any>) => void }) => {

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    useEffect(() => {
    }, [items]);
    // Handle drag start
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleRemoveMedia = async (index: number) => {
        const filteredItems = items.map((item, idx) => {
            if (index === idx) {
                return {...item, mediaURL: undefined };
            }
            return item;
        });
        handleChange(filteredItems);
    }
    
    const handleFileChange = async (file: File, index: number) => {
        try {
            const partSize = 5 * 1024 * 1024;
            const partsCount = Math.ceil(file.size / partSize);
            const uploadData = await storageService.getMediaUploadUrl({
                fileName: file.name || 'img',
                fileSize: file.size,
                contentType: 'image/jpeg',
                purpose: 'profile',
                partsCount
            });
            console.log("Upload data:", uploadData);
            const { signedUrls, uploadID, url: fullFileUrl } = uploadData;
            const etags = await storageService.uploadFile(signedUrls, file, partSize);
            const etagMap: Record<string, any> = {};
            for (const [idx, etag] of etags.entries()) {
                etagMap[idx + 1] = etag?.replaceAll("\"", '');
            }
            const { url, id } = await storageService.completeUpload(uploadID, fullFileUrl, etagMap);
            console.log('URL >>> url', url, id)
            handleChange(items.map((item, idx) => idx === index ? {
                ...item,
                mediaURL: url,
                mediaID: id
            } : item));
        } catch (error) {
            console.error("Error getting upload URL:", error);
        }
    };

    const handleDrop = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const itemsClone = [...items];
        const tempOrder = itemsClone[draggedIndex].order;
        itemsClone[draggedIndex].order = itemsClone[index].order;
        itemsClone[index].order = tempOrder;
        handleChange(itemsClone);
        setDraggedIndex(null);
    };

    return (
        <div className="flex flex-col gap-2">
        <label>{title}</label>
        <div className="flex flex-wrap gap-5">
            {items.sort((a, b) => a.order - b.order).map((item, index) => (
                <ImageComponent handleRemoveMedia={handleRemoveMedia} index={index} handleDragStart={handleDragStart} handleDrop={handleDrop} handleFileChange={handleFileChange} item={item} key={index + 'image'}  />
            ))}
        </div>
        </div>
    );
};

export default ImageLayout;