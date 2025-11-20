'use client';

import Image from 'next/image';
import TopBar from '../../components/TopBar';
import InputField from '../../components/InputField';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateAccount() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccountCreation = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!fullName || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, admin: isAdmin }),
      });

      if (response.ok) {
        const verifyResponse = await fetch('/api/user/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (verifyResponse.ok) {
          router.push('/pages/trainingLogsDashboard');
        } else {
          alert('Account created but login failed.');
          router.push('/');
        }
      } else {
        const errorText = await response.text();
        alert(`Failed to create account: ${errorText}`);
      }
    } catch (err) {
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
        <div className="flex flex-col w-full justify-center items-center max-w-md">
          <p className="text-[30px] font-bold">Create Account</p>
          <InputField
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
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
          <InputField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <div className="w-full flex items-center gap-2 mt-7 mb-5">
            <input
              type="checkbox"
              id="adminAccess"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-5 h-5 border-2 border-red-600 rounded-sm checked:accent-red-700"
            />
            <label htmlFor="adminAccess" className="text-gray-600 ">
              Admin access
            </label>
          </div>

          <button 
            onClick={handleAccountCreation}
            disabled={loading}
            className="bg-red-700 text-white w-full rounded-xl p-3 mb-4 font-bold text-xl disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className=" text-[16px] m-4">
            Already have an account?{" "}
            <Link href="/" className="font-bold">
              Log In
            </Link>
          </p>
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