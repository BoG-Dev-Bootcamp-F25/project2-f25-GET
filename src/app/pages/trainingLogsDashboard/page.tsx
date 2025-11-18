'use client';

import Image from 'next/image';
import TopBar from '../../components/TopBar';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SideBar from '../../components/SideBar';
import TrainingLogCard from '../../components/TrainingLogCard';

// FAKE DATA FOR TESTING; DON'T FORGET TO PULL FROM DATABASE LATER
const dummyLogs = [
  {
    id: 1,
    title: 'Complete sit lessons',
    date: new Date('2023-10-20T10:00:00Z'),
    hours: 20,
    ownerName: 'Long Lam',
    animalName: 'Lucy',
    animalBreed: 'Golden Retriever',
    description: 'Lucy finishes the sit lessons very well today. Should give her a treat',
  },
  {
    id: 2,
    title: 'Advanced fetch training',
    date: new Date('2023-10-19T11:00:00Z'),
    hours: 2,
    ownerName: 'Long Lam',
    animalName: 'Lucy',
    animalBreed: 'Golden Retriever',
    description: 'Practiced long-distance recall and fetch. Good progress.',
  },
  {
    id: 3,
    title: 'Leash manners',
    date: new Date('2023-10-18T14:00:00Z'),
    hours: 1,
    ownerName: 'Long Lam',
    animalName: 'Lucy',
    animalBreed: 'Golden Retriever',
    description: 'Worked on not pulling. Still needs some work.',
  },
];
// END OF FAKE DATA TO DELETE LATER

export default function TrainingLogsDashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Get user info from localStorage
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
          <div className="flex flex-col space-y-5">
            {dummyLogs.map((log) => (
              <TrainingLogCard key={log.id} log={log} />
            ))}
          </div>
          
        </main>
      </div>
    </div>
  );
}