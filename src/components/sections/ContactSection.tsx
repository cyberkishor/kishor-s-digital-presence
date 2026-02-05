import { useState } from 'react';
import { Send, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import portfolioData from '@/data/portfolio.json';

export function ContactSection() {
  const { contact, personal } = portfolioData;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

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

          {/* Right Column - Form */}
          <div className="p-6 md:p-8 rounded-2xl bg-background border border-border card-shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project inquiry"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    {contact.cta}
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
