import React from 'react'

export default function Signup() {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Signup
      </h1>
      <form >
        <input type="text" placeholder='username' 
        className='border p-3 rounded-lg ' id=' username '/> 
      </form>
    </div>
  )
}
