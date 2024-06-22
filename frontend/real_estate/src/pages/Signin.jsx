import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInstart , signInfailure , signInsuccess } from '../redux/user/userSlice';
import Oauth from '../components/Oauth';

export default function Signin() {
  const [formData, setFormData] = useState({});
   const {loading , error } = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      
      dispatch (signInstart());
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
       dispatch(signInfailure(data.message));
        return;
      }
     dispatch(signInsuccess(data));
      navigate('/');
      
    } catch (error) {
     dispatch(signInfailure(error.message));
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
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <Oauth />
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
