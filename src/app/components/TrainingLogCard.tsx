import Image from 'next/image';

// what do we need
interface TrainingLogCardProps {
  log: {
    title: string;
    date: Date;
    hours: number;
    ownerName: string;
    animalName: string;
    animalBreed: string;
    description: string;
  };
}

// formatting date helper
const formatMonthYear = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month} - ${year}`;
};

export default function TrainingLogCard({ log }: TrainingLogCardProps) {
  const day = log.date.getDate();
  const monthYear = formatMonthYear(log.date);

  return (
    // main card container
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        
        {/* date box on left */}
        <div className="flex flex-col items-center justify-center w-20 h-20 bg-indigo-900 text-white rounded-lg p-2">
          <span className="text-2xl font-bold">{day}</span>
          <span className="text-xs">{monthYear}</span>
        </div>

        {/* log info in middle */}
        <div className="ml-4">
          <div className="flex items-baseline">
            <h2 className="font-bold text-lg text-gray-900">{log.title}</h2>
            <span className="ml-2 text-sm text-gray-500">• {log.hours} hours</span>
          </div>
          <p className="text-sm text-gray-600">
            {log.ownerName} - {log.animalBreed} - {log.animalName}
          </p>
          <p className="mt-1 text-base text-gray-800">{log.description}</p>
        </div>
      </div>

      {/* edit button on right */}
      <button>
        <Image
          src="/images/trainingLogCardEditButton.png"
          alt="Edit log"
          width={48}
          height={48}
          className="cursor-pointer hover:opacity-80 transition"
        />
      </button>
    </div>
  );
}