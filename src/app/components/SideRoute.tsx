import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { act } from "react";
type Props = {
    activeImage: string;
    inactiveImage: string;
    text: string;
    href: string;
}

export default function SideRoute ({activeImage, inactiveImage, text, href}: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const src = isActive? activeImage : inactiveImage;
    return (
      <Link href={href} className="w-full">
        <div
          className={`mx-3 my-2 flex items-center gap-2 p-3 cursor-pointer ${
            isActive
              ? "bg-red-600 text-white rounded-xl font-bold"
              : "hover:bg-red-100 rounded-xl"
          }`}
        >
          <Image src={src} alt={text} width={24} height={24} />
          <p className="text-xs sm:text-sm md:text-base lg:text-md">{text}</p>
        </div>
      </Link>
    );

}