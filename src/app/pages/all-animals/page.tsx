"use client";

import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import AnimalCard from "../../components/AnimalCard";

interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

interface User {
  _id: string;
  fullName: string;
}

export default function AllAnimalsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUserName = localStorage.getItem('userFullName');
    
    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
    setUserName(storedUserName || "");

    // Fetch all animals and all users
    const fetchData = async () => {
      await Promise.all([
        fetchAnimals(),
        fetchUsers()
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch('/api/admin/animals');
      if (response.ok) {
        const data = await response.json();
        setAnimals(data);
      } else {
        console.error("Failed to get animals");
      }
    } catch (error) {
      console.error("Error getting animals:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data: User[] = await response.json();
        const userMap = data.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {} as Record<string, User>);
        setUsers(userMap);
      } else {
        console.error("Failed to get users");
      }
    } catch (error) {
      console.error("Error getting users:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideBar userName={userName} isAdmin={isAdmin} />
        
        <main className="flex-1 p-10 w-full bg-gray-50">
          
          {/* header */}
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-gray-700">All Animals</h1>
          </div>

          <hr className="border-gray-200 mb-6" />

          {/* animals grid */}
          {loading ? (
            <p>Loading animals</p>
          ) : animals.length === 0 ? (
            <p>No animals found!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animals.map((animal) => {
                const ownerName = users[animal.owner]?.fullName || 'Unknown Owner';
                return (
                  <AnimalCard 
                    key={animal._id} 
                    animal={{
                      name: animal.name,
                      breed: animal.breed,
                      ownerName: ownerName,
                      hoursTrained: animal.hoursTrained,
                      imageUrl: animal.profilePicture,
                    }} 
                  />
                );
              })}
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}