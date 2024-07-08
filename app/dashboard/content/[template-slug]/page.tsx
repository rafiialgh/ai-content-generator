'use client';
import React, { useEffect, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TemplateInterfaces } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { chatSession } from '@/utils/AiModal';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

export interface SlugInterfaces {
  params: {
    'template-slug': string;
  };
}

function CreateNewContent(props: SlugInterfaces) {
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')
  const { user } = useUser()

  const selectedTemplate: TemplateInterfaces | undefined = Templates?.find(
    (item) => item.slug == props.params['template-slug']
  );

  const GenerateAIContent = async (formData: any) => {
    setLoading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt;

    const result = await chatSession.sendMessage(finalAIPrompt)
    setAiOutput(result.response?.text())
    await saveInDb(formData, selectedTemplate?.slug, result.response?.text())
    setLoading(false)
  };

  const saveInDb = async (formData: string, slug: any, aiResp: string) => {
    const result =  await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD/MM/YYYY')
    })
    
    console.log(result)
  }

  return (
    <div className='p-10'>
      <Link href={'/dashboard'}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-5'>
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenerateAIContent(value)}
          loading={loading}
        />
        {/* Output Section */}
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
