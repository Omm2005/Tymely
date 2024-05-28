import { getServerAuthSession } from '@/server/auth'
import React from 'react'
import UserAvatar from '@/components/global/useravatar'
import { ModeToggle } from '@/components/global/ModeToggle'
import WorkflowButton from '@/components/workflowButton'
import { redirect } from 'next/navigation'
import { onGetWorkflows } from '@/server/actions'
import WorkflowCard from '@/components/workflowCard'

const WorkflowsPage = async() => {
  const session = await getServerAuthSession()
  const user = session?.user
  if(!user) {
    return redirect('/')
  }
  const workflows = await onGetWorkflows()
  return (
    <main className='flex flex-col gap-4 w-screen p-2 h-screen overflow-hidden'>
      <section className='flex flex-col gap-4 border-2 relative h-full rounded-lg'>
      <div className='flex w-full items-center justify-between border-b sticky top-0 z-[10] p-5 bg-background/50 backdrop-blur-lg'>
        <h1 className='md:text-4xl flex items-center text-lg' >
            Workflows
        </h1>
        <div className='flex gap-5 justify-center items-center'>
          <div className='hidden md:flex'>
          <WorkflowButton title='Create a Workflow' />
          </div>
          <ModeToggle />
        <UserAvatar user={user ? user : null} />
        </div>
      </div>
      <div className='h-screen w-full flex flex-col px-2 gap-5'>
        {
          workflows?.map((workflow) => {
            return (
              <WorkflowCard key={workflow.id} id={workflow.id} vision={workflow.vision} toDate={workflow.toDate} fromDate={workflow.fromDate} duration={workflow.duration} />
            )
        }
        )}
      </div>
      <div className='absolute bottom-5 right-5 flex md:hidden'>
        <WorkflowButton title='' isRounded size='icon' />
      </div>
      </section>
    </main>
  )
}

export default WorkflowsPage