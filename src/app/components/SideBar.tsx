'use client';

import { useEffect, useState } from "react";
import SideRoute from "../components/SideRoute";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

type Props = {
  userName?: string;
  isAdmin: boolean;
};

export default function SideBar({ userName, isAdmin }: Props) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  return (
    <div
      className="h-full flex flex-col items-center border-r-3 border-gray-100
    w-2/5 sm:w-1/3 md:w-1/4 lg:w-[17%]"
    >
      <div className="w-full">
        <div className="w-[90%] mx-auto border-b-2 border-gray-300">
          <SideRoute
            activeImage="/images/activeTrainingLogo.png"
            inactiveImage="/images/inactiveTrainingLogs.png"
            text="Training Logs"
            href="/pages/trainingLogsDashboard"
          />
          <SideRoute
            activeImage="/images/activeAnimalsLogo.png"
            inactiveImage="/images/inactiveAnimalLogo.png"
            text="Animals"
            href="/pages/animals"
          />
        </div>

        {isAdmin && (
          <div className="w-full px-3">
            <p className="pt-3 text-xs sm:text-sm md:text-base lg:text-m mx-5 font-semibold">
              Admin Access
            </p>
            <SideRoute
              activeImage="/images/activeAllTrainingLogo.png"
              inactiveImage="/images/inactiveAllTrainingLogo.png"
              text="All Training"
              href="/pages/all-training"
            />
            <SideRoute
              activeImage="/images/activeAllAnimalsLogo.png"
              inactiveImage="/images/inactiveAllAnimalsLogo.png"
              text="All Animals"
              href="/pages/all-animals"
            />
            <SideRoute
              activeImage="/images/activeAllUsersLogo.png"
              inactiveImage="/images/inactiveAllUsersLogo.png"
              text="All Users"
              href="/pages/all-users"
            />
          </div>
        )}
      </div>

      <div className="mt-auto w-full flex justify-center">
        <div className=" w-[90%] border-t-2 border-gray-300 flex items-center justify-between px-3 py-4">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/inactiveAllUsersLogo.png"}
              alt={"users"}
              width={28}
              height={28}
            />
            <div>
              <h3 className="font-extrabold sm:text-base md:text-md lg:text-md">
                {userName ?? "User"}
              </h3>
              <p className=" text-sm sm:text-xs md:text-base lg:text-sm">
                {isAdmin ? "Admin" : "Trainer"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-transparent border-none cursor-pointer"
            aria-label="logout"
          >
            <Image
              src={"/images/logoutLogo.png"}
              alt={"logout"}
              width={22}
              height={22}
            />
          </button>
        </div>
      </div>
    </div>
  );
}