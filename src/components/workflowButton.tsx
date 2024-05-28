'use client'

import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useModal } from '@/Provider/modal-provider'
import CustomModal from './global/custom-modal'
import { cn } from '@/lib/utils'
import Workflowform from './forms/workflow-form'

type Props = {
    title: string,
    isRounded? : boolean
    size?: 'default' | 'icon'
}

const WorkflowButton = ({title , size , isRounded}: Props) => {
    const { setOpen , setClose } = useModal()


    const handleClick = () => {
        setOpen(
            <CustomModal title='Add a Workflow' subheading='Add a new workflow to your project'>
                <Workflowform />
            </CustomModal>
        )
    }
  return (
    <Button size={size ? size : 'default'} className={cn('flex gap-2' , isRounded && 'rounded-full')} variant={'secondary'} onClick={handleClick}>
        <Plus />
        {title}
    </Button>
  )
}

export default WorkflowButton