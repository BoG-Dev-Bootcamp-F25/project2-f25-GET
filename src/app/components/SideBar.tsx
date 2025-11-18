import Image from "next/image";
import { useEffect, useState } from "react";
import SideRoute from "../components/SideRoute";
import Link from "next/link";

export default function SideBar () {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
      const storedName = localStorage.getItem("userFullName");
      if (storedName) setUserName(storedName);
    }, []);
    return (
      <div className="w-[17%] flex flex-col items-center border-r-2 border-gray-200">
        <div>
          <div className="border-b-2 border-gray-300 w-[100%] ">
            <SideRoute
              image="/images/inactiveTrainingLogs.png"
              text="Training Logs"
      <div className="w-[20%] flex flex-col border-r-3 border-gray-100 justify-center items-center">
        <div>
          <div className="w-[100%] border-b-2 border-gray-300">
            <SideRoute
              image="/images/inactiveTrainingLogs.png"
              text="Training Logs"
            />
            <SideRoute image="/images/inactiveAnimalLogo.png" text="Animals" />
          </div>
          <div>
            <p className="">Admin Access</p>
            <SideRoute
              image="/images/inactiveAllTrainingLogo.png"
              text="All Training"
            />
            <SideRoute image="/images/inactiveAnimalLogo.png" text="Animals" />
          </div>
          <div>
            <SideRoute
              image="/images/inactiveAllTrainingLogo.png"
              text="All Training"
            />
            <SideRoute
              image="/images/inactiveAllAnimalsLogo.png"
              text="All Animals"
            />
            <SideRoute
              image="/images/inactiveAllUsersLogo.png"
              text="All Users"
            />
          </div>
        </div>
        <div className="mt-auto border-t-2 border-gray-300 w-[100%] flex flex-row items-center justify-between px-3 py-4">
          <div className="flex flex-row gap-3">
            <img src="/images/inactiveAllUsersLogo.png" className="w-7 h-7" />
            <div>
              <h3 className="font-bold text-md">{userName ?? "User"}</h3>
              <p className="text-sm">Admin</p>
            </div>
          </div>
          <Link href="/">
            <img src="/images/logoutLogo.png" className="self-end w-5" />
          </Link>
        </div>
      </div>
    );

}