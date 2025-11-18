'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import InputField from './components/InputField'
import Link from 'next/link';
import TopBar from './components/TopBar';
import Image from 'next/image';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.id);
        localStorage.setItem('isAdmin', data.admin);
        
        router.push('/pages/trainingLogsDashboard');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <TopBar />

      <div className="h-[calc(100vh-64px)] flex flex-col justify-between items-center">
        <div></div>
        <div className="flex flex-col w-full justify-center items-center max-w-md space-y-5 text-xs">
          <p className="text-[30px] font-bold">Login</p>

          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button 
            onClick={handleLogin}
            disabled={loading}
            className="bg-red-700 text-white w-full text-lg rounded-xl p-3 mt-2 mb-4 font-bold text-xl disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className=" text-[16px]">
            <p>
              Don't have an account?{" "}
              <Link href="/pages/createAccount" className="font-bold ">
                Sign up
              </Link>
            </p>
          </div>
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