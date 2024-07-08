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

export interface SlugInterfaces {
  params: {
    'template-slug': string;
  };
}

function CreateNewContent(props: SlugInterfaces) {
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')

  const selectedTemplate: TemplateInterfaces | undefined = Templates?.find(
    (item) => item.slug == props.params['template-slug']
  );

  const GenerateAIContent = async (formData: any) => {
    setLoading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt;

    const result = await chatSession.sendMessage(finalAIPrompt)
    console.log(result.response.text())
    setAiOutput(result.response?.text())
    setLoading(false)
  };

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
