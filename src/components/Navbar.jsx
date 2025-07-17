// src/components/Navbar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", text: "Ana səhifə" },
    { href: "/#features", text: "Funksiyalar" },
    { href: "/#pricing", text: "Qiymətlər" },
    { href: "/#faq", text: "FAQ" },
    { href: "/#contact", text: "Əlaqə" },
  ];

  async function handleLogout() {
    try {
      await logout();
      navigate('/sign-in'); // Redirect to sign-in after logout
    } catch {
      // Handle logout errors here
    }
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon icon={faBrain} className="text-indigo-600 text-2xl mr-2" />
              <span className="text-xl font-bold text-indigo-600">SmartSat</span>
            </a>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a key={link.text} href={link.href} className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center">
            {currentUser ? (
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Çıxış
              </button>
            ) : (
              <>
                <a href="/sign-in" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Giriş</a>
                <a href="/sign-up" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Qeydiyyat</a>
              </>
            )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Ana Menyu</span>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
             <a key={link.text} href={link.href} onClick={() => setIsMenuOpen(false)} className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
               {link.text}
             </a>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              {currentUser ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Çıxış
                </button>
              ) : (
                <>
                  <a href="/sign-in" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Giriş</a>
                  <a href="/sign-up" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Qeydiyyat</a>
                </>
              )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;