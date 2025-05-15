import { ReactElement } from "react";
import AboutSection from "@/components/sections/about-section";
import SkillSection from "@/components/sections/skills-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import { Analytics } from "@vercel/analytics/next";

export const dynamic = "force-dynamic";

const LandingPage = (): ReactElement => (
  <main className="min-h-screen flex">
    {/* Content - adjusted padding for sidebar */}
    <div className="relative w-full px-7 md:px-10 xl:px-16 pt-32 flex flex-col transition-all transform-gpu overflow-hidden">
      <Analytics />
      <AboutSection />
      <SkillSection />
      <ExperienceSection />
      <ProjectsSection />
    </div>
  </main>
);

export default LandingPage;
