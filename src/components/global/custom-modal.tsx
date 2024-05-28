import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { useModal } from "@/Provider/modal-provider"
  import React from 'react'
import { Button } from "../ui/button"
import { X } from "lucide-react"
  
  type Props = {
    title: string,
    subheading: string,
    children: React.ReactNode,
    defaultOpen?: boolean
  }
  
  const CustomModal = ({
    title,
    subheading,
    children,
    defaultOpen = false
  
  }: Props) => {
    const { isOpen, setClose, isLoading } = useModal()
    const handleClose = () => setClose()

    return (
        <Drawer
        open={isOpen}
        onClose={handleClose}
      >
        <DrawerContent>
          <DrawerHeader> 
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <div className="text-center flex flex-col items-center gap-4 h-96 overflow-scroll">
              {subheading}
              {children}
            </div>
          </DrawerHeader>
          <DrawerClose asChild>
            <div className="absolute top-5 right-5">
              <Button
                variant="ghost"
                className="w-full rounded-full p-2"
                onClick={handleClose}
                disabled={isLoading}
                >
                <X />
                  </Button>
                </div>
            </DrawerClose>
        </DrawerContent>
      </Drawer>
    )
  }
  
  export default CustomModal