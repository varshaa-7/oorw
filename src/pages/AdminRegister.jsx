import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_REGISTER_URL = 'http://localhost:5000/api/auth/register';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsLoading(true);

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ 
          type: 'success', 
          text: data.message + ' You can now log in.' 
        });
        // Optionally, redirect to login page after a delay
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Registration failed. Please try again.' 
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setMessage({ 
        type: 'error', 
        text: 'Network error. Could not connect to the server.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 border border-orange-100">
        <h1 className="text-3xl font-extrabold text-orange-800 text-center mb-8">
          Admin Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="Admin Name"
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password (Min 6 characters)</label>
            <input 
              type="password" 
              id="password"
              name="password"
              placeholder="********"
              value={formData.password} 
              onChange={handleChange} 
              required 
              minLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {message.text && (
            <p className={`text-sm font-medium text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.text}
            </p>
          )}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registering...' : 'Register New Admin'}
            </button>
          </div>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
           Already registered? <Link to="/admin/login" className="text-orange-600 hover:underline">Go to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;