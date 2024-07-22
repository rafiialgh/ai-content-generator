'use client'
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { TotalUsageContext } from '../(context)/TotalUsageContext'
import Script from 'next/script'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0)

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
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

  return (
    <>
      {/* <Script
        type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      /> */}
      <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
        <div className="h-full sm:h-screen bg-slate-100">
          <div className="fixed hidden md:block md:w-64">
            <SideNav />
          </div>
          <div className="md:ml-64">
            <Header />
            {children}
          </div>
        </div>
      </TotalUsageContext.Provider>
    </>
  )
}

export default layout
