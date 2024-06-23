import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';  // Ensure this path is correct and properly configured
import {useDispatch} from 'react-redux'
import { signInsuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom'
export default function Oauth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      
      const res = await fetch('/api/auth/google' , {
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({name : result.user.displayName , email : result.user.email , 
          photo : result.user.photoURL})
      }) 
      const data = await res.json()
      dispatch(signInsuccess(data))
      navigate('/');  
       
    } catch (error) {
      console.error("Could not sign in with Google", error);
    }
  }

  return (
    <button
      type='button'
      onClick={handleGoogle}
      className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 flex items-center justify-center w-full'
    >
      Continue with Google
    </button>
  );
}
