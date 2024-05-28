'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'

type Props = {
    user : User | null
}

const UserAvatar = ({user}: Props) => {
  return (
    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.image!} />
                        <AvatarFallback>{user?.name!}</AvatarFallback>
                    </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className='flex p-3 gap-3'>
                            <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.image!} />
                        <AvatarFallback>{user?.name!}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                    <h3>
                        {user?.name!}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                        {user?.email!}
                    </p>
                    </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <div onClick={() => signOut()} className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground">
                                    Log Out
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default UserAvatar