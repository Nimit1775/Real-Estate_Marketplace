import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); 
  const [error , setError] = useState(''); 
  const navigate = useNavigate();
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

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/');
      
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };
  console.log('FormData:', formData); // Debugging log to check state

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-slate-800'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          disabled={loading}
          className={`bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80`}         
        >
          {loading ? 'Signing Up...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Dont Have an Account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign-up</span>
        </Link>
      </div>
    </div>
  );
}
