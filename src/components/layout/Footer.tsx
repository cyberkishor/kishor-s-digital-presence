import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHomePage) {
      // On homepage, just scroll to the section
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to homepage with hash
      e.preventDefault();
      navigate('/' + hash);
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt={portfolioData.personal.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-foreground">
                {portfolioData.personal.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              {portfolioData.personal.tagline}
            </p>
            <p className="text-muted-foreground text-sm max-w-xs">
              Full-stack developer with 15+ years of experience building Shopify stores, SaaS platforms, and custom web solutions for clients across 15+ countries.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-1">
              {portfolioData.personal.social.linkedin && (
                <a
                  href={portfolioData.personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {portfolioData.personal.social.github && (
                <a
                  href={portfolioData.personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleHashClick(e, '#about')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleHashClick(e, '#services')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleHashClick(e, '#contact')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-primary transition-colors">
                  {portfolioData.personal.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a href="tel:+9779802075711" className="hover:text-primary transition-colors">
                  +977 980-2075711
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                {portfolioData.personal.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {portfolioData.personal.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
