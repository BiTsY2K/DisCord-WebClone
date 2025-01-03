import type { Metadata } from "next";
import localFont from "next/font/local";
import googleFont, { Noto_Sans } from "next/font/google";
import "./globals.css";

import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { SocketProvider } from "@/providers/SocketIOProvider";
import { QueryProvider } from "@/providers/QueryProvider";

const notoSans = Noto_Sans({
  display: "swap",
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ['latin', 'latin-ext'],
})

const ggSans = localFont({
  display: "swap",
  variable: "--font-gg-sans",
  src: [
    { path: './fonts/GG/GGSans-Regular.woff', weight: '400', },
    { path: './fonts/GG/GGSans-Medium.woff', weight: '500', },
    { path: './fonts/GG/GGSans-Semibold.woff', weight: '600', },
    { path: './fonts/GG/GGSans-Bold.woff', weight: '700', },
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${ggSans.variable} ${notoSans.variable} font-primary antialiased bg-white dark:bg-[#313338]`}
        >
          <ClerkLoading>
            <div className="flex justify-center items-center h-dvh">Loading...</div>
          </ClerkLoading>
          <ClerkLoaded>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <EdgeStoreProvider>
                <SocketProvider>
                  <ModalProvider />
                  <QueryProvider>{children}</QueryProvider>
                </SocketProvider>
              </EdgeStoreProvider>
            </ThemeProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
