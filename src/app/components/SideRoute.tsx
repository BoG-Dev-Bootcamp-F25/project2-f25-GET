import Image from "next/image";

type Props = {
    image: string;
    text: string

}

export default function SideRoute ({image, text}: Props) {
    return (
        <div className="w-full text-[50] flex items-center gap-2 p-2">
            <Image
                src={image}
                alt={text}
                width={24}
                height={24}
            />
            <p>{text}</p>
        </div>
    );

}