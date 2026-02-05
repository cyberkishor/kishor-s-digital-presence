import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
          {projects.items.map((project, index) => (
            <article
              key={index}
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
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                  <a href={project.link} aria-label={`View ${project.title}`}>
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </Button>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
