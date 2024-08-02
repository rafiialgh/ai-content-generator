import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Menu, Search } from 'lucide-react'
import React, { useContext } from 'react'


function Header({ toggleSideNav }: { toggleSideNav: () => void }) {

  const {isSubscribed, setIsSubscribed} = useContext(UserSubscriptionContext)

  return (
    <div className="flex flex-col-reverse gap-3 border-b-2 bg-white p-5 shadow-sm sm:flex sm:flex-row sm:items-center sm:justify-between">
      
      <div className="flex max-w-2xl items-center gap-2 rounded-md border p-2 sm:w-[50%]">
        <Search />
        <input
          type="text"
          placeholder="Search..."
          className="w-full text-gray-600 outline-none"
        />
      </div>
      <div className="flex items-center justify-between gap-5">
      <Button className="sm:hidden" onClick={toggleSideNav}>
        <Menu width={15} height={15} />
      </Button>

      {!isSubscribed && <h2 className="rounded-full bg-primary p-1 px-4 text-center text-xs text-white sm:mt-0">
          Join membership just for $9.99/Month 🔥
        </h2> }
        
        <UserButton />
      </div>
    </div>
  )
}

export default Header
