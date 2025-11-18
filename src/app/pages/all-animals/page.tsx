"use client";

import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

export default function AllAnimalsPage() {
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
