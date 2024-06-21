import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false); // State for success popup
  const [showIncompleteError, setShowIncompleteError] = useState(false); // State for incomplete form error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.username || !formData.email || !formData.password) {
      setShowIncompleteError(true); // Show incomplete form error
      return; // Exit early if there are errors
    }

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

      // Show success popup
      setShowSuccess(true);

      // Reset form after successful submission (optional)
      setFormData({});
      setShowIncompleteError(false); // Reset incomplete form error

    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccess(false);
  };

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
          className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
          Sign-Up
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign-in</span>
        </Link>
      </div>

      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-xl text-center text-gray-800">User successfully signed up!</p>
            <button
              className="block mx-auto mt-4 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={closeSuccessPopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Incomplete form error popup */}
      {showIncompleteError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-xl text-center text-red-500">Please complete all required fields!</p>
            <button
              className="block mx-auto mt-4 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={() => setShowIncompleteError(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
