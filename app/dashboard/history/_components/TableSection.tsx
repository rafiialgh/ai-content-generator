'use client';
import Templates from '@/app/(data)/Templates';
import { db } from '@/utils/db';
import { Copy } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

export interface DataTablesProps {
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function TableSection() {
  const [dataTables, setDataTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.query.AIOutput.findMany();
      // Handle the fetched data here
      console.log(data);
      setDataTables(data);
      setLoading(false)
    };

    fetchData();
  }, []);

  const getTemplateData = (slug: string) => {
    return Templates.find((template) => template.slug === slug);
  };

  return (
    <div className='bg-white border rounded-md p-5'>
      <h2 className='text-2xl font-black'>History</h2>
      <p className='text-gray-500 text-sm'>
        Search your previously generate AI content
      </p>
      {/* tables */}
      <div className='w-full overflow-x-auto'>
        <div className='bg-slate-100 grid grid-cols-7 justify-between p-4 rounded-md text-lg font-bold mt-5 gap-2 min-w-[40rem]'>
          <div className='col-span-2'>Template</div>
          <div className='col-span-2'>AI Response</div>
          <div className=''>Date</div>
          <div className=''>Words</div>
          <div className=''>Copy</div>
        </div>
        {loading ? (
          <div className='flex  justify-center items-center h-32 text-black'>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {dataTables.map((item: DataTablesProps, index) => {
              const templateData = getTemplateData(item.templateSlug);
              return (
                <div
                  className='px-4 py-10 grid  grid-cols-7 border-b gap-4 font-black min-w-[40rem]'
                  key={index}
                >
                  <div className='col-span-2 flex items-center'>
                    {templateData && (
                      <>
                        <img
                          src={templateData.icon}
                          alt={templateData.name}
                          className='w-10 h-10 mr-2'
                        />
                        {templateData.name}
                      </>
                    )}
                  </div>
                  <div className='col-span-2 line-clamp-3 overflow-scroll'>
                    {item.aiResponse}
                  </div>
                  <div className='line-clamp-3 flex items-center'>
                    {item.createdAt}
                  </div>
                  <div className=' flex items-center'>
                    {item.aiResponse.split(' ').length}
                  </div>
                  <div className=' flex items-center'>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(item.aiResponse)
                      }
                      className='flex gap-2 text-primary hover:bg-slate-100 active:border active:shadow-sm  p-3 rounded-md hover:underline'
                    >
                      <Copy className='w-4 h-4' />
                      
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default TableSection;
