import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { RequireAuth } from './context/AuthContext';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books/create"
          element={
            <RequireAuth>
              <CreateBook />
            </RequireAuth>
          }
        />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route
          path="/books/edit/:id"
          element={
            <RequireAuth>
              <EditBook />
            </RequireAuth>
          }
        />
        <Route
          path="/books/delete/:id"
          element={
            <RequireAuth>
              <DeleteBook />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
