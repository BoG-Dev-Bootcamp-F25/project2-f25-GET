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
      await Promise.all([
        fetchTrainingLogs(storedUserId),
        fetchAnimals()
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchTrainingLogs = async (currentUserId: string | null) => {
    try {
      const response = await fetch('/api/admin/training');
      if (response.ok) {
        const data = await response.json();
        const userLogs = currentUserId
          ? data.filter((log: TrainingLog) => log.user === currentUserId)
          : [];
        setTrainingLogs(userLogs);
      } else {
        console.error("Failed to get logs");
      }
    } catch (error) {
      console.error("Error getting training logs:", error);
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

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideBar userName={userName} isAdmin={isAdmin}/>
        
        <main className="flex-1 p-10 w-full bg-gray-50">
          
          {/* title + create new button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-normal text-gray-700">Training logs</h1>
            
            {/* create new */}
            <Link href="/pages/create-log">
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
          ) : trainingLogs.length === 0 ? (
            <p>No training logs found!</p>
          ) : (
            <div className="flex flex-col space-y-5">
              {trainingLogs.map((log) => {
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
            </div>
          )}

          
        </main>
      </div>
    </div>
  );
}