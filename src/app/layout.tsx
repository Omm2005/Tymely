import "@/styles/globals.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/Provider/theme-provider";
import ModalProvider from "@/Provider/modal-provider";
import ToastProvider from "@/Provider/toast-provider";
import TymelyLogo from '@/../public/Tymelylogo.png'
import TymelyLogoIco from '@/../public/favicon.ico'

const font = DM_Sans({ subsets: ["latin"] });
const title = "Tymely";
const description = "It's Time to not waste it.An AI poweered time management tool. Tymely helps you to manage your time effectively which can convert your vision into actionable tasks.";
const image = TymelyLogo.src

export const metadata: Metadata = {
  title,
  description,
  icons: [TymelyLogoIco.src],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@maiommhoon",
  },
  metadataBase: new URL("https://tymely.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>
              <ToastProvider />
        {children}
            </ModalProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
