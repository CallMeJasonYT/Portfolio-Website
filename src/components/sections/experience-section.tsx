"use client";

import { ReactElement, useState } from "react";
import { motion } from "motion/react";
import { appConfig } from "@/app/config";
import { ExperienceCategory as ExperienceCategoryType } from "@/types/app-config";

const ExperienceSection = (): ReactElement => {
  const experienceCategories = Object.keys(
    appConfig.experience
  ) as ExperienceCategoryType[];

  // State to track the active category
  const [activeCategory, setActiveCategory] = useState<ExperienceCategoryType>(
    experienceCategories[0]
  );

  return (
    <section id="experience" className="py-20 flex flex-col justify-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10"
        >
          {/* Section header */}
          <div className="flex flex-col gap-2 max-w-3xl">
            <motion.h1
              className="text-3xl font-bold flex flex-row text-white gap-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              My{" "}
              <span className="bg-gradient-to-br from-primary to-secondary/50 text-transparent bg-clip-text">
                Experience
              </span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A timeline of my professional journey and academic background,
              showcasing roles I've undertaken and the knowledge I've gained
              along the way.
            </motion.p>

            {/* Category buttons */}
            <motion.div
              className="flex flex-row gap-4 mt-2 flex-wrap"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {experienceCategories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-1.5 rounded-xl border-border font-semibold transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-primary/70 text-primary-foreground"
                      : "bg-secondary/20 text-muted-foreground hover:bg-secondary/30"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Experience timeline */}
          <motion.div
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeCategory === "Career" &&
            appConfig.experience[activeCategory].length === 0 ? (
              <motion.div
                className="relative pl-10 border-l-2 border-primary/30 ml-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Use a timeline dot since there's no icon */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>

                {/* Status */}
                <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  Available Now
                </span>

                {/* Position/Title */}
                <h3 className="text-xl font-bold text-white">
                  Looking to be hired
                </h3>

                {/* Description */}
                <p className="text-muted-foreground">
                  I'm currently seeking new opportunities in software
                  development. Feel free to contact me with any potential roles
                  or projects!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {appConfig.experience[activeCategory]?.map((item, index) => (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    className="relative pl-10 md:pl-14 border-l-2 border-primary/30 ml-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Icon in place of timeline dot */}
                    {item.icon ? (
                      <div className="absolute -left-[24px] top-0">
                        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-primary shadow-lg overflow-hidden">
                          <img
                            src={item.icon}
                            alt={`${item.institution} icon`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                    )}

                    <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {item.timeframe}
                    </span>

                    <h3 className="text-xl font-bold text-white">
                      {item.role || item.degree}
                    </h3>

                    <h4 className="text-lg font-medium text-primary mb-2">
                      {item.institution}
                      {item.location && (
                        <span className="text-muted-foreground text-sm ml-2">
                          • {item.location}
                        </span>
                      )}
                    </h4>

                    {item.description && (
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
