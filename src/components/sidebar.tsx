"use client";

import { ReactElement } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

type SidebarProps = {
  profileImage: string;
  name: string;
};

const Sidebar = ({ profileImage, name }: SidebarProps): ReactElement => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        // Hide on small screens, show on md and above
        "hidden lg:flex",
        "fixed left-0 top-0 h-screen bg-zinc-900/30 backdrop-blur-md border-r border-border",
        "flex-col items-center pt-32 pb-8 px-6",
        "w-60 shadow-xl z-40"
      )}
    >
      {/* Profile image */}
      <div className="relative w-35 h-35 mb-6 rounded-full overflow-hidden border-2 border-primary/50">
        <Image
          src={profileImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Name */}
      <div className="flex">
        <Image
          src="/media/wave.gif"
          alt="Waving Hand"
          width={28}
          height={28}
          draggable={false}
        />
        <span className="text-xl text-white font-semibold">
          Hi, I&apos;m Jason!
        </span>
      </div>

      {/* Additional sidebar content */}
    </motion.div>
  );
};

export default Sidebar;
