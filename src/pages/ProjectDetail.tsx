import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import portfolioData from '@/data/portfolio.json';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const project = portfolioData.projects.items.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;

    fetch(`/projects/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <main className="pt-32 pb-20">
        <article className="container-wide max-w-4xl mx-auto px-4">
          {/* Back Link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.year}
              </span>
              <span className="text-primary font-medium">
                {project.metrics}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Project Content */}
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground mb-4">
                Detailed case study coming soon.
              </p>
              <Button asChild variant="outline">
                <Link to="/projects">Back to Projects</Link>
              </Button>
            </div>
          ) : (
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-img:rounded-lg prose-img:shadow-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({ src, alt }) => {
                    let imageSrc = src || '';
                    if (!imageSrc.startsWith('http')) {
                      // Handle paths like "images/file.jpg" or just "file.jpg"
                      imageSrc = imageSrc.startsWith('images/')
                        ? `/projects/${imageSrc}`
                        : `/projects/images/${imageSrc}`;
                    }
                    return (
                      <img
                        src={imageSrc}
                        alt={alt || ''}
                        className="rounded-lg shadow-lg w-full"
                        loading="lazy"
                      />
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {/* Project Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/logo.jpg"
                  alt={portfolioData.personal.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {portfolioData.personal.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {portfolioData.personal.title}
                  </p>
                </div>
              </div>
              <Button asChild>
                <a href="/#contact">
                  Discuss a similar project
                </a>
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
