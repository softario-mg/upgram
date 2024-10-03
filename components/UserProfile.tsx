import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, Grid, Bookmark, Edit } from 'lucide-react';

interface UserProfileProps {
  user: {
    id: number;
    username: string;
    posts: number;
    followers: number;
    following: number;
    bio: string;
    profilePicture: string;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <User size={64} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
            <h2 className="text-2xl font-bold mr-4">{user.username}</h2>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center">
                <Edit size={16} className="mr-2" /> Modifier le profil
              </Button>
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start space-x-8 mb-4">
            <span><strong>{user.posts}</strong> publications</span>
            <span><strong>{user.followers}</strong> abonnés</span>
            <span><strong>{user.following}</strong> abonnements</span>
          </div>
          <p className="text-sm">{user.bio}</p>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="flex justify-center mt-4">
          <Button variant="ghost" className="mx-2 text-sm font-semibold text-gray-500 hover:text-black">
            <Grid size={16} className="mr-2" /> PUBLICATIONS
          </Button>
          <Button variant="ghost" className="mx-2 text-sm font-semibold text-gray-500 hover:text-black">
            <Bookmark size={16} className="mr-2" /> ENREGISTRÉS
          </Button>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-1">
        {/* Ici, vous pouvez ajouter une grille des posts de l'utilisateur */}
        {[...Array(9)].map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
};