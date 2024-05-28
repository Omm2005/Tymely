'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { onDeleteWorkflow } from '@/server/actions'
import { toast } from 'sonner'

type Props = {
    id: string,
    vision: string,
    toDate: Date,
    fromDate: Date,
    duration: number,
}

const WorkflowCard = ({
    id,
    vision,
    toDate,
    fromDate,
    duration,
}: Props) => {
    const router = useRouter()
    const [Loading, setLoading] = useState(false)

    const DeleteWorkflow = async (id: string) => {
        setLoading(true)
        try {
            const result = await onDeleteWorkflow(id)
            if (result) {
                toast.success('Milestone Deleted Successfully')
                router.refresh()
            }
        } catch (error) {
            toast.error('Error deleting milestone')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="flex w-full md:flex-row flex-col md:items-center items-start justify-between hover:bg-muted">
                        <Link href={`/workflows/${id}/flow`}>
            <CardHeader className="flex flex-col gap-4 w-full">
                <div className="">
                    <CardTitle className="md:text-lg text-base">{vision}</CardTitle>
                    <CardDescription className='flex gap-3 justify-between items-center w-full'>
                        <div>

                            <span className='text-base text-foreground/70'>

                                {
                                    `
                                    ${format(fromDate, "PPP")} - ${' '}
                                    ${format(toDate, "PPP")}
                                    `
                                }
                            </span>
                            <span className='text-base text-foreground/40'>
                                ({duration} Days)
                            </span>
                                </div>
                    </CardDescription>
                </div>
            </CardHeader>
                        </Link>
            <CardContent className='pb-4 md:py-0 md:pb-0' >
                <Button size="icon" variant={'destructive'} className="rounded-full md:flex hidden" onClick={() => DeleteWorkflow(id)} disabled={Loading}>
                    <Trash className="h-4 w-4" />
                </Button>
                <Button size="default" variant={'destructive'} className="rounded-full md:hidden" onClick={() => DeleteWorkflow(id)} disabled={Loading}>
                    Delete
                </Button>
            </CardContent>
        </Card>
    )
}

export default WorkflowCard