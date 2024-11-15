import Image from "next/image";

const TopBar = () => {
    return (
        <div className="w-full p-5">
            <Image
                src="/purely.svg"
                alt="Purely logo"
                width={180}
                height={38}
                priority
            />
        </div>
    );
}

export default TopBar;