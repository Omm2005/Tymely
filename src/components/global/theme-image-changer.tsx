'use client'

import { useTheme } from 'next-themes'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

type Props = {
    lightModeImage: StaticImageData,
    DarkModeImage: StaticImageData
}

const ThemeImage = ({
    lightModeImage,
    DarkModeImage
}: Props) => {
    const { theme } = useTheme();
    console.log(theme)
  return (
    <>
    {
        theme === 'dark' ? (
            <Image src={DarkModeImage} alt="TymelyPreview" className="border rounded-xl" />
        ) : (
            <Image src={lightModeImage} alt="TymelyPreview" className="border rounded-xl" />
        )
    }
    </>
  )
}

export default ThemeImage