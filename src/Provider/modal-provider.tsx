'use client'

import React , { createContext, useContext, useEffect, useState } from "react"

interface ModalProviderProps {
    children: React.ReactNode
}

export type ModalData = {}

type ModalContextType = {
    data: ModalData,
    isOpen: boolean,
    setOpen: (modal: React.ReactNode , fetchData?: () => Promise<any>) => void,
    setClose: () => void
    setLoading: (bool: boolean) => void
    isLoading: boolean
}

export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode , fetchData?: () => Promise<any>) => {},
    setClose: () => {},
    setLoading: (bool: boolean) => {},
    isLoading: false
})

const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [isOpen , setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<ModalData>({})
    const [showingModal, setShowingModal] = useState<React.ReactNode | null>(null)
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const setOpen = async (modal: React.ReactNode , fetchData?: () => Promise<any>) => {
        if(modal) {
            if(fetchData){
                setData({...data, ...(await fetchData())} || {})
            }
            setShowingModal(modal)
            setIsOpen(true)
        }
    }

    const setLoading = (bool: boolean) => {
        setIsLoading(bool)
    }

    const setClose = () => {
        if(!isLoading) {
            setIsOpen(false)
            setData({})
        }
    }

    if(!isMounted) {
        return null
    }

    return (
        <ModalContext.Provider value={{data, isOpen, setOpen, setClose , setLoading , isLoading}}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if(context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

export default ModalProvider