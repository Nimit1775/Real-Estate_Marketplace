import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInsuccess } from '../redux/user/userSlice';

export default function Oauth() {
    const handleGoogle = async ()=>{
        try  {
          const provider = new GoogleAuthProvider ;
          const auth = getAuth(app);

          const result = await signInWithPopup(auth, provider);

          const res = await fetch('/api/auth/google',{
            method : 'POST',
            headers :{
              'content-type' : 'application/json'
            },
            body: JSON.stringify({ name : result.user.displayName ,
               email : result.user.email , photo : result.user.photoURL })
          })
          const data = await res.json();
          dipatch(signInsuccess(data));
        }
        catch (error){
            console.log("could not sign in with google" , error);
        }
    } ;
  return (
    <button type='button' onClick={handleGoogle}
    className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
        Continue with Google
        </button>
  )
}
