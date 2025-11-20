"use client";

import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import UserCard from "../../components/UserCard";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

type User = {
  _id: string;
  fullName: string;
  admin: boolean;
  location: string;
};

export default function AllUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex flex-1 overflow-hidden">
        
        <SideBar userName={user?.fullName || ""} isAdmin={user?.admin || false} />
        
        <main className="flex-1 overflow-y-auto p-10 w-full bg-gray-50">
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-normal text-gray-700">All users</h1>
          </div>

          <hr className="border-gray-200 mb-6" />

          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}