import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import BackgroundPattern from "@/components/bg-pattern";
import VignetteBackground from "@/components/vignette-bg";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jason Pavlopoulos – Computer Engineer",
  description:
    "Hello! My name is Jason Pavlopoulos, and I am a Master's graduate in Computer Engineering. I specialize in software development, especially in Web Development.",
};

export const viewport: Viewport = { themeColor: "#64F4E0" };

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "antialiased scroll-smooth select-none",
        montserrat.className
      )}
    >
      <div className="relative min-h-screen">
        {/* Backgrounds */}
        <VignetteBackground />
        <BackgroundPattern />
        <Navbar />

        {/* Sidebar - only visible on md and up screens */}
        <Sidebar profileImage="/media/me.jpg" name="Jason Pavlopoulos" />

        {/* Main Content - responsive margin based on screen size */}
        <div className="lg:ml-64 mx-auto max-w-screen-3xl relative transition-all duration-300">
          {children}
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
