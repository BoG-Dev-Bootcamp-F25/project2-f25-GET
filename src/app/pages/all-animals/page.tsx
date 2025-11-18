"use client";

import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

export default function AllAnimalsPage() {
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
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">All Animals</h1>
          <p>All Animals page content will go here.</p>
        </main>
      </div>
    </div>
  );
}