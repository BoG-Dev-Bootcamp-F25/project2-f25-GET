interface UserCardProps {
  user: {
    fullName: string;
    admin: boolean;
    location?: string;
  };
}

const getInitial = (name: string) => {
  return name ? name[0].toUpperCase() : '?';
};

export default function UserCard({ user }: UserCardProps) {
  const initial = getInitial(user.fullName);
  const location = user.location || "Atlanta, Georgia";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
      
      <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full text-white font-bold text-xl mr-3 flex-shrink-0">
        {initial}
      </div>

      <div>
        <h2 className="font-bold text-lg text-gray-900">{user.fullName}</h2>
        <div className="text-sm text-gray-600 flex items-center">
          
          {user.admin && (
            <>
              <span className="font-medium">Admin</span>
              <span className="mx-2">•</span>
            </>
          )}
          
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}