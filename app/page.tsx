'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { CreatePostForm } from "@/components/CreatePostForm";
import { Post } from "@/components/Post";
import { UserProfile } from "@/components/UserProfile";
import Login from '@/components/Login';

interface User {
  id: number;
  username: string;
}

interface Post {
  id: number;
  userId: number;
  username: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: string[];
  tags: string[];
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ caption: '', imageUrl: '', tags: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'feed' | 'profile'>('feed');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleCreatePost = async () => {
    if (!user) return;
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPost, userId: user.id }),
    });
    if (res.ok) {
      fetchPosts();
      setNewPost({ caption: '', imageUrl: '', tags: [] });
    }
  };

  const handleLike = async (postId: number) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'like', postId }),
    });
    fetchPosts();
  };

  const handleComment = async (postId: number, comment: string) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'comment', postId, comment }),
    });
    fetchPosts();
  };

  const handleSearch = async () => {
    const res = await fetch(`/api/users?search=${searchTerm}`);
    const data = await res.json();
    setSearchResults(data);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewChange = (view: 'feed' | 'profile') => {
    setCurrentView(view);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} onViewChange={handleViewChange} />
      <div className="flex-1 flex flex-col">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch} 
        />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
          {currentView === 'feed' ? (
            <div className="space-y-8">
              <CreatePostForm newPost={newPost} setNewPost={setNewPost} handleCreatePost={handleCreatePost} />
              {posts.map((post) => (
                <Post key={post.id} post={post} handleLike={handleLike} handleComment={handleComment} />
              ))}
            </div>
          ) : (
            <UserProfile user={{
              id: user.id,
              username: user.username,
              posts: posts.filter(p => p.userId === user.id).length,
              followers: 100,
              following: 50,
              bio: "Ceci est ma bio",
              profilePicture: `https://i.pravatar.cc/300?u=${user.id}`,
            }} />
          )}
        </main>
      </div>
    </div>
  );
}