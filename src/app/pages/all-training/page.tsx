"use client";

import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import TrainingLogCard from "../../components/TrainingLogCard";

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

interface User {
  _id: string;
  fullName: string;
}

export default function AllTrainingPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
  const [animals, setAnimals] = useState<Record<string, Animal>>({});
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedUserName = localStorage.getItem('userFullName');
    
    setUserId(storedUserId);
    setIsAdmin(storedIsAdmin === 'true');
    setUserName(storedUserName || "");

    // Fetch all training logs, animals, and users
    const fetchData = async () => {
      await Promise.all([
        fetchTrainingLogs(),
        fetchAnimals(),
        fetchUsers()
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchTrainingLogs = async () => {
    try {
      const response = await fetch('/api/admin/training');
      if (response.ok) {
        const data = await response.json();
        // Sort by date in descending order (newest first)
        const sortedLogs = data.sort((a: TrainingLog, b: TrainingLog) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTrainingLogs(sortedLogs);
      } else {
        console.error("Failed to get logs");
      }
    } catch (error) {
      console.error("Error getting training logs:", error);
    }
  };

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
            <h1 className="text-2xl font-normal text-gray-700">All Training Logs</h1>
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
                const ownerName = users[log.user]?.fullName || 'Unknown User';
                
                return (
                  <TrainingLogCard
                    key={log._id}
                    log={{
                      title: log.title,
                      date: new Date(log.date),
                      hours: log.hours,
                      ownerName: ownerName,
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