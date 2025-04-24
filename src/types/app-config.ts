import { TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";

export type SocialConfig = {
  name: string;
  icon: TablerIcon;
  tooltip: string;
  href: string;
};

export type Skill = {
  name: string;
  icon: string;
  link: string;
};

export type AppConfig = {
  socials: Record<"Linkedin" | "Github" | "Email" | "Resume", SocialConfig>;
  about: ReactNode;
};
