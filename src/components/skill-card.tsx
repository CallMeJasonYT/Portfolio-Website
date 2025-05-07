"use client";

import { ReactElement, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SkillItem } from "@/types/app-config";

type SkillCardProps = {
  skill: SkillItem;
  index: number;
  className?: string;
};

const SkillCard = ({
  skill,
  index,
  className,
}: SkillCardProps): ReactElement => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex flex-col items-center gap-1 p-2 bg-zinc-800/30 backdrop-blur-sm overflow-hidden",
        "border border-border rounded-lg hover:border-primary/50 hover:scale-103",
        "transition-all transform-gpu duration-300 group",
        className
      )}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(100, 244, 224, 0.2) 0%, transparent 70%)`,
          opacity: opacity,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Skill icon */}
      <div className="relative w-12 h-12 z-10">
        <Image
          src={skill.icon}
          alt={skill.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Skill name */}
      <h5 className="text-sm font-medium text-white text-center z-10">
        {skill.name}
      </h5>
    </motion.div>
  );
};

export default SkillCard;
