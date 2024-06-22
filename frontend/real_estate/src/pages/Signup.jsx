import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');
      
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='container mx-auto max-w-md mt-10 bg-white p-6 rounded-lg shadow-md'>
      {/* Title */}
      <h1 className='text-3xl text-center font-semibold mb-6 text-gray-800'>Sign Up</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Username Input */}
        <div>
          <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
          <input
            type='text'
            id='username'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            value={formData.username || ''}
            onChange={handleChange}
          />
        </div>
        
        {/* Email Input */}
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            id='email'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>
        
        {/* Password Input */}
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
          <input
            type='password'
            id='password'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            value={formData.password || ''}
            onChange={handleChange}
          />
        </div>
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className={`mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      
      {/* Sign In Link */}
      <div className='mt-6 flex justify-center text-sm text-gray-600'>
        <p>Already have an account?</p>
        <Link to='/sign-in' className='ml-1 font-medium text-indigo-600 hover:text-indigo-500'>
          Sign in
        </Link>
      </div>
    </div>
  );
}
