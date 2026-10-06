import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Layers,
  Cpu,
  Cloud,
  BadgeCheck,
  Code2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio.json';
import { siteSettings } from '@/lib/siteSettings';

export function UpworkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.561 5.025c-2.539 0-4.51 1.647-5.31 4.362c-1.22-1.832-2.148-4.032-2.687-5.886H7.828v7.105c-.002 1.404-1.141 2.543-2.547 2.545c-1.406-.002-2.543-1.142-2.545-2.545V3.5H0v7.105c0 2.911 2.371 5.298 5.282 5.298c2.913 0 5.283-2.387 5.283-5.298V9.416c.529 1.106 1.182 2.228 1.974 3.219L10.865 20.5h2.797l1.213-5.705c1.063.679 2.285 1.109 3.686 1.109c3 0 5.439-2.45 5.439-5.445C24 7.461 21.561 5.025 18.561 5.025zm0 8.132c-1.102 0-2.135-.467-3.074-1.227l.228-1.074l.008-.042c.207-1.143.849-3.058 2.839-3.058c1.492 0 2.703 1.211 2.703 2.7c0 1.488-1.211 2.7-2.705 2.7z" />
    </svg>
  );
}

// Brand & Ecosystem Logos (Like Spotify, Notion, Figma, Slack, Dropbox in mockup)
const TECH_ECOSYSTEM = [
  { 
    name: 'Upwork Top Rated (100% JSS)', 
    category: 'Verified Talent',
    href: 'https://www.upwork.com/freelancers/~01aaecbeaf4deac42e' 
  },
  { name: 'Shopify Plus', category: 'E-commerce' },
  { name: 'React / Next.js', category: 'Frontend' },
  { name: 'Django / Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS & Cloud', category: 'Infrastructure' },
  { name: 'Stripe Payments', category: 'Fintech' },
];

const SPECIALTY_TILES = [
  {
    id: 'shopify',
    icon: ShoppingBag,
    label: 'Shopify',
    sub: 'Apps & Stores',
    href: '#projects',
  },
  {
    id: 'saas',
    icon: Layers,
    label: 'SaaS Dev',
    sub: 'Full-Stack Apps',
    href: '#projects',
  },
  {
    id: 'architecture',
    icon: Cpu,
    label: 'Architecture',
    sub: 'System Design',
    href: '#services',
  },
  {
    id: 'cloud',
    icon: Cloud,
    label: 'APIs & Cloud',
    sub: 'AWS & Scaling',
    href: '#skills',
  },
];

