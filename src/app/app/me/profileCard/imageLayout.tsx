'use client';

import { useState } from "react";

const ImageLayout = ({ count, title }: { count: number, title: string }) => {

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
        <div className="flex flex-col gap-5">
        <label>{title}</label>
        <div className="grid grid-cols-2 gap-5">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    className="p-4 border-2 border-dashed border-overBackgroundOutline rounded-lg cursor-pointer hover:bg-gray-50"
                >
                    <label htmlFor={item.id} className="flex flex-col items-center justify-center min-h-[20rem] cursor-pointer">
                        <span className="text-gray-600">{item.label}</span>
                        <input
                            type="file"
                            id={item.id}
                            accept="image/*"
                            className="hidden min-w-full min-h-full"
                        />
                    </label>
                </div>
            ))}
        </div>
        </div>
    );
};

export default ImageLayout;