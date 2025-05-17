
import React from 'react';
import Logo from '../assets/logo';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 transform text-xl font-semibold text-gray-800">
          dX Onboarding Form
        </h1>
        <div className="w-[40px]">
          {/* Placeholder to ensure title stays centered */}
        </div>
      </div>
    </header>
  );
};

export default Header;
