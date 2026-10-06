import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Layers, 
  Users2, 
  Globe2, 
  Search, 
  FileSpreadsheet, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Headphones,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

const STAT_ICONS = [
  { icon: Clock, label: 'Years Experience', hint: 'Since 2009' },
  { icon: Layers, label: 'Projects Delivered', hint: 'Shopify, SaaS & Web' },
  { icon: Users2, label: 'Happy Clients', hint: 'Global repeat founders' },
  { icon: Globe2, label: 'Countries Served', hint: 'US, UK, EU, AU & Asia' }
];

const PROCESS_ICONS = [
  Search,           // 01. Feasibility Study
  FileSpreadsheet,  // 02. Planning
  Code2,            // 03. Development
  ShieldCheck,      // 04. Testing & QA
  Rocket,           // 05. Deployment
  Headphones        // 06. Support
];

export function AboutSection() {
  const { about, workProcess, personal } = portfolioData;

  return (
    <section id="about" className="relative section-padding overflow-hidden bg-background/50 isolate">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="container-wide relative z-10">
        
        {/* TOP NARRATIVE & BENTO STATS */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative & Positioning */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About & Philosophy</span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              <span>Engineering software with a </span>
              <span className="font-serif italic font-normal text-indigo-600 dark:text-indigo-400 underline decoration-indigo-400/40 underline-offset-8">
                product builder's
              </span>
              <span> mindset.</span>
            </h2>

            {/* Paragraphs with enhanced readability */}
            <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed pt-2">
              <p>
                I've been building web applications for over <strong>15 years</strong>. Based in {personal.location}, I partner with startups, product founders, and enterprise teams across 15+ countries—primarily delivering high-converting <strong>Shopify custom architectures</strong>, scalable <strong>Python/Django SaaS platforms</strong>, and robust full-stack web applications.
              </p>
              <p>
                I believe code is simply the medium: what truly matters is deeply understanding business objectives before writing the first line of code. Direct, transparent communication upfront eliminates costly rewrites and guarantees software that thrives in production.
              </p>
            </div>

            {/* Key Value Proposition Callout Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-indigo-600 dark:bg-indigo-400" />
              <div className="flex items-start gap-3.5 pl-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Direct Founder-to-Engineer Collaboration
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    Most of my clients are long-term repeat partners. Zero agency layers, zero communication drift—just senior-level engineering execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metadata Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Kathmandu, Nepal (UTC+5:45)</span>
              </div>
              <span>•</span>
              <div className="inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Available for Global Remote Roles</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: High-Impact Bento Metric Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
          >
            {about.stats.map((stat, index) => {
              const meta = STAT_ICONS[index] || STAT_ICONS[0];
              const Icon = meta.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle corner glow */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      {meta.hint}
                    </span>
                  </div>

                  <div>
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {stat.value}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground/90 mt-1">
                      {stat.label}
                    </h3>
                  </div>
                </motion.div>
              );
            })}

            {/* Bento Span Card: Upwork Verified Credentials banner */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="sm:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-card via-card to-indigo-500/5 border border-indigo-500/20 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider block">
                  Verified Freelance Credibility
                </span>
                <h4 className="text-base font-bold text-foreground">
                  Upwork Top Rated • 100% Job Success Score
                </h4>
                <p className="text-xs text-muted-foreground">
                  Over $40,000+ earned across 1,267 logged hours with a flawless 5.0 client feedback record.
                </p>
              </div>

              <a 
                href={personal.social.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-all shrink-0 self-start sm:self-center shadow-xs"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </motion.div>

        </div>

        {/* WORK PROCESS ROADMAP (My Way of Working) */}
        <div className="mt-14 sm:mt-18">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Methodology</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {workProcess.title}
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg mt-2 text-balance">
              {workProcess.subtitle}
            </p>
          </div>

          {/* Connected Process Flow Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {workProcess.steps.map((step, index) => {
              const StepIcon = PROCESS_ICONS[index] || Code2;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle Step Number Background Watermark */}
                  <span aria-hidden="true" className="absolute -bottom-4 -right-2 text-7xl font-bold font-mono text-muted/30 dark:text-muted/10 select-none pointer-events-none group-hover:text-indigo-500/10 transition-colors">
                    {step.number}
                  </span>

                  <div>
                    {/* Top Row: Icon & Step Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/80 text-[11px] font-mono font-semibold text-muted-foreground">
                        Step {step.number}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h4 className="text-lg font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {step.title}
                    </h4>

                    {/* Step Description */}
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Accent line */}
                  <div className="w-8 h-1 rounded-full bg-indigo-500/20 group-hover:w-full group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-all duration-300 mt-6" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
