"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { useAuth } from "../../hooks/useAuth";

const currentYear = new Date().getFullYear();
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const FormInput = ({ id, value, onChange, ...props }: any) => (
    <input
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
  );

export default function CreateAnimalPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [hours, setHours] = useState('');
  const [note, setNote] = useState('');
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [day, setDay] = useState(new Date().getDate().toString());
  const [year, setYear] = useState(currentYear.toString());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !breed || !hours || !day || !month || !year) {
      setError('All fields except Note are required.');
      return;
    }
    if (!user) {
      setError('Could not find user. Please log in again.');
      return;
    }

    setIsSubmitting(true);
    const dateString = `${year}-${months.indexOf(month) + 1}-${day}`;
    const birthDate = new Date(dateString);

    if (isNaN(birthDate.getTime())) {
      setError('Invalid birth date. Please check Month, Day, and Year.');
      setIsSubmitting(false);
      return;
    }

    // weee backend
    const animalData = {
      owner: user.id,
      name,
      breed,
      hoursTrained: Number(hours),
      birthDate: birthDate,
      note, // maybe the model doesn't have this? ion, just a placeholder
      profilePicture: '/images/default-animal-avatar.png',
    };

    console.log('FAKE SUBMIT');
    console.log('Submitting this data to /api/animal:', animalData);
    
    // fake API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('FAKE SUCCESS');
    setSuccess('Animal created successfully! Redirecting...');
    setIsSubmitting(false);

    setTimeout(() => {
      router.push('/pages/animals');
    }, 2000);

    // real code later
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar userName={user?.fullName || ""} isAdmin={user?.admin || false} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-gray-50">
          <h1 className="text-2xl font-normal text-gray-700">Animals</h1>
          <hr className="border-gray-200 my-6" />
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6 w-full max-w-md md:max-w-2xl lg:max-w-5xl mx-auto"
          >
            
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                Animal Name
              </label>
              <FormInput
                type="text"
                id="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="breed" className="block text-sm font-bold text-gray-700">
                Breed
              </label>
              <FormInput
                type="text"
                id="breed"
                value={breed}
                onChange={(e: any) => setBreed(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="hours" className="block text-sm font-bold text-gray-700">
                Total hours trained
              </label>
              <FormInput
                type="number"
                id="hours"
                value={hours}
                onChange={(e: any) => setHours(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="month" className="block text-sm font-bold text-gray-700">
                  Birth Month
                </label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="day" className="block text-sm font-bold text-gray-700">
                  Date
                </label>
                <FormInput
                  type="text"
                  id="day"
                  value={day}
                  onChange={(e: any) => setDay(e.target.value)}
                  maxLength={2}
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-bold text-gray-700">
                  Year
                </label>
                <FormInput
                  type="text"
                  id="year"
                  value={year}
                  onChange={(e: any) => setYear(e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-bold text-gray-700">
                Note
              </label>
              <textarea
                id="note"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            {/* image upload? */}

            {error && (
              <div className="p-3 text-red-800 bg-red-100 border border-red-300 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-green-800 bg-green-100 border border-green-300 rounded-md">
                {success}
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}