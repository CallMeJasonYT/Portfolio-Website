"use client";

import { ReactElement } from "react";
import { motion } from "motion/react";
import SkillCard from "@/components/skill-card";
import { appConfig } from "@/app/config";
import { SkillCategory as SkillCategoryType } from "@/types/app-config";

const SkillsSection = (): ReactElement => {
  // Get all skill categories from config
  const skillCategories = Object.keys(appConfig.skills) as SkillCategoryType[];

  return (
    <section
      id="skills"
      className="min-h-screen py-20 flex flex-col justify-center"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12"
        >
          {/* Section header */}
          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-3xl font-bold flex flex-row text-white gap-2">
              My{" "}
              <span className="bg-gradient-to-br from-primary to-secondary/50 text-transparent bg-clip-text">
                Skills
              </span>
            </h1>
            <p className="text-muted-foreground mt-3">
              A collection of technologies and tools I've mastered throughout my
              journey. I'm constantly exploring new technologies to expand my
              skillset.
            </p>
          </div>

          {/* Skills by category */}
          <div className="flex flex-col gap-4">
            {skillCategories.map((category) => (
              <div key={category} className="flex flex-col gap-4">
                {/* Category title with decorative elements */}
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-medium text-white">{category}</h3>
                  <div className="h-px flex-grow bg-gradient-to-r from-primary/60 to-secondary/10" />
                </div>

                {/* Skills grid - responsive layout */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {appConfig.skills[category].map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
