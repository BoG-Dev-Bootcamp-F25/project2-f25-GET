import Image from 'next/image';

interface AnimalCardProps {
  animal: {
    name: string;
    breed: string;
    ownerName: string;
    hoursTrained: number;
    imageUrl: string;
  };
}

const getInitial = (name: string) => {
  return name ? name[0].toUpperCase() : '?';
};

export default function AnimalCard({ animal }: AnimalCardProps) {
  const ownerInitial = getInitial(animal.ownerName);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      
      <div className="relative w-full h-48">
        <Image
          src={animal.imageUrl}
          alt={animal.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* acc card content */}
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full text-white font-bold text-lg mr-2 flex-shrink-0">
            {ownerInitial}
          </div>
          
          <h2 className="font-bold text-lg text-gray-900 truncate">
            {animal.name} - <span className="font-normal">{animal.breed}</span>
          </h2>
        </div>

        <div className="mt-2 text-sm text-gray-600 pl-10">
          <span>{animal.ownerName}</span>
          <span className="mx-2">•</span>
          <span>Trained: {animal.hoursTrained} hours</span>
        </div>
      </div>
    </div>
  );
}