import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function BlogSection() {
  const { blog } = portfolioData;

  return (
    <section id="blog" className="section-padding relative overflow-hidden bg-background">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {blog.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 text-balance">
            {blog.subtitle}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {blog.posts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className="group p-7 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Date & Read Time */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-500" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Read More */}
              <div className="pt-4 border-t border-border/60">
                <span className="inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Link / Pill CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1e1b4b] hover:bg-[#2d2868] text-white dark:bg-white dark:text-[#0f172a] dark:hover:bg-slate-100 text-sm font-semibold shadow-md shadow-indigo-950/10 transition-all group"
          >
            <span>Browse All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
