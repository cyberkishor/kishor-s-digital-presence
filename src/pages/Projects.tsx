import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import portfolioData from '@/data/portfolio.json';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Projects"
        description="Featured projects and case studies showcasing my work in Shopify development, SaaS applications, and custom web solutions."
        url="/projects"
      />
      <Header />

      {/* Content */}
      <main className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Header */}
          <div className="mb-12">
            <p className="text-primary font-mono text-sm mb-2">// Projects</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {projects.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {projects.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.items.map((project, index) => (
              <Link
                key={index}
                to={`/projects/${project.slug}`}
                className="group p-6 rounded-xl bg-card border border-border card-shadow hover:border-primary/50 transition-all"
              >
                {/* Year, Category & Metrics */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {project.year}
                    </span>
                    {'category' in project && (project as any).category && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                        {(project as any).category}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-primary font-medium">
                    {project.metrics}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project */}
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                  View details
                  <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
