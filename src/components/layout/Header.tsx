import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { siteSettings } from '@/lib/siteSettings';
import portfolioData from '@/data/portfolio.json';
import { UpworkIcon } from '@/components/sections/ModernHeroSection';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (isHomePage) {
        e.preventDefault();
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        e.preventDefault();
        navigate('/' + hash);
      }
    }
  };

  const getDisplayHref = (href: string) => {
    if (href.startsWith('/#') && isHomePage) return href.substring(1);
    return href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={siteSettings.logo}
              alt={siteSettings.siteName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-border/50 group-hover:ring-primary/50 transition-all"
            />
            <span className="font-semibold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">
              {siteSettings.siteName.split(' ')[0]}
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2">
            {siteSettings.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={getDisplayHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions: Upwork + Divider + CTA Pill + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {portfolioData.personal.social.upwork && (
              <a
                href={portfolioData.personal.social.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-muted-foreground hover:text-[#14a800] transition-colors flex items-center gap-1.5 px-2 py-1"
                aria-label="Upwork Profile"
              >
                <UpworkIcon className="w-4 h-4 fill-current" />
                <span>Upwork</span>
              </a>
            )}

            <span className="w-px h-4 bg-border/80" />

            <ThemeToggle />

            <Button 
              size="sm"
              asChild
              className="rounded-full px-5 h-9 text-xs font-semibold shadow-sm hover:shadow transition-all bg-foreground text-background hover:bg-foreground/90"
            >
              <a
                href={getDisplayHref(siteSettings.ctaHref)}
                onClick={(e) => handleNavClick(e, siteSettings.ctaHref)}
              >
                {siteSettings.ctaText}
              </a>
            </Button>
          </div>

          {/* Mobile Right Actions: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <button
              className="p-2 text-foreground rounded-md hover:bg-secondary/60 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <nav className="container-wide py-6">
            <ul className="flex flex-col gap-4">
              {siteSettings.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={getDisplayHref(link.href)}
                    className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {portfolioData.personal.social.upwork && (
                <li>
                  <a
                    href={portfolioData.personal.social.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-2 text-muted-foreground hover:text-[#14a800] transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UpworkIcon className="w-4 h-4 fill-current" />
                    <span>Upwork Profile</span>
                  </a>
                </li>
              )}
              <li className="pt-4">
                <Button asChild className="w-full rounded-full">
                  <a
                    href={getDisplayHref(siteSettings.ctaHref)}
                    onClick={(e) => {
                      handleNavClick(e, siteSettings.ctaHref);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {siteSettings.ctaText}
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
