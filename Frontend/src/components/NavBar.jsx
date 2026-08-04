import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-slate-100 shadow-sm">
      <Link to="/" className="text-2xl font-bold text-sky-700">
        Book Store
      </Link>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-700">Hi, {user?.name}</span>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <> 
            <Link to="/login" className="text-sky-700 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-sky-700 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
