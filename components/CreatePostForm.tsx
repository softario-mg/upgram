import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, X, Smile, User, Plus } from 'lucide-react';

interface CreatePostFormProps {
  newPost: { caption: string; imageUrl: string; tags: string[] };
  setNewPost: (post: { caption: string; imageUrl: string; tags: string[] }) => void;
  handleCreatePost: () => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ newPost, setNewPost, handleCreatePost }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleAddTag = () => {
    if (tagInput && !newPost.tags.includes(tagInput)) {
      setNewPost({ ...newPost, tags: [...newPost.tags, tagInput] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({ ...newPost, tags: newPost.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <Card className="mb-8 overflow-hidden bg-white rounded-lg shadow-xl">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Créer un nouveau post</h2>
        <Button variant="ghost" onClick={toggleExpand}>
          {isExpanded ? <X size={20} /> : <Image size={20} />}
        </Button>
      </div>
      {isExpanded && (
        <div className="p-4">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="URL de l'image"
              value={newPost.imageUrl}
              onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
              className="w-full"
            />
          </div>
          {newPost.imageUrl && (
            <div className="mb-4 relative pt-[100%]">
              <img 
                src={newPost.imageUrl} 
                alt="Preview" 
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              />
            </div>
          )}
          <div className="relative mb-4">
            <textarea
              placeholder="Ajouter une légende..."
              value={newPost.caption}
              onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
              className="w-full p-2 h-24 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              variant="ghost" 
              className="absolute bottom-2 right-2"
              onClick={() => {/* Logique pour ajouter un emoji */}}
            >
              <Smile size={20} />
            </Button>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Input
                type="text"
                placeholder="Ajouter un tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus size={20} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newPost.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center animate-fadeIn"
                >
                  <User size={16} className="mr-1" />
                  {tag}
                  <Button 
                    variant="ghost" 
                    onClick={() => handleRemoveTag(tag)} 
                    className="ml-1 p-0 hover:bg-blue-200 rounded-full"
                  >
                    <X size={14} />
                  </Button>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleCreatePost}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Partager
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};