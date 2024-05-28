import "@/styles/globals.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/Provider/theme-provider";
import ModalProvider from "@/Provider/modal-provider";
import ToastProvider from "@/Provider/toast-provider";
import { Analytics } from "@vercel/analytics/react"

const font = DM_Sans({ subsets: ["latin"] });
const title = "Tymely";
const description = "It's Time to not waste it.An AI poweered time management tool. Tymely helps you to manage your time effectively which can convert your vision into actionable tasks.";
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
        <Analytics />
            </ModalProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
