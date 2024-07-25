import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 sm:flex justify-between items-center bg-white'>
      <div className='flex gap-2 items-center p-2 border rounded-md sm:w-[25%] max-w-lg'>
        <Search />
        <input type='text' placeholder='Search...' className='outline-none text-gray-600 w-full' />
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary p-1 rounded-full text-xs text-center text-white px-4 mt-3 sm:mt-0'>Join membership just for $9.99/Month 🔥</h2>
        <UserButton />
      </div>
    </div>
  )
}

export default Header