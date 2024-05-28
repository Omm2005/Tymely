'use client'

import { Calendar, LucideMousePointerClick, Menu, SquareKanban, X , Home } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ModeToggle } from '../global/ModeToggle'
import { User } from 'next-auth'
import UserAvatar from '../global/useravatar'
  

type Props = {
    user?: User
}

const WorkflowNavbar = ({user}: Props) => {
    const [IsOpen , setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const params = pathname.split('/')
    const WorkflowId = params[2]
    const NavItems = [
        {
            title: 'Home',
            href:  `/workflows/`,
            navigator: 'home',
            icon: <Home size={18} className='text-muted-foreground' />
        },
        {
            title: 'Flow',
            href:  `/workflows/${WorkflowId}/flow`,
            navigator: 'flow',
            icon: <LucideMousePointerClick className={cn("text-muted-foreground" , params[3] == 'flow' && 'text-foreground')} size={18} />
        },
        {
            title: 'Calendar',
            href: `/workflows/${WorkflowId}/calendar`,
            navigator: 'calendar',
            icon: <Calendar className={cn("text-muted-foreground" , params[3] == 'calendar' && 'text-foreground')} size={18} />
        },
        {
            title: 'Board',
            href: `/workflows/${WorkflowId}/board`,
            navigator: 'board',
            icon: <SquareKanban className={cn("text-muted-foreground" , params[3] == 'board' && 'text-foreground')} size={18} />
        }
    ]
    return (
        <div>
            <div className="md:flex hidden items-center flex-col gap-6 bg-muted py-4 px-2 rounded-full h-fit overflow-scroll border-[1px]">
                <TooltipProvider>
                    {
                        NavItems.map((item, index) => (
                            <ul key={index}>

                            <div className="relative dark:bg-[#353346]/70 p-2 z-[10] rounded-full">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger>
                                        <li>
                                        <Link href={item.href} key={index} >
                                            {item.icon}
                                        </Link>
                                    </li>
                                    </TooltipTrigger>
                                    <div className="border-l-2 border-muted-foreground/50 h-7 absolute left-1/2 transform translate-x-[-50%] -bottom-[20px]" />
                                    <TooltipContent
                                        side="right"
                                        className="bg-black/10 backdrop-blur-xl"
                                        >
                                        <p>{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                    </ul>
                        ))
                    }
                </TooltipProvider>
            </div>
            <div className='flex md:hidden justify-center items-center relative'>
            <Sheet open={IsOpen}>
  <SheetTrigger onClick={() =>setIsOpen(true)}>
    <Menu className="text-foreground" size={24} />
  </SheetTrigger>
  <SheetContent className='h-full flex flex-col justify-between items-start'>
    <SheetHeader>
      <SheetTitle>Menu Bar</SheetTitle>
      <SheetDescription asChild>
        <div>
            {
                NavItems.map((item, index) => (
                        <Link href={item.href} key={index} onClick={() => setIsOpen(false)} >
                    <div className="relative p-2 z-[10 gap-2 flex">
                        <p>
                        {
                            item.icon
                        }
                    </p>
                    <p className={cn("text-muted-foreground" , params[3] == (item.navigator) && 'text-foreground')}>
                        {
                            item.title

                        }
                    </p>
                    </div>
                    </Link>
                ))
            }
        </div>
      </SheetDescription>
    </SheetHeader>
    <SheetFooter className='flex flex-row justify-between items-center w-full'>
        <ModeToggle />
        <UserAvatar user={user ? user : null} />
    </SheetFooter>

    <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" onClick={() => setIsOpen(false)}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
  </SheetContent>
</Sheet>
            </div>
        </div>
    )
}

export default WorkflowNavbar