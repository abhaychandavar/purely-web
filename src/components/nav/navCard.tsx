import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const NavCard = ({
    icon,
    text,
    href,
    iconFilled,
    isActive = false,
    className
}: {
    icon: React.ReactNode,
    text?: string,
    href: Url,
    iconFilled?: React.ReactNode,
    isActive?: boolean;
    className?: string;
}) => {
    return (
        <Link className={`p-5 flex flex-row gap-2 items-center ${className || ''}`} href={href}>
            {isActive ? iconFilled ? iconFilled : icon : icon}
            {
              text ? isActive ? <strong className="hidden md:block"><h1>{text}</h1></strong> : <h1 className="hidden md:block">{text}</h1> : null
            }
        </Link>
    );
}

export default NavCard;