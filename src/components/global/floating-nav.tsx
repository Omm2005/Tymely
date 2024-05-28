"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import LoginButton from "./LoginButton";

export const FloatingNav = ({
  navItems,
  className,
  user
}: {
  navItems: {
    name: string;
    link: string
  }[];
  className?: string;
  user: boolean
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full backdrop-blur-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] md:pr-2 md:pl-8 py-2 px-3 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <div className="hidden md:flex">

        {
          user ? 
          (
            <Link
            href="/workflows"
            className="flex overflow-hidden rounded-full"
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
