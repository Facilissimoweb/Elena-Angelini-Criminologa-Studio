import { Home, ChevronRight } from 'lucide-react';
import { Language, PageId, translations } from '../types';
import { motion } from 'motion/react';

interface BreadcrumbsProps {
  lang: Language;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export default function Breadcrumbs({ lang, currentPage, setCurrentPage }: BreadcrumbsProps) {
  const t = translations[lang];

  // Map of page IDs to their corresponding translation key for the label
  const pageLabelKeys: Record<PageId, keyof typeof translations.it> = {
    home: 'nav-home',
    'chi-siamo': 'nav-about',
    servizi: 'nav-services',
    'punti-forza': 'nav-why',
    testimonianze: 'nav-testimonials',
    blog: 'nav-blog',
    faq: 'nav-faq',
    contatti: 'nav-contacts',
  };

  const getLabel = (pageId: PageId): string => {
    const key = pageLabelKeys[pageId];
    return t[key] || pageId;
  };

  const isHome = currentPage === 'home';

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <nav 
        aria-label="Breadcrumb"
        className="inline-flex items-center space-x-2 bg-cold-950/40 backdrop-blur-md border border-cyan-950/40 px-4 py-2 rounded-xl text-xs font-mono select-none shadow-sm shadow-cyan-950/10"
      >
        {/* Home link */}
        <button
          onClick={() => setCurrentPage('home')}
          className={`flex items-center space-x-1.5 transition-all uppercase tracking-wider cursor-pointer ${
            isHome
              ? 'text-cyan-400 font-bold pointer-events-none'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
          title={getLabel('home')}
        >
          <Home className="h-3.5 w-3.5" />
          <span>{getLabel('home')}</span>
        </button>

        {/* Separator and Current Page (if not on Home) */}
        {!isHome && (
          <>
            <ChevronRight className="h-3 w-3 text-cyan-900" />
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-1.5"
            >
              <span className="text-cold-400 font-bold uppercase tracking-wider bg-cold-500/10 border border-cold-500/20 px-2 py-0.5 rounded-md">
                {getLabel(currentPage)}
              </span>
            </motion.div>
          </>
        )}
      </nav>
    </motion.div>
  );
}
