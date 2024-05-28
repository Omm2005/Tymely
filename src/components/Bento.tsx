'use client'

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  CirclePlus,
  KanbanSquare,
  LayoutTemplate,
  SquareGanttChart,
} from "lucide-react";
import Image from "next/image";
import TymelyPreview from "@/../public/TymelyPreview.jpeg";
import TymelyPreviewLight from "@/../public/TymelyPreviewLight.jpeg";
import TymelyWorkflow from "@/../public/TymelyWorkflow.jpeg";
import TymelyWorkflowLight from "@/../public/TymelyWorkflowLight.jpeg";
import TymelyManage from '@/../public/TymelyManage.jpeg'
import TymelyManageLight from '@/../public/TymelyManageLight.jpeg'
import TymelyTimeBlocker from '@/../public/TymelyTimeBlocker.png'
import TymelyTimeBlockerLight from '@/../public/TymelyTimeBlockerLight.png'
import { useTheme } from "next-themes";

export function BentoGridSecondDemo() {
  const {theme} = useTheme();
  const items = [
    {
      title: "Your AI planner",
      description: "Plan your ideas with AI within seconds.",
      header: <Image src={theme === 'dark' ? TymelyWorkflow : TymelyWorkflowLight} alt="TymelyPreview" className="z-0 overflow-hidden object-cover top-10 relative opacity-60 group-hover/bento:scale-105 transition-all" />,
      className: "md:col-span-2",
      icon: <CirclePlus className="h-4 w-4 text-neutral-500" />,
      commingSoon: false,
    },
    {
      title: "Easy to edit user interface",
      description: "Easily edit your project and plan.",
      header:  <Image src={theme === 'dark' ? TymelyPreview : TymelyPreviewLight} alt="TymelyPreview" className="z-0 overflow-hidden object-cover top-10 relative opacity-60 group-hover/bento:scale-105 transition-all" />,
      className: "md:col-span-1",
      icon: <LayoutTemplate className="h-4 w-4 text-neutral-500" />,
      commingSoon: false,
    },
    {
      title: "Manage your tasks",
      description: "Manage your tasks and work on them with ease.",
      header: <Image src={theme === 'dark' ? TymelyManage : TymelyManageLight} alt="TymelyPreview" className="z-0 overflow-hidden object-cover top-10 relative opacity-60 group-hover/bento:scale-105 transition-all" />,
      className: "md:col-span-1",
      icon: <SquareGanttChart className="h-4 w-4 text-neutral-500" />,
      commingSoon: false,
    },
    {
      title: "Organize your life.",
      description:
      "Organize your life and plan your weeks.",
      header: <Image src={theme === 'dark' ? TymelyTimeBlocker : TymelyTimeBlockerLight} alt="TymelyPreview" className="z-0 overflow-hidden object-cover opacity-60 group-hover/bento:scale-105 transition-all h-32 md:h-auto brightness-75 rounded-lg" />,
      className: "md:col-span-2",
      icon: <KanbanSquare className="h-4 w-4 text-neutral-500" />,
      commingSoon: true,
    },
  ];
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          comingSoon={item.commingSoon}
        />
      ))}
    </BentoGrid>
  );
}