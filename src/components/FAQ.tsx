import { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Shield, Sparkles } from 'lucide-react';
import { Language, translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import SectionLogo from './SectionLogo';

interface FAQProps {
  lang: Language;
  onNavigateToContact: () => void;
  isGenericOnly?: boolean;
}

interface FAQItem {
  id: string;
  question: { it: string; en: string };
  answer: { it: string; en: string };
  category: { it: string; en: string };
}

const faqData: FAQItem[] = [
  {
    id: 'faq0',
    category: { it: 'Servizi dello Studio', en: 'Studio Services' },
    question: {
      it: 'Quali sono i servizi principali offerti dallo Studio Criminalistica?',
      en: 'What are the main services provided by the Forensic Studio?'
    },
    answer: {
      it: 'Lo Studio offre consulenza tecnica e perizie di parte (CTP) in tre macro-aree: Grafologia Forense (verifica di firme, testamenti e lettere anonime), Analisi Documentale (verifica di falsi materiali su contratti, assegni e documenti d\'identità), e Criminalistica Applicata (ricostruzione 3D balistica/cinematica tramite la piattaforma FORA, BPA, e supporto alla difesa penale e civile).',
      en: 'The Studio provides expert technical consultation and defense reports (CTP) in three main areas: Forensic Graphology (handwriting verification, wills, and anonymous letters), Document Analysis (detecting physical forgery in contracts, checks, and identity papers), and Applied Criminalistics (3D ballistic/kinematic event reconstruction using the FORA platform, Bloodstain Pattern Analysis, and expert witness support).'
    }
  },
  {
    id: 'faq1',
    category: { it: 'Ammissibilità Legale', en: 'Legal Admissibility' },
    question: {
      it: 'Le ricostruzioni 3D con il software FORA sono ammissibili in tribunale?',
      en: 'Are 3D reconstructions with FORA software admissible in court?'
    },
    answer: {
      it: 'Assolutamente sì. Essendo FORA un software basato su codice sorgente aperto (Open Source) e metodologie scientifiche tracciabili, ogni calcolo balistico, di traiettoria o di fotogrammetria può essere interamente verificato dal perito del giudice (CTU) o dalle altre parti. Questa trasparenza scientifica elimina le "scatole nere" proprietarie, blindando l\'ammissibilità della prova tecnica ai sensi dell\'art. 189 c.p.p. italiano ed i criteri di scientificità internazionali.',
      en: 'Absolutely yes. Since FORA is an open-source platform built on traceable scientific methodologies, all ballistic, trajectory, and photogrammetric calculations can be fully verified by court-appointed experts (CTU) or opposing counsel. This scientific transparency eliminates proprietary "black boxes", safeguarding the admissibility of technical evidence in accordance with international forensic standards.'
    }
  },
  {
    id: 'faq2',
    category: { it: 'Segreto Professionale', en: 'Professional Secrecy' },
    question: {
      it: 'Come viene garantita la riservatezza sul mio caso?',
      en: 'How is confidentiality guaranteed for my case?'
    },
    answer: {
      it: 'La riservatezza è protetta dal segreto professionale forense ai sensi dell\'Art. 200 del Codice di Procedura Penale italiano. Tutte le comunicazioni telefoniche, i documenti caricati sul nostro portale protetto e le email sono crittografati. Nessun dato viene condiviso con terzi senza espresso consenso scritto della parte e del legale difensore.',
      en: 'Confidentiality is protected under strict professional and judicial secrecy guidelines (Art. 200 of the Italian Criminal Procedure Code). All telephone consultations, documents uploaded to our secure platform, and emails are fully encrypted. No data is shared with third parties without the express written consent of the client and their defense counsel.'
    }
  },
  {
    id: 'faq3',
    category: { it: 'Competenze Tecniche', en: 'Technical Expertise' },
    question: {
      it: 'Qual è la differenza tra Criminologo e Criminalista nello studio?',
      en: 'What is the difference between a Criminologist and a Criminalist in your studio?'
    },
    answer: {
      it: 'Il Criminologo analizza la mente criminale, la vittimologia, il movente e il contesto socio-comportamentale (es. autopsia psicologica in morti sospette o profili di mobbing). Il Criminalista, invece, applica le scienze biologiche e fisiche alla scena del crimine: analizza reperti, tracce ematiche (BPA), traiettorie di sparo e dati digitali. Lo Studio Elena Angelini unisce entrambe le discipline con un approccio multidisciplinare integrato.',
      en: 'A Criminologist analyzes the criminal mind, victimology, motive, and socio-behavioral context (e.g., psychological autopsy in suspicious deaths or workplace harassment profiles). A Criminalist, on the other hand, applies biological and physical sciences directly to the crime scene: analyzing physical evidence, bloodstain pattern analysis (BPA), ballistic flightpaths, and digital media. Our Studio integrates both disciplines in a single, cohesive taskforce.'
    }
  },
  {
    id: 'faq4',
    category: { it: 'Consulenza Conoscitiva', en: 'Preliminary Assessment' },
    question: {
      it: 'Il primo colloquio telefonico è davvero gratuito e senza impegno?',
      en: 'Is the first phone call really free and without obligation?'
    },
    answer: {
      it: 'Sì. Crediamo che chiunque abbia il diritto di comprendere la fattibilità scientifica della propria difesa. Durante la prima chiamata telefonica di orientamento (della durata massima di 15-20 minuti) esamineremo a grandi linee il tipo di reato o controversia lavorativa, indicandoti se ci sono i presupposti scientifici per una perizia di parte CTP. Riceverai quindi un preventivo trasparente.',
      en: 'Yes. We firmly believe everyone has the right to understand the scientific feasibility of their defense. During the initial orientation phone call (up to 15-20 minutes), we will discuss the general framework of the incident or labor dispute and inform you if there are viable scientific elements for a technical report. You will then receive a transparent cost breakdown.'
    }
  },
  {
    id: 'faq5',
    category: { it: 'Tempi e Consegna', en: 'Timeline & Delivery' },
    question: {
      it: 'Quali sono i tempi medi per elaborare una perizia o ricostruzione 3D?',
      en: 'What is the average timeline to deliver a forensic report or 3D twin?'
    },
    answer: {
      it: 'I tempi variano a seconda della complessità del caso e del volume del fascicolo processuale. In genere, un\'analisi preliminare viene fornita entro 7-10 giorni lavorativi, mentre la ricostruzione tridimensionale completa con la relazione giurata CTP richiede dalle 3 alle 6 settimane. Per scadenze legali urgenti, concordiamo tempi ridotti d\'intesa con il vostro avvocato.',
      en: 'Timelines vary based on the complexity of the incident and the sheer size of the court files. Generally, a preliminary assessment report is delivered within 7-10 business days, while a comprehensive 3D reconstruction and certified expert witness report takes between 3 to 6 weeks. For urgent court deadlines, expedited schedules are synchronized with your attorney.'
    }
  }
];

const genericServicesFaqData: FAQItem[] = [
  {
    id: 'g0',
    category: { it: 'Grafologia Forense', en: 'Forensic Graphology' },
    question: {
      it: "In cosa consiste l'esame grafologico e quando si applica?",
      en: "What does forensic handwriting analysis consist of and when is it applied?"
    },
    answer: {
      it: "L'indagine grafologica forense è volta ad accertare l'autenticità o l'apocrifia di scritti, in particolare testamenti olografi, firme su contratti, assegni, scritture private o lettere anonime. L'esame viene svolto attraverso un attento confronto microscopico e strumentale tra lo scritto in verifica e le scritture di comparazione idonee, valutando parametri quali pressione, ritmo, velocità e dinamismo grafico.",
      en: "Forensic graphological analysis is designed to verify the authenticity or forgery of handwritten documents, particularly holographic wills, signatures on contracts, checks, or anonymous letters. The investigation is conducted via microscopical and optical comparison between the questioned writing and suitable comparative samples, analyzing pressure, rhythm, speed, and graphic dynamism."
    }
  },
  {
    id: 'g1',
    category: { it: 'Analisi Documentale', en: 'Document Analysis' },
    question: {
      it: "Cos'è l'analisi documentale forense e quali alterazioni rileva?",
      en: "What is forensic document analysis and what types of alterations does it detect?"
    },
    answer: {
      it: "L'analisi documentale forense (o analisi dei falsi materiali) serve a verificare se un documento, sia esso un contratto, una cambiale o un documento d'identità, sia stato alterato o falsificato. Lo studio analizza il tipo di supporto cartaceo, la natura degli inchiostri (mediante esami all'infrarosso e all'ultravioletto), la presenza di abrasioni, cancellature fisiche o chimiche, e se vi siano state aggiunte o interpolazioni successive di testo.",
      en: "Forensic document analysis (or material forgery analysis) verifies whether documents like contracts, promissory notes, or ID documents have been altered or forged. We analyze the paper substrate, ink compositions (using infrared and ultraviolet spectroscopy), physical or chemical erasures, and subsequent text interpolations or additions."
    }
  },
  {
    id: 'g2',
    category: { it: 'Criminalistica & 3D', en: 'Criminalistics & 3D' },
    question: {
      it: "Come funziona la ricostruzione balistica e cinematica 3D?",
      en: "How does 3D ballistic and kinematic event reconstruction work?"
    },
    answer: {
      it: "Attraverso il rilievo laser e l'utilizzo della piattaforma scientifica open-source FORA (Forensic Open Reconstruction), ricostruiamo virtualmente tridimensionalmente la dinamica di reato o incidenti. Questo ci consente di calcolare con precisione millimetrica traiettorie di sparo, zone d'origine, angoli di impatto, visibilità dei soggetti e dinamiche d'urto nei sinistri stradali, traducendo dati complessi in simulazioni chiare e inoppugnabili.",
      en: "Using precise laser measurements and our scientific open-source FORA platform, we virtually reconstruct the 3D dynamics of crimes or accidents. This allows us to calculate bullet trajectories, point of origin, impact angles, line-of-sight visibility, and collision dynamics in traffic accidents with millimeter-level precision, translating complex forensic data into clear and irrefutable simulations."
    }
  },
  {
    id: 'g3',
    category: { it: 'Criminologia Clinica', en: 'Clinical Criminology' },
    question: {
      it: "Quali servizi rientrano nell'ambito della criminologia clinica e vittimologia?",
      en: "What services fall under clinical criminology and victimology?"
    },
    answer: {
      it: "Lo Studio offre consulenza per la valutazione del danno psichico, profili di mobbing lavorativo, stalking, e la stesura di autopsie psicologiche nei casi di morti equivoche. Attraverso l'analisi della vittimologia e del comportamento, forniamo pareri tecnici volti a comprendere lo stato mentale o l'esposizione a dinamiche persecutorie del soggetto, sia in ambito civile che penale.",
      en: "We provide expert advice for psychological harm assessments, workplace harassment (mobbing) profiles, stalking situations, and psychological autopsies in equivocal deaths. By analyzing victimology and behavioral evidence, we offer technical assessments designed to clarify a subject's mental state or exposure to harassment patterns for civil or criminal defense."
    }
  },
  {
    id: 'g4',
    category: { it: 'Genetica & BPA', en: 'Genetics & BPA' },
    question: {
      it: "Cos'è la Bloodstain Pattern Analysis (BPA) e come supporta la difesa?",
      en: "What is Bloodstain Pattern Analysis (BPA) and how does it support the defense?"
    },
    answer: {
      it: "La BPA è lo studio scientifico della forma, dimensione, distribuzione e posizione delle tracce ematiche sulla scena del crimine. Questa analisi fisica e geometrica consente di determinare l'origine delle macchie, la direzione delle forze applicate, il tipo di arma o azione che ha causato il sanguinamento e la posizione di vittima ed aggressore durante l'evento, offrendo un riscontro oggettivo alla ricostruzione dei fatti.",
      en: "BPA is the scientific study of the shape, size, distribution, and location of bloodstains at a crime scene. This physical and geometric analysis determines the origin of blood droplets, the direction of forces applied, the type of weapon or action that caused the bleeding, and the relative positions of the victim and assailant during the event, providing objective feedback to crime reconstructions."
    }
  }
];

export default function FAQ({ lang, onNavigateToContact, isGenericOnly = false }: FAQProps) {
  const t = translations[lang];

  const renderDoubleColor = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 1) return text;
    const mid = words.length <= 2 ? 1 : Math.ceil(words.length * 0.5);
    return (
      <>
        <span className="text-slate-100">{words.slice(0, mid).join(' ')}</span>{' '}
        <span className="text-cold-400 font-extrabold">{words.slice(mid).join(' ')}</span>
      </>
    );
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSource = isGenericOnly ? genericServicesFaqData : faqData;

  const filteredFaqs = faqSource.filter((item) => {
    const qText = item.question[lang === 'it' ? 'it' : 'en'].toLowerCase();
    const aText = item.answer[lang === 'it' ? 'it' : 'en'].toLowerCase();
    const cText = item.category[lang === 'it' ? 'it' : 'en'].toLowerCase();
    const s = searchQuery.toLowerCase();
    return qText.includes(s) || aText.includes(s) || cText.includes(s);
  });

  return (
    <section className="space-y-10 py-6">
      
      {/* Header block */}
      <div className="text-left space-y-4 max-w-3xl">
        <SectionLogo lang={lang} />
        
        <div className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded animate-pulse">
          <HelpCircle className="w-3.5 h-3.5 text-cold-400" />
          <span>// {t['nav-faq'] || 'FAQ'}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-serif">
          {renderDoubleColor(isGenericOnly 
            ? (lang === 'it' ? 'Domande Frequenti sui Servizi' : 'Frequently Asked Questions on Services')
            : (lang === 'it' ? 'Domande Frequenti Forensi' : 'Forensic Frequently Asked Questions')
          )}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {isGenericOnly
            ? (lang === 'it'
                ? 'Risposte approfondite e scientifiche riguardo alle aree di attività dello Studio: grafologia forense, analisi documentale, criminalistica applicata e criminologia.'
                : 'Detailed, scientifically grounded answers regarding our Studio\'s areas of practice: forensic graphology, document analysis, applied criminalistics, and criminology.')
            : (lang === 'it' 
                ? 'Risposte chiare e scientifiche riguardo ai protocolli di indagine dello Studio, ammissibilità legale delle perizie 3D e modalità operative d\'ufficio.'
                : 'Clear, scientifically grounded answers regarding Studio investigation protocols, 3D report admissibility in court, and technical guidelines.')}
        </p>
      </div>

      {/* Search Input widget */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input
          type="text"
          placeholder={lang === 'it' ? 'Cerca tra le risposte...' : 'Search questions or keywords...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950/80 text-slate-100 pl-10 pr-4 py-3 border border-slate-900 rounded-lg text-sm focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-400/20 transition-all font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono"
          >
            [CLEAR]
          </button>
        )}
      </div>

      {/* FAQ list */}
      <div className="space-y-4 max-w-4xl">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => {
            const isOpen = openId === item.id;
            const itemQuestion = item.question[lang === 'it' ? 'it' : 'en'];
            const itemAnswer = item.answer[lang === 'it' ? 'it' : 'en'];
            const itemCategory = item.category[lang === 'it' ? 'it' : 'en'];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`border rounded-lg transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-900/20 border-cold-400/40 ring-1 ring-cold-400/10' 
                    : 'bg-slate-900/5 border-slate-800/80 hover:border-slate-800'
                }`}
              >
                {/* Accordion trigger button */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:text-cold-300 transition-colors cursor-pointer"
                >
                  <div className="space-y-1 pr-4">
                    <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-900/40">
                      {itemCategory}
                    </span>
                    <h4 className="text-base font-bold font-serif text-slate-200 mt-1">
                      {itemQuestion}
                    </h4>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 transition-transform duration-250 ${isOpen ? 'rotate-180 text-cold-400 border-cold-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Body panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-slate-900 text-slate-400 text-sm leading-relaxed font-sans text-left space-y-3">
                        <p>{itemAnswer}</p>
                        <div className="pt-3 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Shield className="w-3 h-3 text-emerald-500/80" />
                            <span>COPERTURA DA SEGRETO PROFESSIONALE forense (Art. 200 c.p.p.)</span>
                          </span>
                          <span>ID: {item.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/5">
            <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              {lang === 'it' 
                ? 'Nessuna corrispondenza trovata per la tua ricerca.' 
                : 'No FAQs matching your search query were found.'}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-cold-400 font-mono underline hover:text-cold-300"
            >
              {lang === 'it' ? '[ Reimposta Filtro ]' : '[ Reset Filter ]'}
            </button>
          </div>
        )}
      </div>

      {/* Strategic Call to Action */}
      <div className="max-w-4xl bg-slate-950/40 border border-slate-900 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left relative overflow-hidden scanlines">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-1.5 text-cold-300">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              {lang === 'it' ? 'Hai una domanda specifica sul tuo caso?' : 'Do you have a custom legal query?'}
            </span>
          </div>
          <h4 className="font-bold font-serif text-slate-200 text-lg">
            {lang === 'it' 
              ? 'Parla direttamente con lo specialista' 
              : 'Talk directly with our Forensic Criminologist'}
          </h4>
          <p className="text-xs text-slate-400">
            {lang === 'it'
              ? 'Il primo colloquio conoscitivo telefonico (15 min) è completamente protetto e gratuito.'
              : 'Your preliminary 15-minute phone alignment is confidential and free of charge.'}
          </p>
        </div>
        <button
          onClick={onNavigateToContact}
          id="faq-speak-with-expert-cta"
          className="bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-all whitespace-nowrap cursor-pointer active:scale-95 z-10"
        >
          {t['cta-header'] || 'Colloquio Gratis'}
        </button>
      </div>

    </section>
  );
}
