'use client';

import Image from 'next/image';
import TopBar from '../../components/TopBar';
import InputField from '../../components/InputField';
import { useState } from 'react';
import Link from 'next/link';
import SideBar from '../../components/SideBar';

export default function CreateAccount() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div>
      <TopBar />
      <div className="flex flex-row">
        <SideBar></SideBar>
        <div>
          <p>This is where the feed should go!?</p>
          <p>this is the training log page</p>
          <Link href="/">
            <button className="bg-red-500 text-white w-full">Log out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}