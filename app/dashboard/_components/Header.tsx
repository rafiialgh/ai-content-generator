import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 sm:flex sm:justify-between sm:items-center bg-white sm:flex-row flex flex-col-reverse gap-3'>
      <div className='flex gap-2 items-center p-2 border rounded-md sm:w-[50%] max-w-2xl '>
        <Search />
        <input type='text' placeholder='Search...' className='outline-none text-gray-600 w-full' />
      </div>
      <div className='flex gap-5 items-center justify-between'>
        <h2 className='bg-primary p-1 rounded-full text-xs text-center text-white px-4 sm:mt-0'>Join membership just for $9.99/Month 🔥</h2>
        <UserButton />
      </div>
    </div>
  )
}

export default Header