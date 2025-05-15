"use client";
import React, { useState, useEffect } from "react";
import Project from "@/components/project";
import {
  getRepositories,
  GithubProjectResponse,
} from "@/actions/fetch-github-repos";
import { GithubProject } from "@/types/github-project";
import { motion } from "motion/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectSectionProps {
  initialData?: GithubProjectResponse;
  projectsPerPage?: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  initialData,
  projectsPerPage = 6,
}) => {
  const [projects, setProjects] = useState<GithubProject[]>(
    initialData?.projects || []
  );
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [responseTime, setResponseTime] = useState<number>(
    initialData?.responseTime || 0
  );

  useEffect(() => {
    const loadProjects = async () => {
      if (!initialData) {
        setLoading(true);
        try {
          const response = await getRepositories();
          setProjects(response.projects);
          setResponseTime(response.responseTime);
        } catch (err) {
          console.error("Failed to fetch GitHub projects:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjects();
  }, [initialData]);

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById("projects")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          href="#"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            goToPage(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3));
    }

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              goToPage(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              goToPage(totalPages);
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  // Loading skeleton component
  const ProjectSkeleton = () => (
    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-5 border border-gray-700/50">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-700/50" />
        <Skeleton className="h-4 w-full bg-gray-700/50" />
        <Skeleton className="h-4 w-4/5 bg-gray-700/50" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-700/50" />
          <Skeleton className="h-6 w-16 rounded-full bg-gray-700/50" />
          <Skeleton className="h-6 w-16 rounded-full bg-gray-700/50" />
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <Skeleton className="h-8 w-full bg-gray-700/50" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20">
      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10 mb-8"
        >
          <div className="flex flex-col gap-2 max-w-3xl">
            <motion.h1
              className="text-3xl font-bold flex flex-row text-white gap-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              My{" "}
              <span className="bg-gradient-to-br from-primary to-secondary/50 text-transparent bg-clip-text">
                Projects
              </span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A collection of my open-source projects on GitHub.
            </motion.p>
          </div>
        </motion.div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(projectsPerPage)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectSkeleton />
              </motion.div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 bg-zinc-800/30 rounded-lg"
          >
            <p className="text-white text-xl">No projects found.</p>
            <p className="text-muted-foreground mt-2">
              Your GitHub repositories will appear here.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Project project={project} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mt-10"
              >
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          if (currentPage > 1) goToPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            goToPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* Page indicator */}
                <div className="text-center mt-6 text-sm text-muted-foreground">
                  <p>
                    Page {currentPage} of {totalPages} ({projects.length}{" "}
                    projects)
                  </p>
                  {responseTime > 0 && (
                    <p className="text-xs mt-1">
                      Loaded in {(responseTime / 1000).toFixed(2)}s
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
