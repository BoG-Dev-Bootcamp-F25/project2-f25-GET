"use client";

import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import Image from 'next/image';
import Link from 'next/link';
import AnimalCard from '../../components/AnimalCard';

// FAKE DATA TO REPLACE LATER YAK
const placeholderImageUrl = '/images/dog2.png'; // do we need to change?
const dummyAnimals = [
  { id: 1, name: 'Lucy', breed: 'Golden Retriever', ownerName: 'Long Lam', hoursTrained: 100, imageUrl: placeholderImageUrl },
  { id: 2, name: 'Lucy', breed: 'Golden Retriever', ownerName: 'Long Lam', hoursTrained: 100, imageUrl: placeholderImageUrl },
  { id: 3, name: 'Lucy', breed: 'Golden Retriever', ownerName: 'Long Lam', hoursTrained: 100, imageUrl: placeholderImageUrl },
  { id: 4, name: 'Lucy', breed: 'Golden Retriever', ownerName: 'Long Lam', hoursTrained: 100, imageUrl: placeholderImageUrl },
  { id: 5, name: 'Lucy', breed: 'Golden Retriever', ownerName: 'Long Lam', hoursTrained: 100, imageUrl: placeholderImageUrl },
  { id: 6, name: 'Lucy', breed: 'Golden Retriever', ownerName: 'Long Lam', hoursTrained: 100, imageUrl: placeholderImageUrl },
];
// END TO DELETE


export default function AnimalsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    
    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideBar />
        
        <main className="flex-1 p-10 w-full bg-gray-50">
          
          {/* header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-normal text-gray-700">Animals</h1>
            
            {/* create new */}
            <Link href="/pages/create-animal"> {/* AGAIN CHANGE THIS LATER TO THE RIGHT LINK */}
              <button className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition">
                <Image
                  src="/images/createNewLogo.png"
                  alt="Create new animal"
                  width={20}
                  height={20}
                />
                <span className="ml-2">Create new</span>
              </button>
            </Link>
          </div>

          <hr className="border-gray-200 mb-6" />

          {/*make it a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
          
        </main>
      </div>
    </div>
  );
}