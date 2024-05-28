'use client'

import { Button } from "@/components/ui/button"
import { Pen, Trash } from "lucide-react"
import { format } from "date-fns"
import { useModal } from "@/Provider/modal-provider"
import CustomModal from "../global/custom-modal"
import FlowForm from "../forms/flow-form"
import { onDeleteMilestone } from "@/server/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
    Workflow: {
        id: string;
        mileStone: {
            id: string
            task: {
                id: string;
                title: string;
            }[];
            title: string;
            ToDate: Date;
            FromDate: Date;
        }[];
        vision: string;
        fromDate: Date;
        toDate: Date;
        duration: number;
    }
}

export default function MilestoneEdit({
    Workflow,
}: Props) {
    const { setOpen } = useModal()
    const router = useRouter()
    const [Loading, setLoading] = useState(false)

    const deleteMilestone = async (id: string) => {
        setLoading(true)
        try{
            const result = await onDeleteMilestone(id)
            if(result) {
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

    const handleClick = (type: 'vision' | 'milestone' | 'newMilestone' , visionTitle? : string , mileStone?: {
        id: string;
        task: {
            id: string;
            title: string;
        }[];
        title: string;
        ToDate: Date;
        FromDate: Date;
    }) => {
        setOpen(
            <CustomModal title={(type === 'vision' || type === 'milestone') ? `Edit your ${type}` : 'Add new Milestone' } subheading={(type === 'vision' || type == 'milestone') ? `Edit your ${type} to get a better life` : 'Add a new Milestone to your life' }>
                <FlowForm type={type} visionTitle={visionTitle} milestone={mileStone} workflowId={Workflow.id} duration={{from: Workflow.fromDate , to: Workflow.toDate}} />
            </CustomModal>
        )
    }
    return (
        <main className="flex flex-col gap-12 p-6 md:p-8 lg:p-12 xl:p-16">
            <section className="grid gap-4">
                <div className="flex gap-5 justify-between">
                    <div className="flex flex-col justify-center items-start text-start">

                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl xl:text-5xl">Project Vision</h1>
                        <span className="text-muted-foreground text-xs md:text-base">
                            (
                            {format(Workflow.fromDate, "PPP")} -{" "}
                            {format(Workflow.toDate, "PPP")}
                            )
                        </span>
                    </div>
                    <Button size="icon" className="rounded-full p-3" onClick={() => handleClick('vision' , Workflow.vision)} disabled={Loading}>
                        <Pen className="h-4 w-4" />
                        <span className="sr-only">Edit Vision</span>
                    </Button>
                </div>

                <p className="text-sm text-foreground max-w-[800px] md:text-lg lg:text-xl">
                    {
                        Workflow.vision
                    }
                </p>
            </section>
            <section className="grid gap-6 md:gap-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">Project Milestones</h2>
                            <Button size="sm" variant="outline" onClick={() => handleClick('newMilestone')} disabled={Loading}>
                                <PlusIcon className="h-4 w-4" />
                                <span className="hidden md:flex ml-2">
                                    Add Milestone
                                </span>
                            </Button>
                </div>
                <div className="grid gap-4 md:gap-6 overflow-y-auto h-full">
                    {
                        Workflow.mileStone.map((milestone, index) => {
                            return (
                                <div className="flex w-full" key={index}>
                                    <div className="grid grid-cols-[30px_1fr] gap-4 w-full">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="h-3 w-3 rounded-full bg-gray-900 dark:bg-gray-50" />
                                            <div className="h-full w-[2px] bg-gray-200 dark:bg-gray-700" />
                                        </div>
                                        <div className="grid gap-4">
                                            <div className="flex items-start justify-between flex-col gap-4">
                                                <div className="flex w-full justify-between">
                                                    <div>

                                                        <h3 className="text-base font-semibold md:text-xl">
                                                            {milestone.title}
                                                        </h3>
                                                        <p className="text-muted-foreground text-xs md:text-base">
                                                            {format(milestone.FromDate, "PPP")} -{" "}
                                                            {format(milestone.ToDate, "PPP")}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3 md:flex-row flex-col">
                                                    <Button size="icon" className="rounded-full w-7 h-7 md:w-10 md:h-10" onClick={() => handleClick('milestone', undefined ,milestone)} disabled={Loading}>
                                                        <Pen className="h-3 w-3 md:h-4 md:w-4" />
                                                    </Button>
                                                    <Button size="icon" variant={'destructive'} className="rounded-full w-7 h-7 md:w-10 md:h-10" onClick={() => deleteMilestone(milestone.id)} disabled={Loading}>
                                                        <Trash className="h-3 w-3 md:h-4 md:w-4" />
                                                    </Button>
                                                    </div>
                                                </div>
                                                <ul className="grid gap-2 pl-4 text-gray-500 dark:text-gray-400 text-xs md:text-base">
                                                    {
                                                        milestone.task.map((task, index) => {
                                                            return (
<li className="flex items-center gap-2">
                                                        <div key={index} className="h-1 w-1 md:h-2 nd:w-2 rounded-full bg-gray-500 dark:bg-gray-400 p-[3px]" />
                                                        <span>
                                                            {
                                                                task.title
                                                            }
                                                        </span>
                                                    </li>
                                                            )
                                                    }
                                                    )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}

function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
            <line x1="18" x2="12" y1="9" y2="15" />
            <line x1="12" x2="18" y1="9" y2="15" />
        </svg>
    )
}


function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}