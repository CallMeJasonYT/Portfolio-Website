import { differenceInYears } from "date-fns";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
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
      tooltip: "Connect with me on LinkedIn",
      href: "https://www.linkedin.com/in/jasonpavlop/",
    },
    Github: {
      name: "GitHub",
      icon: IconBrandGithub,
      tooltip: "Check out my repositories",
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
      tooltip: "Download my resume",
      href: "/media/resume.pdf",
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

  skills: {
    Frontend: [
      {
        name: "React",
        icon: "https://img.icons8.com/color/2x/react-native.png",
      },
      {
        name: "Next.js",
        icon: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
      },
      {
        name: "TypeScript",
        icon: "https://img.icons8.com/fluent/2x/typescript.png",
      },
      {
        name: "Tailwind CSS",
        icon: "https://img.icons8.com/color/2x/tailwindcss.png",
      },
      {
        name: "HTML 5",
        icon: "https://img.icons8.com/color/2x/html-5.png",
      },
      {
        name: "CSS",
        icon: "https://img.icons8.com/color/2x/css3.png",
      },
      {
        name: "Javascript",
        icon: "https://img.icons8.com/color/2x/javascript.png",
      },
    ],

    Backend: [
      {
        name: "Node.js",
        icon: "https://img.icons8.com/color/2x/nodejs.png",
      },
      {
        name: "Express",
        icon: "https://img.icons8.com/?size=100&id=2ZOaTclOqD4q&format=png&color=000000",
      },
      {
        name: "Rest API",
        icon: "https://img.icons8.com/?size=100&id=50196&format=png&color=000000",
      },
      {
        name: "MongoDB",
        icon: "https://img.icons8.com/color/2x/mongo-db.png",
      },
      {
        name: "MySQL",
        icon: "https://img.icons8.com/color/2x/mysql.png",
      },
      {
        name: "PostgreSQL",
        icon: "https://img.icons8.com/?size=100&id=38561&format=png&color=000000",
      },
      {
        name: "Apache Spark",
        icon: "https://img.icons8.com/color/2x/apache-spark.png",
      },
      {
        name: "Apache Kafka",
        icon: "https://img.icons8.com/?size=100&id=fOhLNqGJsUbJ&format=png&color=000000",
      },
    ],

    "UI/UX": [
      {
        name: "Figma",
        icon: "https://img.icons8.com/color/2x/figma.png",
      },
      {
        name: "Adobe Photoshop",
        icon: "https://img.icons8.com/color/2x/adobe-photoshop.png",
      },
      {
        name: "Adobe Premiere Pro",
        icon: "https://img.icons8.com/color/2x/adobe-premiere-pro.png",
      },
      {
        name: "Adobe InDesign",
        icon: "https://img.icons8.com/color/2x/adobe-indesign.png",
      },
    ],

    Environment: [
      {
        name: "Git",
        icon: "https://img.icons8.com/color/2x/git.png",
      },
      {
        name: "Docker",
        icon: "https://img.icons8.com/color/2x/docker.png",
      },
      {
        name: "VS Code",
        icon: "https://img.icons8.com/color/2x/visual-studio-code-2019.png",
      },
      {
        name: "npm",
        icon: "https://img.icons8.com/color/2x/npm.png",
      },
      {
        name: "Linux",
        icon: "https://img.icons8.com/color/2x/linux.png",
      },
    ],
  },
  experience: {
    Career: [
      {
        institution: "",
        location: "",
        icon: "",
        role: "Looking to be hired",
        timeframe: "Available Now",
        description:
          "I'm currently seeking new opportunities in software development. Feel free to contact me with any potential roles or projects!",
      },
    ],
    Education: [
      {
        institution: "University of Patras",
        icon: "media/ceid.png",
        degree: "MSc in Computer Engineering",
        location: "Patra, Greece",
        timeframe: "Sept. 2024 - Sept. 2025",
        grade: "10/10",
      },
      {
        institution: "University of Patras",
        icon: "media/ceid.png",
        degree: "BSc in Computer Engineering",
        location: "Patra, Greece",
        timeframe: "Sept. 2020 - July 2024",
        grade: "7.84/10",
      },
    ],
  },
};
