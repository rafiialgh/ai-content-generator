import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Settings() {
  return (
    <div className='flex justify-center items-center p-10 '>
      <UserProfile path='/dashboard/settings' />
    </div>
  )
}

export default Settings