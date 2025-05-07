import { ReactElement } from "react";
import AboutSection from "@/components/sections/about-section";
import SkillSection from "@/components/sections/skills-section";

export const dynamic = "force-dynamic";

const LandingPage = (): ReactElement => (
  <main className="min-h-screen flex">
    {/* Content - adjusted padding for sidebar */}
    <div className="relative w-full px-7 md:px-10 xl:px-16 pt-32 flex flex-col transition-all transform-gpu overflow-hidden">
      <AboutSection />
      <SkillSection />
    </div>
  </main>
);

export default LandingPage;
