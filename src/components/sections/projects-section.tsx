"use client";
import React, { useState, useEffect } from "react";
import Project from "@/components/project";
import {
  getRepositories,
  GithubProjectResponse,
} from "@/actions/fetch-github-repos";
import { GithubProject } from "@/types/github-project";
import { motion } from "motion/react";

// Import shadcn Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectSectionProps {
  initialData?: GithubProjectResponse;
  projectsPerPage?: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  initialData,
  projectsPerPage = 6, // Default to 3x2 grid (6 projects per page)
}) => {
  const [projects, setProjects] = useState<GithubProject[]>(
    initialData?.projects || []
  );
  const [totalProjects, setTotalProjects] = useState<number>(
    initialData?.totalProjects || 0
  );
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
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
          setTotalProjects(response.totalProjects);
          setResponseTime(response.responseTime);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch GitHub projects:", err);
          setError("Failed to load projects. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjects();
  }, [initialData]);

  // Calculate total number of pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current projects for the page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the section when changing pages
    window.scrollTo({
      top: document.getElementById("projects")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // Generate pagination items based on current page and total pages
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 4;

    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          href="#"
          onClick={(e) => {
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
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);

    if (endPage - startPage < maxVisiblePages - 2) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            href="#"
            onClick={(e) => {
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
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            href="#"
            onClick={(e) => {
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

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10 mb-6"
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

        {projects.length === 0 && !loading ? (
          <div className="text-center p-8 bg-zinc-800/30 rounded-lg">
            <p className="text-white">No projects found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <Project key={project.id} project={project} />
              ))}
            </div>

            {/* shadcn Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) goToPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            goToPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="text-center mt-4 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} ({projects.length} projects).
                Took {(responseTime / 1000).toFixed(2)}s.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
