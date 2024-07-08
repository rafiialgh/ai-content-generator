'use client';
import React, { useState } from 'react';
import { TemplateInterfaces } from '../../_components/TemplateListSection';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

export interface PROPS {
  selectedTemplate?: TemplateInterfaces;
  userFormInput: any;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<object>({});
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className='p-5 shadow-md border rounded-lg bg-white'>
      <Image
        src={selectedTemplate?.icon ?? ''}
        alt='icon'
        width={70}
        height={70}
        className='mb-2'
      />
      <h2 className='font-bold text-2xl mb-2 text-primary'>
        {selectedTemplate?.name}
      </h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
      <form onSubmit={onSubmit} className='mt-6'>
        {selectedTemplate?.form?.map((item, index) => (
          <div className='my-2 flex flex-col gap-2 mb-7'>
            <label className='font-semibold' htmlFor=''>
              {item.label}
            </label>
            {item.field == 'input' ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : item.field == 'textarea' ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : null}
          </div>
        ))}
        <Button type='submit' className='w-full py-6 flex gap-2' disabled={loading}>
          {loading && <Loader2Icon className='animate-spin'/>}
          Generate content
        </Button>
      </form>
    </div>
  );
}

export default FormSection;
