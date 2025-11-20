'use client';

import Image from 'next/image';
import TopBar from '../../components/TopBar';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SideBar from '../../components/SideBar';
import TrainingLogCard from '../../components/TrainingLogCard';

interface TrainingLog {
  _id: string;
  title: string;
  date: string;
  hours: number;
  description: string;
  user: string;
  animal: string; 
}

interface Animal {
  _id: string;
  name: string;
  breed: string;
}

export default function TrainingLogsDashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
  const [animals, setAnimals] = useState<Record<string, Animal>>({});
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCursors, setPageCursors] = useState<(string | undefined)[]>([undefined]);
  const [searchQuery, setSearchQuery] = useState('');
  const LIMIT = 4;

  useEffect(() => {
    // Get user info from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUserName = localStorage.getItem('userFullName');
    
    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
    setUserName(storedUserName || "");

    // both logs and animals
    const fetchData = async () => {
      const [logs] = await Promise.all([
        fetchTrainingLogs(undefined, storedUserId),
        fetchAnimals()
      ]);

      if (logs && logs.length === LIMIT) {
        const lastId = logs[logs.length - 1]._id;
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

  const fetchTrainingLogs = async (lastId?: string, currentUserId: string | null = null) => {
    try {
      const params = new URLSearchParams();
      params.set('limit', LIMIT.toString());
      if (lastId) params.set('lastId', lastId);

      const response = await fetch(`/api/admin/training?${params.toString()}`);
      if (response.ok) {
        const data: TrainingLog[] = await response.json();

        const userLogs = currentUserId
          ? data.filter((log: TrainingLog) => log.user === currentUserId)
          : data;

        setTrainingLogs(userLogs);
        setHasMore(data.length === LIMIT);
        return data;
      } else {
        console.error("Failed to get logs");
      }
    } catch (error) {
      console.error("Error getting training logs:", error);
    }
    return [] as TrainingLog[];
  }

  const handlePageChange = async (page: number) => {
    const cursor = pageCursors[page - 1];
    const data = await fetchTrainingLogs(cursor, userId);
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

  const fetchAnimals = async () => {
    try {
      const response = await fetch('/api/admin/animals');
      if (response.ok) {
        const data: Animal[] = await response.json();
        const animalMap = data.reduce((acc, animal) => {
          acc[animal._id] = animal;
          return acc;
        }, {} as Record<string, Animal>);
        setAnimals(animalMap);
      } else {
        console.error("Failed to get animals");
      }
    } catch (error) {
      console.error("Error getting animals:", error);
    }
  }

  const filteredLogs = trainingLogs.filter(log =>
    log.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar userName={userName} isAdmin={isAdmin}/>
        
        <main className="flex-1 p-10 bg-gray-50 overflow-y-auto">
          
          {/* title + create new button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-normal text-gray-700">Training logs</h1>
            
            {/* create new */}
            <Link href="/pages/createLog">
              <button className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition">
                <Image
                  src="/images/createNewLogo.png"
                  alt="Create new log"
                  width={20}
                  height={20}
                />
                <span className="ml-2">Create new</span>
              </button>
            </Link>
          </div>

          <hr className="border-gray-200 mb-6" />

          {/* log list */}
          {loading ? (
            <p>Loading training logs</p>
          ) : filteredLogs.length === 0 ? (
            <p>No training logs found!</p>
          ) : (
            <div className="flex flex-col space-y-5">
              {filteredLogs.map((log) => {
                const animal = animals[log.animal];
                
                return (
                  <TrainingLogCard
                    key={log._id}
                    log={{
                      title: log.title,
                      date: new Date(log.date),
                      hours: log.hours,
                      ownerName: userName,
                      animalName: animal ? animal.name : 'Animal',
                      animalBreed: animal ? animal.breed : 'Breed',
                      description: log.description,
                    }}
                  />
                );
              })}

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
            </div>
          )}

          
        </main>
      </div>
    </div>
  );
}