import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ChevronLeft, ChevronRight, FolderGit2, Sparkles, ArrowUpRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import portfolioData from '@/data/portfolio.json';
import EverlyBackground from '@/components/ui/EverlyBackground';

const PROJECTS_PER_PAGE = 6;

interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  metrics: string;
  year: string;
  category?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: string;
}

export default function Projects() {
  const { projects } = portfolioData;
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(projects.items as ProjectItem[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/projects-index.json')
      .then((r) => r.json())
      .then((data: ProjectItem[]) => setAllProjects(data))
      .catch(() => { /* fall back to portfolio.json items */ });
  }, []);

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return allProjects;
    const query = searchQuery.toLowerCase();
    return allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [allProjects, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Projects"
        description="Featured projects and case studies showcasing my work in Shopify development, SaaS applications, and custom web solutions."
        url="/projects"
      />
      <Header />

      {/* Content */}
      <main className="pt-28 pb-16 relative">
        <EverlyBackground />
        <div className="container-wide">
          {/* Page Header */}
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Case Studies & Work</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {projects.title}
              </h1>
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-full bg-card border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              {projects.subtitle}
            </p>
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-6">
              Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching "{searchQuery}"
            </p>
          )}

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {paginatedProjects.map((project, index) => (
              <Link
                key={index}
                to={`/projects/${project.slug}`}
                className="group p-7 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent Gradient Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Year, Category & Metrics */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        {project.year}
                      </span>
                      {'category' in project && (project as any).category && (
                        <span className="px-2.5 py-0.5 text-xs rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                          {(project as any).category}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {project.metrics}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border/60 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-secondary/60 text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project */}
                  <span className="inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    View Project Details
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your search.</p>
              <button
                onClick={() => handleSearch('')}
                className="mt-4 text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2.5 mt-12 sm:mt-14">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-full border border-border/80 hover:bg-card hover:border-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-[#1e1b4b] text-white dark:bg-white dark:text-[#0f172a] shadow-sm'
                      : 'border border-border/80 hover:bg-card hover:border-indigo-500/40 text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-full border border-border/80 hover:bg-card hover:border-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
