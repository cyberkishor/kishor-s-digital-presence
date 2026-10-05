import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, FolderGit2, Sparkles } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-background/50">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {projects.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 text-balance">
            {projects.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.items.map((project, index) => (
            <Link
              key={index}
              to={`/projects/${project.slug}`}
              className="group p-7 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Project Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.metrics && (
                      <span className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="w-3 h-3" />
                        {project.metrics}
                      </span>
                    )}
                  </div>
                  <span className="w-10 h-10 rounded-2xl bg-secondary/80 flex items-center justify-center text-muted-foreground group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-secondary/60 text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* See More Link / Pill CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1e1b4b] hover:bg-[#2d2868] text-white dark:bg-white dark:text-[#0f172a] dark:hover:bg-slate-100 text-sm font-semibold shadow-md shadow-indigo-950/10 transition-all group"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
