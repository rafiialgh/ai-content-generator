'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import { DataTablesProps } from '../history/_components/TableSection'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'

function UsageTrack() {
  const { user } = useUser()
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext)

  const getData = async () => {
    // @ts-ignore
    const result: DataTablesProps[] = await db
      .select()
      .from(AIOutput)
      .where(
        eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? '')
      )

    getTotalUsage(result)
  }

  const getTotalUsage = (result: DataTablesProps[]) => {
    let total: number = 0
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.split(' ').length)
    })

    setTotalUsage(total)
  }

  useEffect(() => {
    user && getData()
  }, [user])

  return (
    <div className="m-5">
      <div className="p-3 bg-primary text-white rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#3c74ff] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: (totalUsage / 10000) * 100 + '%' }}
          ></div>
        </div>
        <h2 className="text-sm my-1">{totalUsage}/10,000 Credit Used</h2>
      </div>
      <Button variant={'secondary'} className="w-full mt-3 font-medium">
        Upgrade
      </Button>
    </div>
  )
}

export default UsageTrack
