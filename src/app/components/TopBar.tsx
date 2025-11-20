import Image from "next/image";

type Props = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

export default function TopBar({ searchQuery, onSearchChange }: Props) {
  return (
    <div>
      <div className="flex items-center px-5 py-2.5 font-bold">
        <div className="flex items-center w-1/3">
          <Image
            src="/images/appLogo.png" 
            alt="App Logo"
            height={50}
            width={84}
            className="h-[30px] w-auto"
          />
          <p className="text-[30px] leading-none ml-2 font-['Oswald'] font-medium">
            Progress
          </p>
        </div>

        <div className="w-1/3">
          {onSearchChange && (
            <div className="relative w-full max-w-md mx-auto"> 
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <Image
                  src="/images/searchLogo.png"
                  alt="Search"
                  width={20}
                  height={20}
                />
              </span>

              <input
                type="text"
                placeholder="Search"
                value={searchQuery || ''} 
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-9 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}
        </div>
        <div className="w-1/3"></div>
      </div>
      <hr></hr>
    </div>
  );
}