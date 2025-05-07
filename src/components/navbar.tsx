"use client";

import { cn } from "@/lib/utils";
import {
  IconHome,
  IconUser,
  IconMedal,
  IconBriefcase,
  IconMail,
  IconBolt,
  TablerIcon,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import SimpleTooltip from "./simple-tooltip";

type NavbarLink = {
  name?: string | undefined;
  icon: TablerIcon;
  tooltip: string;
  href: string;
  sectionId?: string | undefined;
};

const links: NavbarLink[] = [
  { icon: IconHome, tooltip: "Back to the start of the page", href: "/" },
  { name: "About me", icon: IconUser, tooltip: "About me", href: "/#about" },
  { name: "Skills", icon: IconBolt, tooltip: "My skillset", href: "/#skills" },
  {
    name: "Experience",
    icon: IconMedal,
    tooltip: "My experience",
    href: "/#experience",
  },
  {
    name: "Projects",
    icon: IconBriefcase,
    tooltip: "My projects",
    href: "/#projects",
  },
  {
    name: "Contact",
    icon: IconMail,
    tooltip: "Contact Me",
    href: "/#contact",
  },
];

const Navbar = (): ReactElement => {
  const path: string = usePathname();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  // Set initial active section
  useEffect(() => {
    if (path === "/") {
      setActiveSection("about");
    }
  }, [path]);

  // Handle scroll and section visibility
  useEffect(() => {
    const handleScroll = () => {
      const sections = links
        .filter((link: NavbarLink) => link.sectionId)
        .map((link: NavbarLink) => document.getElementById(link.sectionId!))
        .filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the screen

      // Scroll Spy Pattern
      for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // The middle of the screen is under the start of a section and above the end of a section
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Checking if the user has scrolled in order to move the navbar
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY >= 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-3.5 inset-x-0 w-fit p-1 mx-auto flex gap-1 items-center text-sm text-white/85 bg-background/50 backdrop-blur-sm border border-border rounded-2xl duration-250 transition-all transform-gpu z-50",
        hasScrolled &&
          "top-0 right-0 rounded-t-none rounded-br-none sm:rounded-br-2xl"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Links */}
      {links.map((link: NavbarLink, index: number) => {
        const active: boolean =
          path === "/" &&
          link.sectionId !== undefined &&
          activeSection === link.sectionId;
        return (
          <SimpleTooltip key={index} content={link.tooltip} side="bottom">
            <Link
              className={cn(
                "px-[2px] sm:px-2 py-1.5",
                "text-xs flex gap-1.5 sm:text-sm items-center hover:bg-zinc-700/30 font-light rounded-2xl transition-all transform-gpu",
                active && "bg-zinc-700/30 text-primary"
              )}
              href={link.href}
              draggable={false}
            >
              <link.icon
                className={cn(
                  link.href === "/" ? "block" : "hidden sm:block",
                  "size-4"
                )}
              />

              {link.name && <span className="block">{link.name}</span>}
            </Link>
          </SimpleTooltip>
        );
      })}
    </motion.nav>
  );
};
export default Navbar;
