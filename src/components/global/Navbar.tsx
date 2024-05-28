import Link from 'next/link'
import React from 'react'
import { User } from 'next-auth';
import LoginButton from './LoginButton';
import TymelyLogo from '@/../public/tymely-logo.png'
import Image from 'next/image';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import { ChevronRight, Home, User as UserIcon } from 'lucide-react';
import { FloatingNav } from './floating-nav';

type Props = {
  user: User | null | undefined;
}

export default async function Navbar({user}: Props) {
  const navItems = [
    {
      name: "About",
      link: "#About",
    },
    {
      name: "Features",
      link: "#Features",
    },
    {
      name: "Connect",
      link: "#Connect",
    },
  ];
  return (
    <>
    <FloatingNav user={user ? true : false} navItems={navItems} />
    <header className='py-2 px-4 w-full bg-background/10 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between'>
        <aside className='flex items-center gap-[2px]'>
        <Image src={TymelyLogo} alt='A Cute Tymely Logo' width={30} height={30} />

            <p className='text-xl font-bold text-foreground'>
                Tymely
            </p>
        </aside>
        <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          {
            navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  {item.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <div className="z-10 flex min-h-fit items-center justify-center">
    </div>
      <aside className="flex items-center gap-4">
          {
            user ? 
            (
              <Link
              href="/workflows"
              className="flex overflow-hidden rounded-full bg-background"
              >
            <AnimatedGradientText>
            <span
          className={cn(
            ` animate-gradient flex bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
          >
                  🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "} WorkFlow
            </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
          </Link>
          ) : <LoginButton />
        }
      </aside>
    </header>
        </>
  )
}