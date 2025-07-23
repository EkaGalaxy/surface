import { useState, useEffect, useCallback } from 'react';
import { 
  Leaf, 
  Menu, 
  Sparkles, 
  ChevronDown, 
  ArrowRight,
  X
} from 'lucide-react';
import { QuizModal } from './QuizModal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Navigation items structure
interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavSubItem[];
}

interface NavFeatured {
  title: string;
  items: { title: string; href: string; description: string; badge?: string }[];
}

interface NavItem {
  title: string;
  href: string;
  description?: string;
  featured?: NavFeatured;
  sections?: NavSection[];
}

// Main navigation items
const navigationItems: NavItem[] = [
  {
    title: 'What We Heal',
    href: '/what-we-heal',
    description: 'Conditions we treat with compassion',
    featured: {
      title: 'Featured Healing Approaches',
      items: [
        { 
          title: "Women's Health", 
          href: '/what-we-heal#womens-health', 
          description: 'PCOS, fertility, hormonal balance',
          badge: 'Popular'
        },
        { 
          title: 'Mental Wellness', 
          href: '/what-we-heal#mental-wellness', 
          description: 'Anxiety, depression, stress management',
          badge: 'Trending'
        }
      ]
    },
    sections: [
      {
        title: 'Health Categories',
        items: [
          { title: 'Digestive Health', href: '/what-we-heal#digestive-health', description: 'IBS, bloating, gut health' },
          { title: 'Hormonal Balance', href: '/what-we-heal#hormonal-balance', description: 'Thyroid, diabetes, PCOS' },
          { title: 'Lifestyle Conditions', href: '/what-we-heal#lifestyle-conditions', description: 'Hypertension, obesity, fatigue' }
        ]
      }
    ]
  },
  {
    title: 'Our Approach',
    href: '/approach',
    description: 'How we heal differently',
    sections: [
      {
        title: 'Our Methodology',
        items: [
          { title: 'Five Healers Integration', href: '/approach/five-healers', description: 'Our unique collaborative model' },
          { title: 'Personalized Care', href: '/approach', description: 'Tailored to your constitution' },
          { title: 'Holistic Treatment', href: '/approach', description: 'Mind, body, and spirit healing' }
        ]
      }
    ]
  },
  {
    title: 'Programs',
    href: '/programs',
    description: 'Your healing journey options',
    featured: {
      title: 'Featured Programs',
      items: [
        { 
          title: 'ekaSanskara - 14 Days', 
          href: '/programs/ekasanskara', 
          description: 'Deep transformation program',
          badge: 'Best Value'
        },
        { 
          title: 'ekaPavana - 7 Days', 
          href: '/programs/ekapavana', 
          description: 'Gentle cleansing program',
          badge: 'Quick Start'
        }
      ]
    }
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch with us'
  }
];

export function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current path matches navigation item
  const isActivePath = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  // Dropdown menu handlers
  const handleMouseEnter = (itemTitle: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(itemTitle);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  // Open quiz modal
  const openQuizModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuizModalOpen(true);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg shadow-lg' 
          : 'bg-black/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="flex justify-between items-center h-16 md:h-20">
        

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                    href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  <span>{item.title}</span>
                  {(item.featured || item.sections) && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {(item.featured || item.sections) && (
                  <div 
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-screen max-w-md bg-white rounded-xl shadow-xl border border-teal-100 overflow-hidden transition-all duration-300 ${
                      activeDropdown === item.title 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-6">
                      {/* Featured Section */}
                      {item.featured && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                            {item.featured.title}
                          </h3>
                          <div className="grid gap-4">
                            {item.featured.items.map((featuredItem, index) => (
                              <Link
                                key={index}
                                href={featuredItem.href}
                                className="block p-4 rounded-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-teal-100 hover:shadow-md"
                              >
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="font-semibold text-teal-800 group-hover:text-teal-900">
                                    {featuredItem.title}
                                  </h4>
                                  {featuredItem.badge && (
                                    <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                      {featuredItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-teal-600 group-hover:text-teal-700">
                                  {featuredItem.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sections */}
                      {item.sections && (
                        <div className="space-y-6">
                          {item.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h4 className="font-semibold text-teal-800 mb-3 text-sm uppercase tracking-wide border-b border-teal-100 pb-2">
                                {section.title}
                              </h4>
                              <div className="space-y-2">
                                {section.items.map((sectionItem, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    href={sectionItem.href}
                                    className="block p-3 rounded-lg hover:bg-teal-50 transition-colors duration-200 group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium text-teal-800 group-hover:text-teal-900">
                                        {sectionItem.title}
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    {sectionItem.description && (
                                      <p className="text-xs text-teal-600 mt-1">
                                        {sectionItem.description}
                                      </p>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 rounded-full"
              >
                Sign In
              </Button>
              <Link href="/quiz">
                <Button
                  onClick={openQuizModal}
                  size="sm"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2 hover:bg-teal-50 rounded-full"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="w-6 h-6 text-teal-700" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-96 bg-white border-l border-teal-100 p-0 overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <SheetHeader className="flex items-center justify-between p-4 border-b border-teal-100">
                    <SheetTitle asChild>
                      <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-pink-400 rounded-full flex items-center justify-center">
                          <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-serif font-bold text-teal-800">ekaBrahmaa</span>
                      </Link>
                    </SheetTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1 hover:bg-teal-50 rounded-full"
                    >
                      <X className="w-5 h-5 text-teal-700" />
                    </Button>
                  </SheetHeader>

                  {/* Mobile Navigation - Replicated Desktop Style */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {navigationItems.map((item) => (
                      <div key={item.title} className="mb-6">
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg font-medium text-teal-800 ${
                            isActivePath(item.href) ? 'bg-teal-50' : 'hover:bg-teal-50'
                          }`}
                        >
                          {item.title}
                        </Link>
                        
                        {/* Mobile Dropdown Content */}
                        {(item.featured || item.sections) && (
                          <div className="mt-2 space-y-4">
                            {/* Featured Section */}
                            {item.featured && (
                              <div className="bg-teal-50 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-teal-900 mb-3 flex items-center">
                                  <Sparkles className="w-4 h-4 mr-2 text-pink-500" />
                                  {item.featured.title}
                                </h3>
                                <div className="space-y-3">
                                  {item.featured.items.map((featuredItem, index) => (
                                    <Link
                                      key={index}
                                      href={featuredItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block p-3 rounded-md bg-white hover:bg-gradient-to-r hover:from-teal-50 hover:to-pink-50 transition-all"
                                    >
                                      <div className="flex justify-between items-start">
                                        <h4 className="font-medium text-teal-800">
                                          {featuredItem.title}
                                        </h4>
                                        {featuredItem.badge && (
                                          <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            {featuredItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-teal-600 mt-1">
                                        {featuredItem.description}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Sections */}
                            {item.sections && (
                              <div className="space-y-4">
                                {item.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="border-t border-teal-100 pt-4">
                                    <h4 className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                                      {section.title}
                                    </h4>
                                    <div className="space-y-2">
                                      {section.items.map((sectionItem, itemIndex) => (
                                        <Link
                                          key={itemIndex}
                                          href={sectionItem.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="block px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-teal-800">
                                              {sectionItem.title}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-teal-500" />
                                          </div>
                                          {sectionItem.description && (
                                            <p className="text-xs text-teal-600 mt-1">
                                              {sectionItem.description}
                                            </p>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="p-4 border-t border-teal-100 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 rounded-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                    <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-full"
                        onClick={openQuizModal}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Take Quiz
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} />
    </header>
  );
}