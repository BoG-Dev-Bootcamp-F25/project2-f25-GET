'use client';

import Image from 'next/image';
import TopBar from '../../components/TopBar';
import InputField from '../../components/InputField';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function CreateAccount() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        password,
        admin: isAdmin,
      }),
    });
    if (!res.ok) {
      console.error("Failed to create user");
      return;
    }

    const data = await res.json();
    console.log("Created user:", data);  

    localStorage.setItem("userFullName", fullName);
    localStorage.setItem("userIsAdmin", String(isAdmin));

    router.push("/pages/trainingLogsDashboard");
  };
  return (
    <div>
      <TopBar />

      <div className="h-[calc(100vh-64px)] flex flex-col justify-between items-center">
        <div></div>
        <div className="flex flex-col w-full justify-center items-center max-w-md">
          <p className="text-[30px] font-bold">Create Account</p>
          <InputField
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
          <InputField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputField
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <InputField
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <div className="w-full flex items-center gap-2 mt-7 mb-5">
            <input
              type="checkbox"
              id="adminAccess"
              className="w-5 h-5 border-2 border-red-600 rounded-sm checked:accent-red-700"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="adminAccess" className="text-gray-600 ">
              Admin access
            </label>
          </div>

          <Link href="/" className="w-full pt-2">
            <button
              onClick={handleSignUp}
              className="bg-red-700 text-white w-full rounded-xl p-3 mb-4 font-bold text-xl"
            >
              Sign Up
            </button>
          </Link>

          <p className=" text-[16px] m-4">
            Already have an account?{" "}
            <Link href="/" className="font-bold">
              Log In
            </Link>
          </p>
        </div>
        <div className="pb-4">
          <p>Made with ♥ by Euan, Gia, and Tiffany</p>
        </div>
      </div>
      <Image
        src="/images/quarterCircle.png"
        alt="Quarter circle"
        width={200}
        height={200}
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}