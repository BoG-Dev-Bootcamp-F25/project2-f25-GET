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
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCursors, setPageCursors] = useState<(string | undefined)[]>([undefined]);
  const LIMIT = 6;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUserName = localStorage.getItem('userFullName');

    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
    setUserName(storedUserName || "");

    // fetch first page of user's animals
    fetchAnimals(undefined, storedUserId).then((data) => {
      if (data && data.length === LIMIT) {
        const lastId = data[data.length - 1]._id;
        setPageCursors(prev => {
          const newCursors = [...prev];
          newCursors[1] = lastId;
          return newCursors;
        });
      }
    });
  }, []);

  const fetchAnimals = async (lastId?: string, currentUserId: string | null = null) => {
    try {
      const params = new URLSearchParams();
      params.set('limit', LIMIT.toString());
      if (lastId) params.set('lastId', lastId);
      if (currentUserId) params.set('ownerId', currentUserId);

      const response = await fetch(`/api/admin/animals?${params.toString()}`);
      if (response.ok) {
        const data: Animal[] = await response.json();
        const userAnimals = currentUserId
          ? data
          : data;
        setAnimals(userAnimals);
        setHasMore(data.length === LIMIT);
        return data;
      } else {
        console.error("Failed to get animals");
      }
    } catch (error) {
      console.error("Error getting animals:", error);
    } finally {
      setLoading(false);
    }
    return [] as Animal[];
  };

  const handlePageChange = async (page: number) => {
    const cursor = pageCursors[page - 1];
    const data = await fetchAnimals(cursor, userId);
    setCurrentPage(page);

    if (data && data.length === LIMIT) {
      const lastId = data[data.length - 1]._id;
      setPageCursors(prev => {
        const newCursors = [...prev];
        newCursors[page] = lastId;
        return newCursors;
      });
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
            <Link href="/pages/create-animal">
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

          {/* animals grid */}
          {loading ? (
            <p>Loading animals</p>
          ) : animals.length === 0 ? (
            <p>No animals found!</p>
          ) : (
            <>
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

            <div className="flex justify-start space-x-4 mt-4">
              <button 
                  disabled={currentPage === 1} 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="text-blue-600 hover:underline disabled:text-gray-400"
              >
                  Previous
              </button>

              {pageCursors.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`hover:underline ${currentPage === index + 1 ? 'font-bold text-black' : 'text-blue-600'}`}
                  >
                      {index + 1}
                  </button>
              ))}

              <button 
                  disabled={!hasMore} 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="text-blue-600 hover:underline disabled:text-gray-400"
              >
                  Next
              </button>
            </div>
            </>
          )}
          
        </main>
      </div>
    </div>
  );
}