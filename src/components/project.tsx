import React, { useState } from "react";
import { GithubProject } from "@/types/github-project";
import {
  IconStar,
  IconGitFork,
  IconExternalLink,
  IconPin,
} from "@tabler/icons-react";

interface ProjectProps {
  project: GithubProject;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      className={`bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-border overflow-hidden transition-all cursor-pointer relative group`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a target="_blank" draggable="false" href={project.html_url}>
        <div className="p-5 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-white truncate">
              {project.name}
            </h3>
            {project.isPinned && <IconPin size={20} className="text-primary" />}
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2 h-12">
            {project.description || "No description provided."}
          </p>

          {/* Languages badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.languages.map((lang, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs text-white/65"
                style={{ backgroundColor: `${lang.color}40` }}
              >
                <span
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: lang.color }}
                />
                {lang.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex space-x-4">
              <span className="flex items-center">
                <IconStar size={16} className="mr-1 text-yellow-400" />
                {project.stargazers_count}
              </span>

              <span className="flex items-center">
                <IconGitFork size={16} className="mr-1 text-zinc-300" />
                {project.forks}
              </span>
            </div>

            <span>Updated {formatDate(project.updated_at)}</span>
          </div>
        </div>

        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(100, 244, 224, 0.2) 0%, transparent 50%)`,
            opacity: opacity,
          }}
        />
      </a>
    </div>
  );
};

export default Project;
