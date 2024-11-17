import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const NavCard = ({
    icon,
    text,
    href,
    iconFilled,
    isActive = false
}: {
    icon: React.ReactNode,
    text?: string,
    href: Url,
    iconFilled?: React.ReactNode,
    isActive?: boolean;
}) => {
    return (
        <Link className="p-5 flex flex-row gap-2 items-center" href={href}>
            {isActive ? iconFilled ? iconFilled : icon : icon}
            {
              text ? isActive ? <strong><h1>{text}</h1></strong> : <h1>{text}</h1> : null
            }
        </Link>
    );
}

export default NavCard;