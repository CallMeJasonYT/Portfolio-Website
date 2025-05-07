import { TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";

// Define social media configuration
export type SocialConfig = {
  name: string;
  icon: TablerIcon;
  tooltip: string;
  href: string;
};

// Define individual skill item
export type SkillItem = {
  name: string;
  icon: string;
};

// Define skill categories as a union type for type safety
export type SkillCategory = "Backend" | "Frontend" | "UI/UX" | "Environment";

// Create a skills configuration that groups skills by category
export type SkillsConfig = {
  [category in SkillCategory]: SkillItem[];
};

// Complete application configuration
export type AppConfig = {
  socials: Record<"Linkedin" | "Github" | "Email" | "Resume", SocialConfig>;
  about: ReactNode;
  skills: SkillsConfig;
};