export function ModernHeroSection() {
  const { hero, projects } = portfolioData;
  const featuredProjects = projects.items.slice(0, 3);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide projects every 6 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveProjectIdx((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, featuredProjects.length]);

  const activeProject = featuredProjects[activeProjectIdx] || featuredProjects[0];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 bg-background isolate">
      
      {/* Main Container */}
      <div className="container-wide w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Typography & Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 lg:pr-6"
          >
            {/* Top Status Badge (Royal Electric Indigo & Emerald pulse) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-foreground backdrop-blur-sm shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">15+ Years Experience</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-foreground/80 dark:text-muted-foreground hidden sm:inline font-medium">Senior Full-Stack & SaaS Engineer</span>
              <span className="text-foreground/80 dark:text-muted-foreground sm:hidden font-medium">Full-Stack Engineer</span>
            </motion.div>

            {/* Main Headline (Editorial Serif with Royal Electric Indigo) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
                <span>I build software that </span>
                <br />
                <span className="font-serif italic text-indigo-600 dark:text-indigo-400 underline decoration-indigo-500/40 underline-offset-8">
                  actually works.
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed text-balance">
              Senior Full-Stack Developer specializing in <strong>Shopify</strong>, <strong>SaaS</strong>, and high-performance custom web applications. Delivering reliable software clients trust across 15+ countries.
            </p>

            {/* Review Avatars & Rating Row (Arranged neatly above Upwork card) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover shadow-sm" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                  alt="Omar E. - Design Platform" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover shadow-sm" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                  alt="Paul K. - eCommerce" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover shadow-sm" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
                  alt="Blake S. - Director" 
                />
              </div>

              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                Trusted by <strong className="text-foreground font-semibold">50+ clients</strong> around the world
              </span>

              <span className="text-border hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-bold text-foreground">4.9 / 5.0</span>
              </div>
            </div>

            {/* Upwork Top Rated & 100% Job Success Verified Card (From User Screenshot) */}
            <motion.a
              href="https://www.upwork.com/freelancers/~01aaecbeaf4deac42e"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-3.5 sm:px-4 sm:py-3 rounded-2xl bg-card/90 border border-border/80 shadow-md backdrop-blur-md hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all group/upwork cursor-pointer block text-left"
            >
              {/* Upwork Icon & 100% JSS */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-inner group-hover/upwork:scale-105 transition-transform">
                    <UpworkIcon className="w-5 h-5 fill-blue-500" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-card flex items-center justify-center" title="Active available talent">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground tracking-tight group-hover/upwork:text-blue-500 transition-colors">100% Job Success</span>
                    <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/20 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/90">Upwork Top Rated</span>
                    <span>•</span>
                    <span className="text-amber-700 dark:text-amber-400 flex items-center gap-0.5 font-semibold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 5.0
                    </span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover/upwork:text-blue-500 transition-colors ml-0.5 opacity-60 group-hover/upwork:opacity-100" />
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-8 bg-border/80 mx-1" />

              {/* Upwork Verified Stats: $40K+ • 45 Jobs • 1,267 Hours */}
              <div className="flex items-center gap-4 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                <div>
                  <span className="font-bold text-foreground text-sm block leading-none">45</span>
                  <span className="text-[10px] text-muted-foreground">Total Jobs</span>
                </div>
                <div className="w-px h-6 bg-border/60" />
                <div>
                  <span className="font-bold text-foreground text-sm block leading-none">1,267</span>
                  <span className="text-[10px] text-muted-foreground">Hours Logged</span>
                </div>
                <div className="w-px h-6 bg-border/60" />
                <div>
                  <span className="font-bold text-foreground text-sm block leading-none">$40K+</span>
                  <span className="text-[10px] text-muted-foreground">Earned</span>
                </div>
              </div>
            </motion.a>

            {/* Action Buttons (Everly Deep Navy pill style with subtle hover elevation) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button 
                size="lg" 
                asChild
                className="rounded-full px-7 h-12 text-sm font-semibold shadow-lg shadow-indigo-950/20 hover:shadow-indigo-950/30 transition-all bg-[#1e1b4b] hover:bg-[#2d2868] text-white dark:bg-white dark:text-[#0f172a] dark:hover:bg-slate-100"
              >
                <a href="#contact" className="inline-flex items-center gap-2">
                  <span>Work With Me</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="rounded-full px-6 h-12 text-sm font-medium border-border/80 hover:bg-secondary/60 transition-all"
              >
                <a href="#projects" className="inline-flex items-center gap-2">
                  <span>View Projects</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Floating Card Showcase (Like Everly Mockup) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Team working doodle & 3 avatar faces above the card */}
            <div className="flex items-center justify-end gap-3 mb-4 pr-3">
              <div className="flex items-center -space-x-2">
                <div className="relative">
                  <img 
                    src={siteSettings.logo} 
                    alt="Kishor" 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-background shadow-sm"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-background" />
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                  alt="Team member" 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-background shadow-sm"
                />
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                  alt="Team member" 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-background shadow-sm"
                />
              </div>

              {/* Hand-drawn arrow & "Team working" script */}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg 
                  className="w-7 h-5 text-indigo-600/80 dark:text-indigo-400/80 transform -rotate-12" 
                  viewBox="0 0 48 32" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M42 14 C 28 10, 14 16, 6 24" />
                  <path d="M13 24 L 6 24 L 8 17" />
                </svg>
                <div className="relative">
                  <span className="font-serif italic text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium tracking-wide">
                    Team working
                  </span>
                </div>
              </div>
            </div>

            {/* Main Featured Showcase Card */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative rounded-3xl bg-card border border-border/80 shadow-2xl p-6 sm:p-7 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-indigo-500/40 group"
            >
              
              {/* Top Accent Gradient Bar (Royal Indigo to Violet) */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-400" />

              {/* Card Header: Project Switcher Tabs & Status */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-border/60">
                <button 
                  onClick={() => setActiveProjectIdx((prev) => (prev + 1) % featuredProjects.length)}
                  className="flex items-center gap-2 group/title text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                      Featured Project
                    </span>
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400 transition-colors">
                        {activeProject.title.split('–')[0].trim()}
                      </h3>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover/title:translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </button>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Production</span>
                </div>
              </div>

              {/* Dynamic Project Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug || activeProject.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {activeProject.description}
                  </p>

                  {/* Project Metric / Highlights */}
                  {activeProject.metrics && (
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground bg-secondary/50 px-3 py-2 rounded-xl border border-border/50">
                      <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{activeProject.metrics}</span>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-background border border-border text-[11px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    {/* Project Switcher Dots with Animated Progress Bar */}
                    <div className="flex items-center gap-1.5">
                      {featuredProjects.map((p, idx) => (
                        <button
                          key={p.title}
                          onClick={() => {
                            setActiveProjectIdx(idx);
                            setIsPaused(true);
                            setTimeout(() => setIsPaused(false), 7000);
                          }}
                          aria-label={`View ${p.title}`}
                          className={`relative h-2 rounded-full overflow-hidden transition-all ${
                            idx === activeProjectIdx 
                              ? 'w-7 bg-[#1e1b4b] dark:bg-white' 
                              : 'w-2 bg-muted hover:bg-muted-foreground/40'
                          }`}
                        >
                          {idx === activeProjectIdx && !isPaused && (
                            <motion.span
                              key={`progress-${activeProjectIdx}`}
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 6, ease: 'linear' }}
                              className="absolute inset-0 bg-white/40 dark:bg-black/30 rounded-full"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Action Button (Everly Deep Navy pill style) */}
                    <Button 
                      size="sm" 
                      asChild
                      className="rounded-full px-5 h-9 text-xs font-semibold bg-[#1e1b4b] hover:bg-[#2d2868] text-white dark:bg-white dark:text-[#0f172a] dark:hover:bg-slate-100 shadow-sm transition-all group/btn"
                    >
                      <a 
                        href={activeProject.liveUrl || `/project/${activeProject.slug}`} 
                        target={activeProject.liveUrl ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4 Floating Specialty Tiles (Tasks, Chat, Calendar, Files style from mockup) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4">
              {SPECIALTY_TILES.map((tile) => {
                const Icon = tile.icon;
                return (
                  <a
                    key={tile.id}
                    href={tile.href}
                    className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-card/80 border border-border/70 shadow-sm backdrop-blur-sm hover:border-indigo-500/40 hover:bg-card hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {tile.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {tile.sub}
                    </span>
                  </a>
                );
              })}
            </div>

          </motion.div>
        </div>
      </div>

      {/* BOTTOM LOGOS STRIP: Social Proof & Trusted Tech Ecosystem */}
      <div className="container-wide mt-12 sm:mt-16 pt-8 border-t border-border/50">
        <p className="text-center text-[11px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground/80 mb-6">
          Core Technologies & Platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16 opacity-75 hover:opacity-100 transition-opacity">
          {TECH_ECOSYSTEM.map((tech) => {
            const content = (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                  {tech.name}
                </span>
                {tech.href && (
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors opacity-70" />
                )}
              </>
            );

            if (tech.href) {
              return (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
                >
                  {content}
                </a>
              );
            }

            return (
              <div 
                key={tech.name} 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-default"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
