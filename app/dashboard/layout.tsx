'use client'
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { TotalUsageContext } from '../(context)/TotalUsageContext'
import Script from 'next/script'
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext'
import { UpdateCreaditUsageContext } from '../(context)/UpdateCreditUsageContext'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [totalUsage, setTotalUsage] = useState<number>(0)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>()
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false)

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey!)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  return (
    <>
      {/* <Script
        type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      /> */}
      <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
        <UserSubscriptionContext.Provider
          value={{ isSubscribed, setIsSubscribed }}
        >
          <UpdateCreaditUsageContext.Provider
            value={{ updateCreditUsage, setUpdateCreditUsage }}
          >
            <div className="h-full bg-slate-100 sm:h-full">
              <div className={`fixed md:block md:w-64 ${isSideNavOpen ? 'block' : 'hidden'}`}>
                <SideNav isOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
              </div>
              <div className="md:ml-64">
                <Header toggleSideNav={toggleSideNav} />
                {children}
              </div>
            </div>
          </UpdateCreaditUsageContext.Provider>
        </UserSubscriptionContext.Provider>
      </TotalUsageContext.Provider>
    </>
  )
}

export default layout
