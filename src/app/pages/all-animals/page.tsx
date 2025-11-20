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
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCursors, setPageCursors] = useState<(string | undefined)[]>([undefined]);
  const [searchQuery, setSearchQuery] = useState('');
  const LIMIT = 6;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUserName = localStorage.getItem('userFullName');
    
    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
    setUserName(storedUserName || "");

    // Fetch first page of animals and all users
    const fetchData = async () => {
      const [data] = await Promise.all([
        fetchAnimals(undefined),
        fetchUsers()
      ]);

      if (data && data.length === LIMIT) {
        const lastId = data[data.length - 1]._id;
        setPageCursors(prev => {
          const newCursors = [...prev];
          newCursors[1] = lastId;
          return newCursors;
        });
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  

  const fetchAnimals = async (lastId?: string) => {
    try {
      const params = new URLSearchParams();
      params.set('limit', LIMIT.toString());
      if (lastId) params.set('lastId', lastId);

      const response = await fetch(`/api/admin/animals?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setAnimals(data);
        setHasMore(data.length === LIMIT);
        return data;
      } else {
        console.error("Failed to get animals");
      }
    } catch (error) {
      console.error("Error getting animals:", error);
    }
    return [] as Animal[];
  };

  const handlePageChange = async (page: number) => {
    const cursor = pageCursors[page - 1];
    const data = await fetchAnimals(cursor);
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

  const filteredAnimals = animals.filter(animal => {
    const ownerName = users[animal.owner]?.fullName || '';
    const query = searchQuery.toLowerCase();

    const nameMatch = animal.name.toLowerCase().includes(query);
    const breedMatch = animal.breed.toLowerCase().includes(query);
    const ownerMatch = ownerName.toLowerCase().includes(query);

    return nameMatch || breedMatch || ownerMatch;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar userName={userName} isAdmin={isAdmin} />
        
        <main className="flex-1 p-10 bg-gray-50 overflow-y-auto">
          
          {/* header */}
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-gray-700">All Animals</h1>
          </div>

          <hr className="border-gray-200 mb-6" />

          {/* animals grid */}
          {loading ? (
            <p>Loading animals</p>
          ) : filteredAnimals.length === 0 ? (
            <p>No animals found!</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnimals.map((animal) => {
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