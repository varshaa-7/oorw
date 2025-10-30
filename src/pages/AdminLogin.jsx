import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api/auth/login';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store JWT token for subsequent API calls
        localStorage.setItem('adminToken', data.token);
        
        // Redirect to dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-orange-800 text-center mb-8">
          Admin Login 🔒
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              placeholder="admin@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="********"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          )}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;