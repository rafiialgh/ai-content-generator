  'use client';
  import { FileClock, Home, Settings, WalletCards, X, } from 'lucide-react';
  import Image from 'next/image';
  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import React from 'react';
  import UsageTrack from './UsageTrack';
  import { Button } from '@/components/ui/button'

  function SideNav({ isOpen, toggleSideNav }: { isOpen: boolean, toggleSideNav: () => void }) {
    const path = usePathname();

    const MenuList = [
      {
        name: 'Home',
        icon: Home,
        path: '/dashboard',
      },
      {
        name: 'History',
        icon: FileClock,
        path: '/dashboard/history',
      },
      {
        name: 'Billing',
        icon: WalletCards,
        path: '/dashboard/billing',
      },
      {
        name: 'Settings',
        icon: Settings,
        path: '/dashboard/settings',
      },
    ];

    return (
      <div className={`h-screen w-80 sm:w-auto fixed z-50 top-0 left-0 p-5 shadow-sm border bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 sm:relative sm:translate-x-0`}>
        <div className='flex justify-between items-center'>
          <Image
            className='ml-3'
            src={'/logo.svg'}
            alt='logo'
            width={57}
            height={57}
          />
          <Button className='sm:hidden' onClick={toggleSideNav}>
            <X width={19} height={19} />
          </Button>
        </div>
        <hr className='my-3 border' />
        <div className='mt-3'>
          {MenuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div
                className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                  path == menu.path && 'bg-primary text-white'
                }`}
              >
                <menu.icon />
                <h2 className='text-md'>{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className='absolute bottom-10 left-0 w-full'>
          <UsageTrack />
        </div>
      </div>
    );
  }

  export default SideNav;
