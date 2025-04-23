import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import BackgroundPattern from "@/components/bg-pattern";
import VignetteBackground from "@/components/vignette-bg";

const roboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jason Pavlopoulos – Computer Engineer",
  description:
    "Hello! My name is Jason Pavlopoulos, and I am a Master’s graduate in Computer Engineering. I specialize in software development, especially in Web Development.",
};

export const viewport: Viewport = { themeColor: "#64F4E0" };

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn("antialiased scroll-smooth select-none", roboto.className)}
    >
      <div className="relative min-h-screen">
        {/* Backgrounds */}
        <VignetteBackground />
        <BackgroundPattern />
        <div className="mx-auto max-w-screen-3xl relative">{children}</div>
      </div>
    </body>
  </html>
);

export default RootLayout;
