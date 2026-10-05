import { Code, Layers, ShoppingBag, Database, Cloud, Sparkles, Cpu } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Layers,
  ShoppingBag,
  Database,
  Cloud,
  Cpu,
};

export function SkillsSection() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-background">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {skills.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 text-balance">
            {skills.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      {category.items.length} Technologies
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {category.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/70 text-foreground/90 border border-border/60 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
