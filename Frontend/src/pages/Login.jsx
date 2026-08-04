import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { saveAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      saveAuth(response.data);
      enqueueSnackbar('Login successful', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Login failed', { variant: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link className="text-sky-700" to="/register">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
