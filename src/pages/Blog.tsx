import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import portfolioData from '@/data/portfolio.json';

export default function Blog() {
  const { blog } = portfolioData;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <main className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Header */}
          <div className="mb-12">
            <p className="text-primary font-mono text-sm mb-2">// Blog</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {blog.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {blog.subtitle}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.posts.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug}`}
                className="group p-6 rounded-xl bg-card border border-border card-shadow hover:border-primary/50 transition-all"
              >
                {/* Date & Read Time */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                  Read more
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
