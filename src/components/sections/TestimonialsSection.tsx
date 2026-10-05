import { Quote, Star, MessageSquareQuote } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function TestimonialsSection() {
  const { testimonials } = portfolioData;

  return (
    <section className="section-padding relative overflow-hidden bg-background/50">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Social Proof & Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {testimonials.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 text-balance">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Row: 5 Stars & Subtle Quote Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-indigo-500/20" />
              </div>

              {/* Quote Body */}
              <p className="text-foreground/90 text-sm sm:text-base mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm leading-tight">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
