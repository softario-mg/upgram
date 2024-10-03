'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, Compass, Heart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  onViewChange: (view: 'feed' | 'profile') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, onViewChange }) => {
  const sidebarItems = [
    { icon: <Home size={24} />, text: 'Accueil', action: () => onViewChange('feed') },
    { icon: <Search size={24} />, text: 'Recherche', action: () => {} },
    { icon: <Compass size={24} />, text: 'Explorer', action: () => {} },
    { icon: <Heart size={24} />, text: 'Notifications', action: () => {} },
    { icon: <User size={24} />, text: 'Profil', action: () => onViewChange('profile') },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={`fixed top-4 ${open ? 'left-64' : 'left-4'} z-50 transition-all duration-300`}
      >
        {open ? '✕' : '☰'}
      </Button>
      <div className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="p-4">
          <h1 className="text-xl font-bold mb-6">Instagram Clone</h1>
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-2 px-4 hover:bg-gray-100"
                  onClick={item.action}
                >
                  <span className="inline-flex items-center">
                    {item.icon}
                    <span className="ml-4">{item.text}</span>
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};