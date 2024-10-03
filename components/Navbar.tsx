'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, MessageCircle, User, LogOut } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex-1"></div> {/* Espace vide à gauche pour centrer la barre de recherche */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Button 
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0"
              variant="ghost"
            >
              <Search size={20} />
            </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost"><Bell size={20} /></Button>
            <Button variant="ghost"><MessageCircle size={20} /></Button>
            <Button variant="ghost" onClick={toggleMenu}><User size={20} /></Button>
          </nav>
          <Button className="md:hidden" onClick={toggleMenu}>Menu</Button>
        </div>
        <div className="flex-1"></div> {/* Espace vide à droite pour centrer la barre de recherche */}
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-2 px-4 md:hidden">
          <nav className="flex flex-col space-y-2">
            <Button variant="ghost" className="justify-start"><Bell size={20} className="mr-2" /> Notifications</Button>
            <Button variant="ghost" className="justify-start"><MessageCircle size={20} className="mr-2" /> Messages</Button>
            <Button variant="ghost" className="justify-start"><User size={20} className="mr-2" /> Profil</Button>
            <Button variant="ghost" className="justify-start"><LogOut size={20} className="mr-2" /> Déconnexion</Button>
          </nav>
        </div>
      )}
    </header>
  );
};