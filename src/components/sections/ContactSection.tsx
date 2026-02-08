import { Mail, MapPin, Linkedin, Github, Phone, MessageCircle } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function ContactSection() {
  const { contact, personal } = portfolioData;
  const whatsappNumber = '9779802075711';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const phoneDisplay = '+977 980-2075711';

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <p className="text-primary font-mono text-sm mb-2">// Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {contact.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {contact.subtitle}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email me at</p>
                  <p className="font-medium text-foreground">{personal.email}</p>
                </div>
              </a>

              <a
                href={`tel:+${whatsappNumber}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call me at</p>
                  <p className="font-medium text-foreground">{phoneDisplay}</p>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp me</p>
                  <p className="font-medium text-foreground">{phoneDisplay}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Located in</p>
                  <p className="font-medium text-foreground">{personal.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-background border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-background border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column - WhatsApp CTA */}
          <div className="p-8 md:p-10 rounded-2xl bg-background border border-border card-shadow flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Let's talk about your project</h3>
              <p className="text-muted-foreground max-w-sm">
                Drop me a message on WhatsApp for a quick response, or send an email with your project details.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <p className="text-xs text-muted-foreground">
              Usually responds within a few hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
