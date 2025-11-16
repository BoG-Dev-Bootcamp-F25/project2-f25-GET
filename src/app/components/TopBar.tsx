import Image from "next/image";

export default function TopBar () {
    return (
        <div>
            <div className="flex justify-left px-5 py-2.5 font-bold">
                <Image
                    src="/images/appLogo.png"
                    alt="App Logo"
                    height={50}
                    width={84}
                    className="h-[30px] w-auto"
                />
            <p className="text-[30px] leading-none ml-2">
            Progress
            </p>
            </div>
            <hr></hr>
        </div>
    );

}