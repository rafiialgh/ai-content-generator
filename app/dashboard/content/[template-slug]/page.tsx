'use client'
import React, { useContext, useEffect, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TemplateInterfaces } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { chatSession } from '@/utils/AiModal'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'

export interface SlugInterfaces {
  params: {
    'template-slug': string
  }
}

function CreateNewContent(props: SlugInterfaces) {
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { user } = useUser()
  const router = useRouter()

  const selectedTemplate: TemplateInterfaces | undefined = Templates?.find(
    (item) => item.slug == props.params['template-slug']
  )

  const GenerateAIContent = async (formData: any) => {
    if (!selectedTemplate) return

    if (totalUsage >= 10000) {
      router.push('/dashboard/billing')
      console.log(
        'You have reached your limit of 10,000 words. Please upgrade your plan.'
      )
      return
    }

    setLoading(true)
    const selectedPrompt = selectedTemplate.aiPrompt
    const finalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt

    const result = await chatSession.sendMessage(finalAIPrompt)
    try {
      const aiResponse = await result.response?.text()

      if (aiResponse) {
        setAiOutput(aiResponse)
        await saveInDb(formData, selectedTemplate.slug, aiResponse)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching AI response:', error)
      // Handle the error appropriately
    }
  }

  const saveInDb = async (formData: string, slug: string, aiResp: string) => {
    if (
      !user ||
      !user.primaryEmailAddress ||
      !user.primaryEmailAddress.emailAddress
    )
      return

    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user.primaryEmailAddress.emailAddress,
      createdAt: moment().format('DD/MM/YYYY'),
    })

    console.log(result)
  }

  return (
    <div className="p-10">
      <Link href={'/dashboard'}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenerateAIContent(value)}
          loading={loading}
        />
        {/* Output Section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent
