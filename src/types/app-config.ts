import { TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";

export type SocialConfig = {
  name: string;
  icon: TablerIcon;
  tooltip: string;
  href: string;
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillCategory = "Backend" | "Frontend" | "UI/UX" | "Environment";

export type SkillsConfig = {
  [category in SkillCategory]: SkillItem[];
};

export type ExperienceItem = {
  institution: string;
  icon: string;
  role?: string;
  degree?: string;
  location: string;
  timeframe: string;
  description?: string;
};

export type ExperienceCategory = "Career" | "Education";

export type ExperienceConfig = {
  [category in ExperienceCategory]: ExperienceItem[];
};

export type AppConfig = {
  socials: Record<"Linkedin" | "Github" | "Email" | "Resume", SocialConfig>;
  about: ReactNode;
  skills: SkillsConfig;
  experience: ExperienceConfig;
};
