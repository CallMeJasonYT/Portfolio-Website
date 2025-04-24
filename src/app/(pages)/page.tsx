import { Metadata } from "next";
import { ReactElement } from "react";
import AboutSection from "@/components/sections/about-section";

export const dynamic = "force-dynamic";

const LandingPage = (): ReactElement => (
  <main className="min-h-screen flex">
    {/* Content */}
    <div className="relative w-full px-7 lg:px-10 xl:px-16 pt-40 lg:pt-32 flex flex-col transition-all transform-gpu overflow-hidden">
      <AboutSection />
    </div>
  </main>
);
export default LandingPage;
