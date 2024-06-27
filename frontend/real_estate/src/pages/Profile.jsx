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
    <div className="max-w-md m-2 mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
    <div className="bg-blue-800 p-1 transition-colors duration-300 hover:bg-blue-700">
      <h1 className="text-3xl font-bold text-center text-white">Profile</h1>
    </div>
    <form className="p-6 space-y-6">
      <div className="flex flex-col items-center mb-6">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <div className="relative group">
          <img
            onClick={() => fileRef.current.click()}
            className="w-24 h-24 object-cover rounded-full cursor-pointer transition-all duration-300 border-4 border-blue-600 group-hover:border-blue-400"
            src={formData.avatar || currentUser.avatar}
            alt="Profile"
          />
          <div className="inset-0 bg-blue-800 bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 flex items-center justify-center">
            <span className="absolute bottom-10 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Change</span>
          </div>
        </div>
        <p className="mt-2 text-sm">
          {fileUploadError ? (
            <span className="text-red-600">Error Uploading File</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-blue-600">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-600">Successfully Uploaded</span>
          ) : (
            ''
          )}
        </p>
      </div>
      <fieldset className="border border-blue-300 rounded-md p-4">
        <legend className="text-blue-600 font-semibold px-2">Personal Information</legend>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="username"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-transparent"
              placeholder="Username"
            />
            <label
              htmlFor="username"
              className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="border border-blue-300 rounded-md p-4">
        <legend className="text-blue-600 font-semibold px-2">Security</legend>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-transparent"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Password
          </label>
        </div>
      </fieldset>
      <button className="w-full bg-blue-800 text-white rounded-md py-2 px-4 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95">
        Update Profile
      </button>
    </form>
    <div className="flex justify-between px-6 py-4 bg-gray-100">
      <button className="text-red-600 hover:text-red-800 hover:underline focus:outline-none transition-colors duration-300">
        Delete Account
      </button>
      <button className="text-red-600 hover:text-red-800 hover:underline focus:outline-none transition-colors duration-300">
        Sign Out
      </button>
    </div>
  </div>
  );
}
