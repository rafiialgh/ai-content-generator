'use client'
import { Button } from '@/components/ui/button'
import { Check, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { product } from '@/app/(data)/DataProducts'
import { NumericFormat } from 'react-number-format'
import axios from 'axios'

export interface ProductInterfaces {
  id: number
  name: string
  price: number
  desc1: string
  desc2: string
  desc3: string
  desc4: string
  quantity: number
  button: boolean
}

function Billing() {
  const [selectedItem, setSelectedItem] = useState<ProductInterfaces | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProcess, setIsProcess] = useState<boolean>(false)

  const checkout = async (item: ProductInterfaces) => {
    const data = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }
    console.log(JSON.stringify(data))

    try {
      setIsLoading(true)
      setIsProcess(true)
      const response = await fetch('/api/tokenizer', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      const responseData = await response.json()

      if (responseData.token) {
        (window as any).snap.pay(responseData.token, {
          onClose: function () {
            setIsLoading(false)
            setIsProcess(false)
          },
        })
      } else {
        console.log('Token not found')
      }
    } catch (error: any) {
      console.error(
        'Error during checkout:',
        error.response ? error.response.data : error.message,
      )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-[8.8rem]">
      <h1 className="text-4xl font-black">Upgrade with monthly plan</h1>
      <div className="mt-9 grid grid-cols-2 gap-5">
        {product.map((item: ProductInterfaces, index) => (
          <div
            className="flex h-[27rem] w-96 flex-col items-center justify-between rounded-xl border bg-white p-10 shadow-sm"
            key={index}
          >
            <h3 className="text-xl font-black">{item.name}</h3>
            <h3 className="mt-5 text-lg font-black">
              <span className="text-4xl">
                <NumericFormat
                  value={item.price}
                  prefix="Rp. "
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  className="w-full"
                />
              </span>{' '}
              /month
            </h3>
            <div className="my-7">
              <p className="flex">
                <Check className="mr-3" /> {item.desc1}
              </p>
              <p className="mt-2 flex">
                <Check className="mr-3" /> {item.desc2}
              </p>
              <p className="mt-2 flex">
                <Check className="mr-3" /> {item.desc3}
              </p>
              <p className="mt-2 flex">
                <Check className="mr-3" /> {item.desc4}
              </p>
            </div>
            <Button
              className="w-full rounded-full flex gap-1"
              disabled={item.button || isProcess}
              onClick={() => checkout(item)}
              
            >
              {isLoading && item.button == false ? (
                <Loader2Icon className="animate-spin" />
              ) : null}
              {item.button ? 'Currently active plan' : 'Get started'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Billing
