"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ReactElement } from "react";
import { appConfig } from "@/app/config";
import SimpleTooltip from "@/components/simple-tooltip";
import { type SocialConfig } from "@/types/app-config";

const AboutSection = (): ReactElement => (
  <section
    id="about"
    className="pt-0 py-20 flex flex-col md:flex-row items-start"
  >
    {/* Right: Content */}
    <div className="flex flex-col gap-4">
      {/* Header and Socials */}
      <div className="flex flex-col gap-2.5">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I&apos;m Jason Pavlopoulos
        </motion.h1>
        <motion.p
          className="text-lg font-semibold text-muted-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Full Stack Software Engineer
        </motion.p>

        <div className="flex flex-wrap gap-2 items-center">
          {Object.values(appConfig.socials).map((social, index) => (
            <SocialLink key={social.href} social={social} index={index} />
          ))}
        </div>
      </div>

      {/* About */}
      <motion.p
        className="max-w-xl text-lg font-light text-muted-foreground"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {appConfig.about}
      </motion.p>

      {/* Skills */}
      <motion.div
        className="max-w-xl flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          staggerChildren: 0.05,
          delayChildren: 0.1,
        }}
      >
        {/* Skill chips go here */}
      </motion.div>
    </div>
  </section>
);

const SocialLink = ({
  social,
  index,
}: {
  social: SocialConfig;
  index: number;
}): ReactElement => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{
      duration: 0.5,
      delay: 0.3 + index * 0.1,
    }}
  >
    <SimpleTooltip content={social.tooltip} side="bottom">
      <Link
        className="px-2.5 py-1.5 flex gap-2 items-center text-sm text-white/90 bg-background/80 border border-border rounded-xl hover:bg-zinc-900/55 hover:text-primary transition-colors transform-gpu"
        href={social.href}
        target={social.href.startsWith("http") ? "_blank" : undefined}
        draggable={false}
      >
        <social.icon className="size-4" />
        <span>{social.name}</span>
      </Link>
    </SimpleTooltip>
  </motion.div>
);

export default AboutSection;
