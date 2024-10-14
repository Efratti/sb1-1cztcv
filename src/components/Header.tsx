import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Home size={24} />
          <h1 className="text-2xl font-bold">Real Estate Finder</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search properties..."
              className="px-2 py-1 rounded text-gray-800"
            />
          </div>
          <Link to="/login" className="flex items-center space-x-1">
            <User size={20} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;