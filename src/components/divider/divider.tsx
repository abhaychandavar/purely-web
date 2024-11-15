const Divider = ({ isVertical }: { isVertical?: boolean }) => {
    if (isVertical) {
        return <div className="min-w-1 min-h-full bg-overBackgroundDivider" />;
    }
    return <div className="min-w-full min-h-1 bg-overBackgroundDivider" />;
}

export default Divider;