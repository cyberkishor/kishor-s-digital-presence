import { ShoppingBag, Code, Plug, Zap, Wrench, Headphones, Briefcase } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Code,
  Plug,
  Zap,
  Wrench,
  Headphones,
};

export function ServicesSection() {
  const { services } = portfolioData;

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-background">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Expertise & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {services.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 text-balance">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <div
                key={index}
                className="group p-7 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-indigo-600 transition-all">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
