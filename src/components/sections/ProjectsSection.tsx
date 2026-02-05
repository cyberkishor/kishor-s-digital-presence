import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm mb-2">// Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {projects.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {projects.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.items.slice(0, 4).map((project, index) => (
            <Link
              key={index}
              to={`/projects/${project.slug}`}
              className="group p-6 md:p-8 rounded-2xl bg-background border border-border card-shadow hover:border-primary/50 transition-all"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.metrics && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {project.metrics}
                    </span>
                  )}
                </div>
                <span className="p-2 rounded-lg bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* See More Link */}
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            See all projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
