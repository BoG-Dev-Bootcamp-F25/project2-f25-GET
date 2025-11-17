'use client';

import { useState } from 'react';
import InputField from './components/InputField'
import Link from 'next/link';
import TopBar from './components/TopBar';
import Image from 'next/image';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <TopBar />
        
      <div className="h-[calc(100vh-64px)] flex flex-col justify-between items-center">
        <div></div> 
        <div className="flex flex-col w-xs justify-center items-center max-w-md space-y-5 text-xs">
          <p className="text-[30px] font-bold">Login</p>
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

          <Link href = "/pages/trainingLogsDashboard" className="w-full pt-4">
            <button className="bg-red-500 text-white w-full text-lg rounded-lg p-0.5 font-medium">Log in</button>
          </Link>

          <div className="text-xs"><p>Don't have an account? <Link href="/pages/createAccount" className="font-bold">Sign up</Link></p></div>
        </div>
        <div className="pb-4 text-xs">
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