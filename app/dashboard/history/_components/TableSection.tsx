import React from 'react'

function TableSection() {
  return (
    <div className='bg-white border rounded-md p-5'>
      <h2 className='text-2xl font-black'>History</h2>
      <p className='text-gray-500 text-sm'>Search your previously generate AI content</p>
      <div className='bg-slate-100 grid grid-cols-7 justify-between p-4 rounded-md text-lg font-bold mt-5'>
        <div className='col-span-2'>Template</div>
        <div className='col-span-2'>AI Response</div>
        <div className=''>Date</div>
        <div className=''>Words</div>
        <div className=''>Copy</div>
      </div>
      <div className='p-4'>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
    </div>
  )
}

export default TableSection