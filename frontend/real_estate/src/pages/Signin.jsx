import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // State for loading button

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      console.log('Submitting:', formData); // Debugging log

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log('Response:', data);

      // Reset form after successful submission (optional)
      setFormData({});
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  console.log('FormData:', formData); // Debugging log to check state

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-800'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          value={formData.username || ''}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          value={formData.email || ''}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          value={formData.password || ''}
          onChange={handleChange}
        />
        <button
          type="submit" // Ensure it's a submit button to trigger onSubmit
          className={`bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign-Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign-in</span>
        </Link>
      </div>
    </div>
  );
}
