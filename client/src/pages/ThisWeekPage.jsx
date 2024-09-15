import React from 'react'

export default function ThisWeekPage() {
  return (
          <>
            <div className='w-10 border-r h-full'></div>
            <div className=' absolute top-32 left-0 w-full'>
              <h1 className='pl-20 py-2 w-full bg-[#F7F7F7] font-bold text-lg text-[#787878]'>
                Today (Mon, 28 Sep)
              </h1>
              <div>
                {/* list item */}
                <div className='flex gap-10 pl-9 mt-5'>
                  <div className='w-2 h-2 rounded-full bg-green-500 mt-2'></div>
                  <div>
                    <p className='opacity-50'>13:00 - 14:00</p>
                    <p className='text-xl'>Lunch with Petr</p>
                  </div>
                </div>
                <div className='flex gap-10 pl-9 mt-5'>
                  <div className='w-2 h-2 rounded-full bg-green-500 mt-2'></div>
                  <div>
                    <p className='opacity-50'>13:00 - 14:00</p>
                    <p className='text-xl'>Lunch with Petr</p>
                  </div>
                </div>
              </div>
            </div>
          </>
  )
}
