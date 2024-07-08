'use client';
import { FileClock, Home, Settings, WalletCards } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideNav() {
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
      name: 'Setting',
      icon: Settings,
      path: '/dashboard/setting',
    },
  ];

  return (
    <div className='h-screen p-5 shadow-sm border bg-white'>
      <div className='flex'>
        <Image
          className='ml-3'
          src={'/logo.svg'}
          alt='logo'
          width={57}
          height={57}
        />
      </div>
      <hr className='my-3 border' />
      <div className='mt-3'>
        {MenuList.map((menu, index) => (
          <Link href={menu.path}>
            <div
              className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                path == menu.path && 'bg-primary text-white'
              }`}
              key={index}
            >
              <menu.icon />
              <h2 className='text-md'>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
