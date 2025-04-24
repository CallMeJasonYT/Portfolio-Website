import { differenceInYears } from "date-fns";
import {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileCv,
} from "@tabler/icons-react";
import { AppConfig } from "@/types/app-config";

const age = differenceInYears(new Date(), new Date("2002-08-09"));
const experience = differenceInYears(new Date(), new Date("2020-11-10"));

export const appConfig: AppConfig = {
  socials: {
    Linkedin: {
      name: "LinkedIn",
      icon: IconBrandLinkedin,
      tooltip: "Find me on LinkedIn",
      href: "https://www.linkedin.com/in/jasonpavlop/",
    },
    Github: {
      name: "GitHub",
      icon: IconBrandGithub,
      tooltip: "Check my GitHub",
      href: "https://github.com/CallMeJasonYT",
    },
    Email: {
      name: "Email",
      icon: IconMail,
      tooltip: "Send me an email",
      href: "mailto:jasonpavlop1@gmail.com",
    },
    Resume: {
      name: "Resume",
      icon: IconFileCv,
      tooltip: "Download my CV",
      href: "", // To be completed
    },
  },
  about: (
    <span>
      A <b className="text-primary/90">{age} year old</b> web developer and
      master’s student at CEID in Greece. I craft user-focused, interactive web
      solutions with clean design, backed by{" "}
      <b className="text-primary/90">{experience} years</b> of coding
      experience. I’m driven to solve real-world problems and contribute to
      meaningful projects.
    </span>
  ),
};
