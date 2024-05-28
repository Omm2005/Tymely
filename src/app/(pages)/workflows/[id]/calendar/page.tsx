import CalendarComponent from '@/components/workflow/Calendar'
import { getMilestones } from '@/server/actions'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({
  params: {
    id,
  }
}: {
  params: {
    id: string
  }
}) => {
  const milestones = await getMilestones(id)
  if(!milestones) {
    return redirect('/workflows')
  }

  return (
    <section className='h-full w-full py-16 overflow-auto'>
      <CalendarComponent milestones={milestones} />
    </section>
  );
}

export default page