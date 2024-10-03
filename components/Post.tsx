import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from 'lucide-react';

interface PostProps {
  post: {
    id: number;
    userId: number;
    username: string;
    imageUrl: string;
    caption: string;
    likes: number;
    comments: string[];
    tags: string[];
  };
  handleLike: (postId: number) => void;
  handleComment: (postId: number, comment: string) => void;
}

export const Post: React.FC<PostProps> = ({ post, handleLike, handleComment }) => {
  return (
    <Card className="mb-8 overflow-hidden bg-white rounded-lg shadow-xl">
      <div className="p-4 flex items-center border-b border-gray-200">
        <img
          src={`https://i.pravatar.cc/150?u=${post.userId}`}
          alt={post.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold text-gray-800">{post.username}</span>
      </div>
      <img src={post.imageUrl} alt={`Post de ${post.username}`} className="w-full" />
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Button
            onClick={() => handleLike(post.id)}
            variant="ghost"
            className="mr-2 hover:text-red-500 transition-colors duration-200"
          >
            ❤️
          </Button>
          <Button variant="ghost" className="mr-2">💬</Button>
          <Button variant="ghost">📤</Button>
        </div>
        <p className="font-bold mb-2 text-gray-800">{post.likes} likes</p>
        <p className="mb-2">
          <span className="font-semibold text-gray-800">{post.username}</span>{' '}
          {post.caption}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center text-sm"
              >
                <User size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.comments.map((comment, index) => (
          <p key={index} className="text-gray-600">
            <span className="font-semibold text-gray-800">user{index + 1}</span> {comment}
          </p>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              comment: { value: string };
            };
            handleComment(post.id, target.comment.value);
            target.comment.value = '';
          }}
          className="flex"
        >
          <Input
            type="text"
            name="comment"
            placeholder="Ajouter un commentaire..."
            className="flex-grow mr-2"
          />
          <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold transition duration-300">
            Publier
          </Button>
        </form>
      </div>
    </Card>
  );
};