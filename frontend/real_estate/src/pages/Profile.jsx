import React, { useState  , useEffect} from 'react';
import { useSelector } from "react-redux";
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileperc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({}) ;
 

  useEffect(()=>{
    if(file){
      handleFileUpload(file);   
    }
    } , [file]);

  const handleFileUpload =(file)=>{
    const storage = getStorage(app);
    const fileName =   new Date().getTime()+  file.name;
    const storageRef =  ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef, file); 

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
      },
    
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setFormData({...formData , avatar : downloadURL});
      
      })
    }
  );
  }
  return (
    <div className='p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg'>
      <h1 className='text-4xl font-bold text-center my-7 text-gray-800'>
        Profile
      </h1>
      <form className='flex flex-col gap-6'>
        <div className='flex justify-center'>
          <input onChange={(e)=>setFile(e.target.files[0])}  type="file" ref={fileRef}  hidden accept='image/*' />
          <img onClick={()=>fileRef.current.click()}
            className='rounded-full h-28 w-28 object-cover cursor-pointer transition-transform hover:scale-105 shadow-md'
            src={formData.avatar || currentUser.avatar}
            alt='Profile'
          />
          <p>
             { fileUploadError  ?
            (<span className='text-red-700'>
              Error Uploading File
            </span> ) :
            fileperc > 0 && fileperc < 100 ?
            (
              <span className='text-slate-800'>
                {`Uploading ${fileperc}%`}
              </span> ) :
              fileperc === 100 ?
              ( 
               
                <span className='text-green-700 flex flex-col justify-end h-full  justify-centerself-center mb-6  '>
                   successfully Uploaded
                </span>
              ) : ('')
              
            }
          
          
          </p>
        </div>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
        />
        <button
          className='bg-indigo-600 text-white rounded-lg p-3 uppercase hover:bg-indigo-700 disabled:opacity-75 transition-colors'
        >
          Update
        </button>
      </form>
      <div className='flex justify-between gap-5 mt-6'>
        <span className='text-red-700 cursor-pointer lowercase hover:underline transition-all'>
          Delete Account!
        </span>
        <span className='text-red-700 cursor-pointer lowercase hover:underline transition-all'>
          Sign-out?
        </span>
      </div>
    </div>
  );
}
