'use client'

import React from 'react'
import { Button } from '../ui/button'
import { MoveLeft, MoveRight } from 'lucide-react'
import { Progress } from '../ui/progress';
import { differenceInDays, format, isSameDay, isWithinInterval } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';
import { onTaskChecked } from '@/server/actions';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
    milestones: {
      title: string;
      ToDate: Date;
      FromDate: Date;
      isCompleted: boolean;
      task: {
        id: string;
        title: string;
        isCompleted: 'Pending' | 'Completed' | 'InProgress';
      }[];
    }[],
  };

const CalendarComponent = ({
    milestones,
} : Props) => {
    const [counter , setCounter] = React.useState(0)
    const [progress, setProgress] = React.useState(0)
    const CompletedTasks = milestones[counter]?.task.filter(task => task.isCompleted === 'Completed').length
    const router = useRouter()

    React.useEffect(() => {
    let setProgressNumber = (CompletedTasks!/milestones[counter]?.task.length!)*100
       
    let timer = setTimeout(() => setProgress(setProgressNumber), 500)
    return () => clearTimeout(timer)
    }, [CompletedTasks])

    const handleTaskChange = async (id: string, checked: "InProgress" | "Completed" | "Pending") => {
        try{
            const taskStatus = await onTaskChecked(id, checked)
            if(taskStatus) {
                toast.success(`Task status changed Successfully!` , {
                    description: 'Please refresh the page to see the changes',
                })
                router.refresh()
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    const handleAddOne = () => {
        setCounter(counter + 1);
    }
    const handleSubOne = () => {
        setCounter(counter - 1);
    }

  return (
    <div className='flex flex-col gap-10 justify-normal items-center overflow-auto'>
    <div className='flex justify-between items-center w-full'>
        <Button variant={'ghost'} className='flex gap-2' onClick={handleSubOne} disabled={counter <= 0} >
          <MoveLeft size={18} />
        </Button>
        <Button variant={'ghost'} className='flex gap-2' onClick={handleAddOne} disabled={counter >= milestones.length - 1} >
          <MoveRight size={18} />
        </Button>
      </div>
      <div className='flex md:gap-24 gap-5 flex-col justify-center items-start w-full md:px-24 px-5 py-10'>
        <div className='flex gap-10 w-full flex-col'>
            <div className='flex justify-between w-full flex-col '>
        <h3 className='md:text-2xl text-xl font-bold flex flex-col'>
            Milestone: 
        <span className='md:text-xl text-lg font-light'>
        {
            milestones[counter]?.title
        }
        </span>
        </h3>
        <p className='font-light text-foreground/80 text-sm'>
            Due Date: 
            <span className='ml-2'>
            {milestones[counter]?.ToDate && format(milestones[counter]?.ToDate, "PPP")}
            </span>
        </p>
        </div>
        <div className='flex md:hidden gap-3 text-base border-2 rounded-lg w-fit p-2 justify-center items-center text-center'>
            <p className='font-semibold'>
                Tasks: 
            </p>
            <p>
                {(CompletedTasks!/milestones[counter]?.task.length!)*100}%
            </p>
        </div>
        <div className='flex-col gap-2 md:flex hidden'>

        <Progress value={progress} className="w-full h-2" />
            </div>
        </div>
        <div>
        <h3 className='md:text-2xl text-xl font-bold'>
            Tasks:
        </h3>
        <ul>
            {
                milestones[counter]?.task.map((task, index) => (
                    <li key={index} className='md:text-lg font-light text-sm'>
                        <Checkbox id={task.id} checked={task.isCompleted === "Completed"} onCheckedChange={() => handleTaskChange(task.id, ((task.isCompleted === "Completed") ? "Pending" : "Completed"))} className='rounded-full' />
                        <label htmlFor={task.id} className={cn('ml-2', task.isCompleted === 'Completed' && 'line-through')}>
                            {task.title}
                        </label>
                    </li>
                ))
            }
        </ul>
        </div>
      </div>
    </div>
  )
}

export default CalendarComponent