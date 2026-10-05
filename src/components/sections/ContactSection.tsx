import { Mail, MapPin, Linkedin, Github, Phone, MessageCircle, Send, Sparkles } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { UpworkIcon } from '@/components/sections/ModernHeroSection';

export function ContactSection() {
  const { contact, personal } = portfolioData;
  const whatsappNumber = '9779802075711';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const phoneDisplay = '+977 980-2075711';

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-background/50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                <Send className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {contact.title}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                {contact.subtitle}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3.5">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/80 hover:border-indigo-500/40 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Email</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{personal.email}</p>
                </div>
              </a>

              <a
                href={`tel:+${whatsappNumber}`}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/80 hover:border-indigo-500/40 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Direct Call</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{phoneDisplay}</p>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/40 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">WhatsApp Fast Track</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{phoneDisplay}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/80">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Location & Timezone</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{personal.location} (UTC+5:45)</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-card border border-border/80 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all text-muted-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {personal.social.upwork && (
                <a
                  href={personal.social.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-card border border-border/80 hover:border-blue-500/40 hover:text-blue-500 hover:-translate-y-0.5 transition-all text-muted-foreground"
                  aria-label="Upwork Profile"
                >
                  <UpworkIcon className="w-5 h-5 fill-current" />
                </a>
              )}
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-card border border-border/80 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all text-muted-foreground"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column - WhatsApp Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <MessageCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Let's build something great
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Whether you need a full-stack platform, Shopify customization, or a reliable long-term engineer, I'm just a message away.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-102"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for new projects • Fast response time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
