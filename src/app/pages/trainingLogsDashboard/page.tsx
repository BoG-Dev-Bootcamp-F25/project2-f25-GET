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
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1 flex-row">
        <SideBar></SideBar>
        <div className="flex-1 p-4">
          <p>This is where the feed should go!?</p>
          <p>this is the training log page</p>
        </div>
      </div>
    </div>
  );
}