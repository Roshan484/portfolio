import "@/styles/globals.css";

import { type Metadata } from "next";
import { Oxanium } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Roshan Aryal",
  description: "Roshan Aryal's personal website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oxanium.className} ${oxanium.variable} dark bg-black`}>
      <body>
        <TRPCReactProvider>{children}
          <Toaster
            position="top-right"
            richColors
            className="dark"
          />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
