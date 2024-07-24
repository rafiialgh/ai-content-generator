'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput, UserSubscription } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import { DataTablesProps } from '../history/_components/TableSection'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { NumericFormat } from 'react-number-format'

function UsageTrack() {
  const { user } = useUser()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { isSubscribed, setIsSubscribed } = useContext(UserSubscriptionContext)
  const [maxWords, setMaxWords] = useState<number>(10000)

  useEffect(() => {
    if (user) {
      getData()
      isUserSubscribed()
    }
  }, [user])

  const getData = async () => {
    try {
      // @ts-ignore
      const result: DataTablesProps[] = await db
        .select()
        .from(AIOutput)
        .where(
          eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? ''),
        )

      getTotalUsage(result)
    } catch (error) {
      console.log('Error fetching data: ', error)
    }
  }

  const getTotalUsage = (result: DataTablesProps[]) => {
    let total: number = 0
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.split(' ').length)
    })

    setTotalUsage(total)
  }

  const isUserSubscribed = async () => {
    const result = await db
      .select()
      .from(UserSubscription)
      .where(
        eq(
          UserSubscription.email,
          user?.primaryEmailAddress?.emailAddress ?? ''
        ),
      )

    if (result) {
      setIsSubscribed(true)
      setMaxWords(1000000)
      console.log(isSubscribed)
      console.log(result)
    }
  }

  return (
    <div className="m-5">
      <div className="rounded-lg bg-primary p-3 text-white">
        <h2 className="font-medium">Credits</h2>
        <div className="mt-3 h-2 w-full rounded-full bg-[#3c74ff]">
          <div
            className="h-2 rounded-full bg-white"
            style={{ width: (totalUsage / maxWords) * 100 + '%' }}
          ></div>
        </div>
        <h2 className="my-1 text-sm">
          {totalUsage}/
          <NumericFormat
            value={maxWords}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            className="w-full"
          />{' '}
          Credit used
        </h2>
      </div>
      <Button variant={'secondary'} className="mt-3 w-full font-medium">
        Upgrade
      </Button>
    </div>
  )
}

export default UsageTrack
