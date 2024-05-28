import MilestoneEdit from '@/components/workflow/milestoneEdit'
import { getWorkflow } from '@/server/actions'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const page = async ({
  params: { id }
}: Props) => {
  const workflow = await getWorkflow(id)
  if(!workflow) return redirect('/workflows')
  return (
    <section className='h-full w-full overflow-auto'>
      <MilestoneEdit Workflow={workflow}  />
    </section>
  )
}

export default page