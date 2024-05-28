import WorkflowNavbar from '@/components/workflow/WorkflowNavbar'
import { ModeToggle } from '@/components/global/ModeToggle'
import UserAvatar from '@/components/global/useravatar'
import { getServerAuthSession } from '@/server/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import TymelyLogo from '@/../public/tymely-logo.png'
import { Metadata } from 'next'

const title = "Workflow | Tymely";
const description = "This is the workflow page of Tymely. Here you can create, edit, delete and manage workflows.";
const image = 'https://tymely.vercel.app/tymely-logo.jpeg'

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Tymely",
    title: "Tymely - Your AI Planner",
    description: "Save your time and plan your day with Tymely.",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://tymely.vercel.app",
    creator: "@maiommhoon",
    description: "Save your time and plan your day with Tymely",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
  },
};
const FlowLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const session = await getServerAuthSession()
  if (!session || !session.user) {
    return redirect('/')
  }
  const user = session.user
  return (
    <main className='flex flex-col md:flex-row w-screen gap-3 p-2 h-screen overflow-hidden justify-normal'>
      <div className='flex md:flex-col h-16 md:h-full w-full md:w-16 items-center justify-between z-[10] p-3 bg-background/50'>
        <div className='flex md:flex-col gap-3'>
        <Link href='/'>
          <Image src={TymelyLogo} alt='A Cute Tymely Logo' width={40} height={40} />
        </Link>
        <Link href='/workflows'>
        </Link>
        </div>
        <div className='w-auto h-auto justify-center items-center hidden md:flex'>
          <WorkflowNavbar />
        </div>
        <div className='flex md:flex-col flex-row gap-5 justify-center items-center'>
          <div className='md:flex hidden flex-col gap-5 justify-center items-center'>
          <ModeToggle />
          <UserAvatar user={user} />
          </div>
          <div className='md:hidden flex'>
          <WorkflowNavbar user={user} />
          </div>
        </div>
      </div>
        {children}
    </main>
  )
}

export default FlowLayout