"use client";

import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import Image from 'next/image';
import Link from 'next/link';
import AnimalCard from '../../components/AnimalCard';

interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

export default function AnimalsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUserName = localStorage.getItem('userFullName');

    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
    setUserName(storedUserName || "");

    fetchAnimals(storedUserId);
  }, []);

  const fetchAnimals = async (currentUserId: string | null) => {
    try {
      const response = await fetch('/api/admin/animals');
      if (response.ok) {
        const data = await response.json();
        const userAnimals = currentUserId
          ? data.filter((animal: Animal) => animal.owner === currentUserId)
          : [];
        setAnimals(userAnimals);
      } else {
        console.error("Failed to get animals");
      }
    } catch (error) {
      console.error("Error getting animals:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideBar userName={userName} isAdmin={isAdmin} />
        
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

          {loading ? (
            <p>Loading animals</p>
          ) : animals.length === 0 ? (
            <p>No animals found!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animals.map((animal) => (
                <AnimalCard 
                  key={animal._id} 
                  animal={{
                    name: animal.name,
                    breed: animal.breed,
                    ownerName: userName,
                    hoursTrained: animal.hoursTrained,
                    imageUrl: animal.profilePicture,
                  }} 
                />
              ))}
            </div>
          )}

          {/*make it a grid */}

          
        </main>
      </div>
    </div>
  );
}