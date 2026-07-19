import * as React from 'react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  BookOpen, 
  Tag, 
  Newspaper, 
  Bell, 
  Send,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../types';

interface BlogPost {
  id: string;
  category: { it: string; en: string };
  title: { it: string; en: string };
  excerpt: { it: string; en: string };
  content: { it: string; en: string };
  date: string;
  readTime: string;
  author: string;
  imageAlt: string;
}

interface NewsItem {
  id: string;
  date: string;
  title: { it: string; en: string };
  isAlert?: boolean;
}

const newsData: NewsItem[] = [
  {
    id: 'n1',
    date: '12 Luglio 2026',
    title: {
      it: 'Elena Angelini nominata CTP per un importante caso di verifica testamentaria a Bologna.',
      en: 'Elena Angelini appointed as expert witness (CTP) for a major will verification case in Bologna.'
    },
    isAlert: true
  },
  {
    id: 'n2',
    date: '05 Luglio 2026',
    title: {
      it: 'Rilasciato l\'aggiornamento v2.5 della suite di ricostruzione 3D FORA dello studio.',
      en: 'Released update v2.5 of the studio\'s FORA 3D reconstruction suite.'
    }
  },
  {
    id: 'n3',
    date: '24 Giugno 2026',
    title: {
      it: 'Seminario accreditato: "La prova scientifica nel processo penale" - Rimini, Settembre 2026.',
      en: 'Accredited seminar: "Scientific proof in criminal trials" - Rimini, September 2026.'
    }
  }
];

const blogPosts: BlogPost[] = [
  {
    id: 'post1',
    category: { it: 'Grafologia Forense', en: 'Forensic Graphology' },
    title: {
      it: 'L\'Analisi Scritturale nei Testamenti Olografi: Tra Scienza e Contraffazione',
      en: 'Handwriting Analysis in Holographic Wills: Between Science and Forgery'
    },
    excerpt: {
      it: 'Come la grafologia forense analizza pressione, direzione, ritmo e fluidità per distinguere un testamento olografo autentico da una contraffazione studiata a tavolino.',
      en: 'How forensic graphology analyzes pressure, slant, rhythm, and stroke fluidity to distinguish an authentic holographic will from a carefully planned forgery.'
    },
    content: {
      it: `### L'Indagine Grafologica Forense sui Testamenti

Il testamento olografo, per sua natura, è uno degli atti giuridici più esposti al rischio di falsificazione. Trattandosi di un documento interamente redatto, datato e sottoscritto di pugno dal testatore, la sua autenticità poggia unicamente sulla corrispondenza della grafia con le abitudini scritturali del de cuius.

Quando sorge il sospetto di una contraffazione, lo **Studio Criminalistica Elena Angelini** interviene applicando i protocolli scientifici internazionali della grafologia forense. L'analisi non si limita a un semplice confronto visivo delle forme delle lettere, che un falsificatore esperto può imitare con successo, ma penetra nei parametri neuro-motori invisibili all'occhio inesperto.

#### I Parametri Neuro-Motori Sotto Lente d'Ingrandimento

Un falso per imitazione o ricalco presenta sempre anomalie fisiche che la scienza forense è in grado di rilevare:

1. **La Pressione Strutturale**: La pressione esercitata sul foglio è un gesto automatico, governato dal sistema nervoso centrale. Un falsificatore concentrato a imitare le forme altrui tenderà a esercitare una pressione statica e uniforme, priva di quelle alternanze dinamiche tra tratti ascendenti (solitamente più leggeri) e discendenti (più marcati) tipiche della scrittura naturale.
2. **I Gradi di Fluidità e Velocità**: Chi imita scrive lentamente. All'analisi microscopica, questo si traduce in esitazioni, tremori anomali, micro-interruzioni e accumuli di inchiostro insoliti nei punti di svolta delle lettere.
3. **I "Gesti Sfuggiti"**: Ognuno di noi possiede automatismi grafici inconsci (il modo in cui taglia le 't', la forma dei puntini sulle 'i', gli attacchi e i distacchi delle lettere). Un falsificatore non può controllarli tutti simultaneamente, lasciando inevitabilmente tracce del proprio stile motorio nativo.

#### La Metodologia di Confronto Forense

L'accertamento richiede un corpus di scritture comparative coeve, sicuramente riconducibili al testatore (es. lettere autografe, diari, contratti firmati). Attraverso strumentazioni ottiche ad alta risoluzione e microscopia digitale, la dott.ssa Elena Angelini analizza l'incidenza della penna sulla carta, la morfologia del solco cieco (la scanalatura lasciata sul retro del foglio) e la coerenza del tracciato per determinare, con assoluta certezza scientifica, se l'atto sia autentico o apocrifo.`,
      en: `### Forensic Handwriting Investigation on Wills

The holographic will, by its nature, is one of the legal acts most vulnerable to falsification. Since it is entirely written, dated, and signed by the testator's own hand, its authenticity relies solely on the correspondence of the handwriting with the habitual writing style of the deceased.

When forgery is suspected, the **Elena Angelini Forensic Criminology Studio** intervenes by applying international scientific protocols of forensic graphology. The analysis is not limited to a simple visual comparison of letter shapes—which an experienced forger can mimic successfully—but penetrates into neuromotor parameters invisible to the untrained eye.

#### Neuromotor Parameters Under the Microscope

A forgery by imitation or tracing always displays physical anomalies that forensic science can detect:

1. **Structural Pressure**: The pressure exerted on paper is an automatic gesture governed by the central nervous system. A forger focusing on mimicking someone else's shapes will tend to exert static and uniform pressure, lacking the dynamic shifts between lighter upstrokes and heavier downstrokes typical of natural writing.
2. **Fluidity and Speed Levels**: Anyone imitating writes slowly. Under microscopic analysis, this translates to hesitations, unnatural tremors, micro-interruptions, and unusual ink deposits at the turning points of letters.
3. **Involuntary Automatic Gestures**: Everyone possesses unconscious graphical habits (the way we cross 't's, dot 'i's, or connect letters). A forger cannot control all of these simultaneously, inevitably leaving traces of their native motor style.

#### The Forensic Comparison Methodology

Verification requires a corpus of contemporary comparison writings definitely written by the testator (e.g., diaries, personal letters, signed contracts). Using high-resolution optical instruments and digital microscopy, Dr. Elena Angelini analyzes pen-on-paper incidence, pressure groove morphology (the blind groove left on the back of the sheet), and stroke coherence to determine, with absolute scientific certainty, whether the document is authentic or apocryphal.`
    },
    date: '12 Luglio 2026',
    readTime: '6 min',
    author: 'Elena Angelini',
    imageAlt: 'Forensic graphology examination'
  },
  {
    id: 'post2',
    category: { it: 'Criminalistica', en: 'Criminalistics' },
    title: {
      it: 'FORA in Azione: La Ricostruzione Tridimensionale della Scena del Crimine',
      en: 'FORA in Action: 3D Crime Scene Reconstruction & Ballistics'
    },
    excerpt: {
      it: 'Un focus tecnico su come la fotogrammetria digitale e i modelli fisici di fluidodinamica permettono di ricreare in 3D le scene del crimine e verificare l\'attendibilità scientifica delle testimonianze.',
      en: 'A technical deep-dive into how digital photogrammetry and physical fluid dynamics models allow us to recreate crime scenes in 3D and verify the scientific reliability of testimonies.'
    },
    content: {
      it: `### La Rivoluzione Tridimensionale nelle Scienze Forensi

La ricostruzione fisica della scena del crimine è un pilastro fondamentale delle indagini difensive. Tradizionalmente basata su schizzi planimetrici bidimensionali e fotografie, oggi compie un salto evolutivo grazie a **FORA (Forensic Open Reconstruction)**, la piattaforma tecnologica open-source utilizzata dallo **Studio Elena Angelini**.

Attraverso FORA, la scena del crimine non viene semplicemente "mostrata", ma trasformata in un **laboratorio fisico virtuale** altamente interattivo e misurabile al millimetro.

#### Fotogrammetria e Nuvole di Punti

Il processo inizia con il rilievo fotogrammetrico della scena, dei reperti o dei corpi. Attraverso centinaia di scatti fotografici eseguiti da angolazioni calibrate, speciali algoritmi estraggono milioni di punti nello spazio, generando una nuvola di punti 3D (point cloud) e, successivamente, una mesh tridimensionale texturizzata ad altissima fedeltà.

Questa metodologia garantisce un vantaggio cruciale: **la cristallizzazione permanente dello stato dei luoghi**. Anche se la scena reale viene alterata, ripulita o smantellata poche ore dopo il delitto, il modello virtuale rimane intatto e ispezionabile all'infinito da giudici, avvocati e periti.

#### Traiettorie Balistiche e Bloodstain Pattern Analysis (BPA)

FORA esprime il suo massimo potenziale nell'integrazione delle leggi della fisica e della geometria applicata:

1. **Traiettorie Balistiche**: Inserendo le coordinate spaziali dei fori d'entrata e d'uscita su pareti, oggetti o corpi, il software traccia i vettori di traiettoria calcolando l'angolo di incidenza, l'angolo di azimut e individuando l'area di origine degli spari (cono di dispersione).
2. **Bloodstain Pattern Analysis (BPA)**: Le tracce di sangue proiettate sulle superfici seguono rigide leggi fisiche. Analizzando l'ellitticità delle gocce (rapporto larghezza/lunghezza), FORA calcola l'angolo d'impatto e ricostruisce i vettori inversi per identificare l'esatto punto d'origine del trauma (es. la posizione della vittima e dell'aggressore al momento del colpo).

#### La Riproducibilità Scientifica in Tribunale

La scelta di uno strumento open-source non è casuale: a differenza dei software commerciali chiusi, il codice sorgente e le formule fisiche di FORA sono liberamente verificabili da qualsiasi controparte. Questo elimina il rischio che la prova venga dichiarata inammissibile o criticata come una "scatola nera" non trasparente, blindando l'efficacia del parere tecnico del CTP in dibattimento.`,
      en: `### The 3D Revolution in Forensic Sciences

Physical reconstruction of a crime scene is a fundamental pillar of defensive investigations. Traditionally relying on 2D sketches and photos, it takes a massive leap forward with **FORA (Forensic Open Reconstruction)**, the open-source technological suite used by the **Elena Angelini Studio**.

Through FORA, the crime scene is not just "shown" but transformed into an interactive **virtual physics laboratory**, measurable to the millimeter.

#### Photogrammetry and Point Clouds

The process begins with photogrammetric surveying of the scene, items, or bodies. Using hundreds of photographs taken from calibrated angles, specialized algorithms extract millions of spatial coordinates, generating a 3D point cloud and subsequently a highly detailed textured mesh.

This methodology guarantees a critical benefit: **the permanent crystallization of the scene**. Even if the physical scene is altered, cleaned, or dismantled hours after the event, the virtual model remains intact and inspectable indefinitely by judges, lawyers, and experts.

#### Ballistic Trajectories and Bloodstain Pattern Analysis (BPA)

FORA expresses its maximum potential by integrating physical laws and applied geometry:

1. **Ballistic Trajectories**: By inserting spatial coordinates of entry/exit bullet holes on walls, objects, or bodies, the software plots trajectory vectors, calculating incidence and azimuth angles, and isolating the weapon's origin zone (cone of uncertainty).
2. **Bloodstain Pattern Analysis (BPA)**: Blood splatters projected onto surfaces follow strict physical laws. Analyzing drop ellipticity (width-to-length ratio), FORA calculates the impact angle and reconstructs inverse vectors to identify the exact origin point of the trauma (e.g., the position of the victim and attacker at the moment of impact).

#### Scientific Reproducibility in Court

Choosing an open-source tool is deliberate: unlike closed commercial software, FORA's source code and mathematical formulas are freely inspectable by any opposing expert. This eliminates the risk of the proof being thrown out or criticized as an untrustworthy "black box", locking down the admissibility and effectiveness of the defense witness report.`
    },
    date: '28 Giugno 2026',
    readTime: '8 min',
    author: 'Elena Angelini',
    imageAlt: '3D Forensic reconstruction wireframe rendering'
  },
  {
    id: 'post3',
    category: { it: 'Criminologia', en: 'Criminology' },
    title: {
      it: 'La Profilazione Geografica nei Delitti Seriali: Modelli Matematici Applicati',
      en: 'Geographical Profiling in Serial Crime: Applied Mathematical Models'
    },
    excerpt: {
      it: 'L\'algoritmo di Rossmo e lo studio dei punti di ancoraggio: come l\'analisi spaziale dei reati aiuta a circoscrivere l\'area di residenza o di lavoro di un autore ignoto.',
      en: 'Rossmo\'s algorithm and the study of anchor points: how spatial analysis of offenses helps investigators narrow down the residence or workplace of an unknown offender.'
    },
    content: {
      it: `### L'Analisi Spaziale del Comportamento Criminale

Nelle indagini su delitti seriali o reati ripetuti nello stesso territorio (come rapine, incendi dolosi, atti vandalici o aggressioni), la criminologia moderna si avvale di metodologie quantitative d'avanguardia. Tra queste, la **Profilazione Geografica** (Geographic Profiling) rappresenta uno strumento investigativo straordinario per ottimizzare le risorse sul territorio e indirizzare le indagini.

Lo **Studio Criminalistica Elena Angelini** integra queste tecniche per analizzare la distribuzione dei crimini e supportare i collegi difensivi nell'esame della coerenza indiziaria.

#### La Mente del Criminale nello Spazio

La profilazione geografica si basa su due pilastri della criminologia ambientale:

1. **La Teoria del Modello di Attività**: Gli autori di reati non scelgono i luoghi dei loro crimini in modo puramente casuale. Essi operano all'interno del proprio "spazio di attività" quotidiano (casa, lavoro, percorsi abituali), colpendo in zone che percepiscono come familiari e sicure.
2. **Il Principio del Minimo Sforzo (Zipf)**: Un individuo tende a viaggiare solo lo stretto necessario per raggiungere il proprio obiettivo. Pertanto, la probabilità di un crimine decresce all'aumentare della distanza dal punto di ancoraggio dell'autore (es. la sua abitazione).
3. **La Zona di Rispetto (Buffer Zone)**: Al tempo stesso, l'autore evita di colpire nelle immediate vicinanze del proprio punto d'ancoraggio per non rischiare di essere riconosciuto dai vicini o collegato direttamente al reato. Si crea così una "zona cuscinetto" priva di crimini attorno al suo baricentro di vita.

#### L'Algoritmo di Rossmo (CGT)

Matematicamente, la profilazione geografica utilizza algoritmi complessi, il più celebre dei quali è la **Criminal Geographic Targeting (CGT)** sviluppata da Kim Rossmo.

L'algoritmo analizza le coordinate spaziali dei diversi siti legati al delitto (luogo dell'aggressione, luogo del ritrovamento, ecc.) e assegna a ogni coordinata della mappa un valore di probabilità basato sulla distanza dai crimini, tenendo conto sia della decrescita della distanza sia della zona di rispetto.

Il risultato è una **mappa di probabilità tridimensionale (Jeopardy Surface)**, dove le aree a picco più elevato rappresentano le zone geografiche in cui è statisticamente più probabile che l'autore risieda, lavori o possieda un punto di appoggio stabile.

#### Utilità Pratica per la Difesa

In un contesto giudiziario, dimostrare la non coerenza spaziale di un sospettato rispetto alla mappa geografica del delitto, o analizzare le discrepanze nei pattern spaziali attribuiti a un presunto serial killer, può rivelarsi fondamentale per scardinare costrutti accusatori basati unicamente su labili indizi o testimonianze oculari fallibili.`,
      en: `### Spatial Analysis of Criminal Behavior

In investigations of serial offenses or repeated crimes in a specific territory (such as robberies, arson, vandalism, or assaults), modern criminology utilizes advanced quantitative methodologies. Among these, **Geographic Profiling** represents an extraordinary investigative tool to optimize territorial resources and direct investigative lines.

The **Elena Angelini Forensic Criminology Studio** integrates these techniques to analyze crime distribution and support legal defense teams in examining circumstantial evidence.

#### The Criminal Mind in Space

Geographic profiling is built upon two key pillars of environmental criminology:

1. **Activity Space Theory**: Offenders do not choose crime locations purely at random. They operate within their daily "activity space" (home, work, common routes), striking in zones they perceive as familiar and safe.
2. **Principle of Least Effort (Zipf)**: An individual tends to travel only as far as necessary to achieve their goal. Therefore, the probability of a crime decreases as distance from the offender's anchor point (e.g., their residence) increases.
3. **The Buffer Zone**: At the same time, offenders avoid striking in the immediate vicinity of their anchor point to prevent being recognized by neighbors or directly linked to the offense. This creates a crime-free "buffer zone" around their personal life center.

#### Rossmo's Algorithm (CGT)

Mathematically, geographic profiling utilizes complex algorithms, most famously the **Criminal Geographic Targeting (CGT)** model developed by Dr. Kim Rossmo.

The algorithm analyzes the spatial coordinates of different crime sites (abduction site, release site, etc.) and assigns a probability score to every coordinate on the map based on distance metrics, accounting for both distance decay and the buffer zone.

The output is a **3D probability density map (Jeopardy Surface)**, where the peak areas represent the geographic zones where the offender is statistically most likely to reside, work, or own a stable base.

#### Practical Utility for Legal Defense

In a legal context, demonstrating that a suspect's routine movements are entirely inconsistent with the spatial model of the crime, or highlighting discrepancies in spatial patterns attributed to a single perpetrator, can be key to challenging prosecution arguments built on weak circumstantial evidence or fallible eyewitness accounts.`
    },
    date: '05 Luglio 2026',
    readTime: '7 min',
    author: 'Elena Angelini',
    imageAlt: 'Geographic profiling jeopardy map visualization'
  },
  {
    id: 'post4',
    category: { it: 'Analisi Documentale', en: 'Document Analysis' },
    title: {
      it: 'La Datazione dell\'Inchiostro e l\'Analisi Documentale Spettroscopica',
      en: 'Ink Dating and Spectroscopic Document Analysis'
    },
    excerpt: {
      it: 'Come rilevare alterazioni fisiche e cronologiche successive su contratti, fideiussioni e testamenti mediante tecniche spettroscopiche non distruttive e analisi chimica.',
      en: 'How to detect subsequent physical and chronological alterations on contracts, guarantees, and wills using non-destructive spectroscopic techniques and chemical analysis.'
    },
    content: {
      it: `### L'Accertamento della Veridicità Documentale

Nel panorama delle controversie legali, commerciali e civili, la contraffazione di documenti cartacei rappresenta un fenomeno purtroppo diffuso. Firme aggiunte a posteriori, cifre alterate su contratti o cambiali, testi inseriti abusivamente sfruttando spazi vuoti su fogli firmati in bianco (i cosiddetti abusivi riempimenti): sono solo alcune delle fattispecie affrontate dallo **Studio Criminalistica Elena Angelini**.

Grazie a strumentazioni tecnologiche avanzate e metodologie di spettroscopia ottica non distruttive, lo studio è in grado di smascherare falsi documentali e alterazioni con assoluto rigore scientifico.

#### Svelare l'Invisibile: L'Analisi all'Infrarosso (IR) e Ultravioletto (UV)

Il primo passo per rilevare un'alterazione o un inserimento abusivo consiste nell'analisi ottica multispettrale:

1. **Riflettanza e Luminescenza Infrarossa (IR)**: Inchiostri apparentemente identici all'occhio umano (ad esempio, due biro nere dello stesso colore) possiedono spesso composizioni chimiche diverse. Illuminando il documento con lunghezze d'onda selezionate nella banda dell'infrarosso, un inchiostro può assorbire la luce rimanendo visibile, mentre l'altro può rifletterla o diventare trasparente (luminescenza). Questo permette di rivelare istantaneamente se una cifra o una firma è stata aggiunta in un secondo momento con una penna diversa.
2. **Fluorescenza Ultravioletta (UV)**: Utilizzata principalmente per rilevare abrasioni chimiche (es. cancellature effettuate con solventi) o abrasioni meccaniche (es. raschiature della carta con lamette). La sollecitazione UV evidenzia la rottura delle fibre della carta e l'alterazione del trattamento superficiale gelatinoso del foglio, svelando cosa vi era scritto in origine.

#### La Datazione dell'Inchiostro: L'Analisi Chimica del Solvente

Una delle domande più frequenti poste ai periti documentali è: *"Questo testo è stato scritto realmente nella data indicata sul foglio?"*

La datazione assoluta degli inchiostri è una delle sfide più complesse della chimica forense. Si basa sullo studio dell'evaporazione dei solventi contenuti negli inchiostri delle penne a sfera (principalmente il **2-fenossietanolo** o 2-PE).

Quando scriviamo, l'inchiostro si deposita sulla carta e il solvente inizia a evaporare. Nei primi mesi il tasso di evaporazione è rapidissimo, per poi rallentare progressivamente e stabilizzarsi dopo circa 18-24 mesi. Attraverso micro-prelievi di inchiostro (effettuati con aghi sottilissimi che non danneggiano la leggibilità del testo) analizzati tramite gascromatografia-spettrometria di massa (GC-MS), è possibile determinare la quantità residua di solvente e stabilire con buona approssimazione se il documento è stato firmato recentemente o se risale effettivamente a diversi anni prima.

#### L'Importanza della Consulenza Tecnica Preventiva

Disporre di un parere tecnico preventivo, solido e documentato da grafici spettroscopici e immagini microscopiche a colori, permette agli avvocati di impostare una strategia processuale vincente o di spingere la controparte verso una transazione favorevole prima ancora di intraprendere una lunga e costosa battaglia legale.`,
      en: `### Verification of Document Authenticity

In legal, commercial, and civil disputes, the forgery of physical paper documents is an unfortunately widespread phenomenon. Signatures added after the fact, altered figures on contracts or bills, texts abusively inserted utilizing blank spaces on pre-signed sheets—these are just some of the cases addressed by the **Elena Angelini Forensic Criminology Studio**.

Using advanced technological instruments and non-destructive optical spectroscopy methodologies, our studio is capable of unmasking document forgery and alterations with absolute scientific rigor.

#### Revealing the Invisible: Infrared (IR) and Ultraviolet (UV) Analysis

The first step in detecting an alteration or abusive insertion consists of multispectral optical analysis:

1. **Infrared (IR) Reflectance and Luminescence**: Inks that look identical to the naked eye (for instance, two black ballpoint pens of the exact same color) often possess completely different chemical compositions. By illuminating the document with selected wavelengths in the infrared band, one ink may absorb the light remaining visible, while the other might reflect it or become transparent. This instantly reveals if a digit or signature was added later with a different pen.
2. **Ultraviolet (UV) Fluorescence**: Primarily used to detect chemical erasures (e.g., using solvents) or mechanical abrasions (e.g., scraping paper with razor blades). UV light highlights the breaking of paper fibers and alterations to the sheet's surface coating, uncovering what was originally written underneath.

#### Ink Dating: Chemical Analysis of Solvent

One of the most frequent questions asked of document experts is: *"Was this text actually written on the date marked on the sheet?"*

Absolute dating of ink is one of the most complex challenges in forensic chemistry. It relies on studying the evaporation of solvents contained in ballpoint pen inks (principally **2-phenoxyethanol** or 2-PE).

When writing, the ink deposits on the paper and the solvent begins to evaporate. In the first few months, the evaporation rate is extremely fast, then progressively slows down and stabilizes after about 18–24 months. Through micro-sampling of ink (performed with ultra-thin punches that do not damage document readability) analyzed via gas chromatography-mass spectrometry (GC-MS), it is possible to measure the remaining solvent and establish with good accuracy whether the document was signed recently or if it actually dates back several years.

#### The Importance of Preliminary Technical Consultation

Having a preliminary technical opinion, backed by spectroscopic graphs and microscopic high-resolution images, allows defense lawyers to build a winning trial strategy or guide the opposition toward a highly favorable settlement before entering a long and expensive court battle.`
    },
    date: '05 Luglio 2026',
    readTime: '5 min',
    author: 'Elena Angelini',
    imageAlt: 'Multispectral document analysis under ultraviolet light'
  }
];

interface BlogProps {
  lang: Language;
  onNavigateToContact: () => void;
}

export default function Blog({ lang, onNavigateToContact }: BlogProps) {
  const contentLang = lang === 'it' ? 'it' : 'en';

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

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const categories = useMemo(() => {
    return lang === 'it' 
      ? ['Tutti', 'Grafologia Forense', 'Criminalistica', 'Criminologia', 'Analisi Documentale']
      : ['All', 'Forensic Graphology', 'Criminalistics', 'Criminology', 'Document Analysis'];
  }, [lang]);

  const categoryMapITtoEN = (cat: string): string => {
    switch(cat) {
      case 'Tutti': return 'All';
      case 'Grafologia Forense': return 'Forensic Graphology';
      case 'Criminalistica': return 'Criminalistics';
      case 'Criminologia': return 'Criminology';
      case 'Analisi Documentale': return 'Document Analysis';
      default: return cat;
    }
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Category Filter
      const normalizedCategory = activeCategory === 'Tutti' || activeCategory === 'All' ? 'All' : activeCategory;
      const postCatEN = post.category.en;
      const postCatIT = post.category.it;
      
      const categoryMatch = normalizedCategory === 'All' || 
                            postCatEN === categoryMapITtoEN(activeCategory) || 
                            postCatIT === activeCategory;

      // Search Query Filter
      const textToSearch = `${post.title[contentLang]} ${post.excerpt[contentLang]} ${post.category[contentLang]}`.toLowerCase();
      const searchMatch = textToSearch.includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, lang]);

  const selectedPost = useMemo(() => {
    return blogPosts.find(p => p.id === selectedPostId);
  }, [selectedPostId]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() === '') return;
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  };

  // Render text containing markdown headers and bullet points nicely
  const renderContentText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h2 
            key={index} 
            className="text-lg md:text-xl font-bold text-slate-100 tracking-tight pt-4 pb-2 font-serif border-b border-slate-900/40"
          >
            {paragraph.replace('### ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('#### ')) {
        return (
          <h3 
            key={index} 
            className="text-sm font-extrabold text-cyan-400 tracking-wider uppercase pt-4 pb-1 font-mono"
          >
            {paragraph.replace('#### ', '')}
          </h3>
        );
      }
      if (paragraph.includes('\n- ') || paragraph.includes('\n1. ')) {
        // Render a list
        const lines = paragraph.split('\n');
        const listItems = lines.map((line, lIdx) => {
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <li key={lIdx} className="text-xs text-slate-400 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-cyan-500">
                {line.substring(2)}
              </li>
            );
          }
          const matchNum = line.match(/^(\d+)\.\s(.*)/);
          if (matchNum) {
            return (
              <li key={lIdx} className="text-xs text-slate-400 list-decimal list-inside marker:text-cyan-500 marker:font-bold">
                <span className="font-bold text-slate-300">{matchNum[2].split(':')[0]}:</span>
                {matchNum[2].substring(matchNum[2].indexOf(':') + 1 || 0)}
              </li>
            );
          }
          return <p key={lIdx} className="text-xs text-slate-400">{line}</p>;
        });
        return (
          <ul key={index} className="space-y-2 py-2">
            {listItems}
          </ul>
        );
      }
      return (
        <p key={index} className="text-xs text-slate-400 leading-relaxed text-justify">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="space-y-12">
      
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-900/60 p-6 md:p-8 select-none shadow-xl scanlines">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Newspaper className="w-48 h-48 text-cyan-500" />
        </div>
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-cyan-950/40 border border-cyan-900/40 rounded-full text-[9px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
            <span>{lang === 'it' ? 'ARCHIVIO PUBBLICAZIONI' : 'PUBLICATION ARCHIVE'}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight">
            {renderDoubleColor(lang === 'it' ? 'Forensic Insight & News' : 'Forensic Insights & News')}
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            {lang === 'it' 
              ? 'Approfondimenti scientifici, perizie e pubblicazioni tecniche curate dallo Studio Elena Angelini. Scopri come l\'innovazione tecnologica e i protocolli scientifici supportano la difesa legale.'
              : 'Scientific insights, appraisals, and technical papers curated by Elena Angelini Forensic Studio. Discover how technological innovation and scientific protocols safeguard legal defense.'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPostId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT MAIN COL: POSTS FILTER & GRID */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* FILTER BAR & SEARCH */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 border border-slate-900/50 p-4 rounded-xl shadow-md">
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder={lang === 'it' ? 'Cerca articoli...' : 'Search articles...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyan-500/50 text-slate-200 pl-9 pr-4 py-1.5 rounded-lg text-xs placeholder-slate-500 outline-none transition-all font-sans"
                  />
                </div>

                {/* Categories Scrollable Pills */}
                <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-serif font-bold whitespace-nowrap transition-all uppercase tracking-wider cursor-pointer ${
                          isActive 
                            ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md' 
                            : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* POSTS GRID */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-950/40 border border-slate-900/80 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-cyan-500/30 transition-all group group-hover:shadow-cyan-950/10"
                    >
                      {/* Post body */}
                      <div className="p-5 space-y-4">
                        {/* Meta Category & Readtime */}
                        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-500 select-none">
                          <span className="text-cyan-400/80 font-bold flex items-center space-x-1">
                            <Tag className="w-2.5 h-2.5 shrink-0" />
                            <span>{post.category[contentLang]}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-2.5 h-2.5 shrink-0" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-serif font-bold text-slate-200 tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                          {post.title[contentLang]}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-[11px] text-slate-400 leading-relaxed text-justify line-clamp-3">
                          {post.excerpt[contentLang]}
                        </p>
                      </div>

                      {/* Post Footer Action */}
                      <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-900/80 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-500 flex items-center space-x-1 select-none">
                          <Calendar className="w-2.5 h-2.5 shrink-0" />
                          <span>{post.date}</span>
                        </span>
                        
                        <button
                          onClick={() => setSelectedPostId(post.id)}
                          className="text-[10px] font-serif font-bold tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer focus:outline-none uppercase"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          <span>{lang === 'it' ? 'Leggi Articolo' : 'Read Article'}</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-950/30 border border-slate-900/60 rounded-xl p-12 text-center space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">
                    {lang === 'it' ? 'Nessun articolo trovato con i criteri di ricerca' : 'No articles found matching search criteria'}
                  </p>
                </div>
              )}

            </div>

            {/* RIGHT SIDEBAR: ANNOUNCEMENTS & NEWSLETTER */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* STUDIO NEWS / RECENT EVENTS */}
              <div className="bg-slate-950 border border-slate-900/60 rounded-xl p-5 space-y-5 shadow-lg relative overflow-hidden scanlines">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center space-x-2 select-none">
                    <Newspaper className="w-4 h-4 text-cyan-500" />
                    <h2 
                      className="text-xs font-bold tracking-widest text-slate-200 font-serif uppercase"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {lang === 'it' ? 'STUDIO NEWS' : 'STUDIO NEWS'}
                    </h2>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                </div>

                <div className="space-y-4">
                  {newsData.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3 rounded-lg border text-left space-y-1.5 transition-all ${
                        item.isAlert 
                          ? 'bg-cyan-950/15 border-cyan-950/40 text-slate-300' 
                          : 'bg-slate-900/10 border-slate-900/30 text-slate-400 hover:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 select-none">
                        <span>{item.date}</span>
                        {item.isAlert && (
                          <span className="text-[7px] font-bold tracking-widest text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-900/30">
                            ALERT
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] leading-relaxed font-sans font-medium text-slate-300">
                        {item.title[contentLang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECHNICAL BLOG NEWSLETTER */}
              <div className="bg-slate-950 border border-slate-900/60 rounded-xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center space-x-2 text-left border-b border-slate-900 pb-3 select-none">
                  <Bell className="w-4 h-4 text-cyan-500" />
                  <h2 
                    className="text-xs font-bold tracking-widest text-slate-200 font-serif uppercase"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {lang === 'it' ? 'RICEVI AGGIORNAMENTI' : 'RECEIVE UPDATES'}
                  </h2>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed text-left">
                  {lang === 'it' 
                    ? 'Iscriviti per ricevere studi di caso forensi dettagliati, perizie commentate e aggiornamenti sui protocolli scientifici.'
                    : 'Subscribe to receive detailed forensic case studies, annotated expert witness reports, and updates on scientific protocols.'}
                </p>

                {newsletterStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-cyan-950/30 border border-cyan-900/30 rounded-lg text-center"
                  >
                    <p className="text-[10px] font-bold text-cyan-400">
                      {lang === 'it' ? '✓ ISCRIZIONE EFFETTUATA!' : '✓ SUCCESSFULLY SUBSCRIBED!'}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      {lang === 'it' ? 'Grazie per il tuo interesse scientifico.' : 'Thank you for your scientific interest.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <input
                      type="email"
                      required
                      placeholder={lang === 'it' ? 'Inserisci la tua email...' : 'Enter your email address...'}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 text-slate-200 px-3 py-2 rounded-lg text-xs outline-none transition-all font-sans"
                    />
                    <button
                      type="submit"
                      className="w-full bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 hover:bg-slate-900/80 font-serif font-bold text-[10px] py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer uppercase tracking-wider"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <span>{lang === 'it' ? 'Iscriviti Ora' : 'Subscribe Now'}</span>
                      <Send className="w-3 h-3 shrink-0" />
                    </button>
                  </form>
                )}
              </div>

              {/* TECHNICAL NOTE SHIELD */}
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2 text-left">
                <div className="flex items-center space-x-1.5 text-cyan-500/80 font-bold uppercase tracking-wider text-[8px] font-mono">
                  <ShieldAlert className="w-3 h-3 shrink-0" />
                  <span>SECURE CHANNEL DISCLAIMER</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed font-mono">
                  {lang === 'it'
                    ? 'Le pubblicazioni sul blog hanno finalità scientifica ed informativa. Nessun dato sensibile relativo ai casi processuali correnti viene divulgato nel rispetto del segreto istruttorio.'
                    : 'Blog publications are for educational and scientific purposes. No sensitive data concerning active judicial cases is disclosed, in strict compliance with professional secrecy.'}
                </p>
              </div>

            </div>
          </motion.div>
        ) : (
          /* SINGLE ARTICLE READER */
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-slate-950 border border-slate-900/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col scanlines"
          >
            {/* Header / HUD Navigation */}
            <div className="bg-slate-950 border-b border-slate-900 px-6 py-4 flex justify-between items-center select-none shrink-0">
              <button
                onClick={() => setSelectedPostId(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-serif font-bold uppercase tracking-wider flex items-center space-x-1.5 focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'it' ? 'Torna all\'archivio' : 'Back to archive'}</span>
              </button>

              <div className="text-[9px] font-mono text-cyan-500/60 uppercase tracking-widest hidden sm:block">
                SYS_ARTICLE_ID // {selectedPost?.id.toUpperCase()}
              </div>
            </div>

            {/* Article Content Layout */}
            <div className="p-6 md:p-10 space-y-6">
              {/* Category, Date & Read Time Meta */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-900/60 pb-4 select-none">
                <span className="text-cyan-400 font-bold bg-cyan-950/30 border border-cyan-900/30 px-2.5 py-1 rounded">
                  {selectedPost?.category[contentLang]}
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>{selectedPost?.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{selectedPost?.readTime}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3 shrink-0" />
                  <span>{selectedPost?.author}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight leading-tight text-left">
                {selectedPost && renderDoubleColor(selectedPost.title[contentLang])}
              </h1>

              {/* Big blockquote / excerpt */}
              <div className="p-4 bg-slate-900/10 border-l-2 border-cyan-500 rounded-r-lg text-left">
                <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed text-justify">
                  "{selectedPost?.excerpt[contentLang]}"
                </p>
              </div>

              {/* Main text content body */}
              <div className="space-y-4 max-w-none text-left font-sans">
                {selectedPost && renderContentText(selectedPost.content[contentLang])}
              </div>

              <hr className="border-slate-900 my-8" />

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-[10px] font-mono text-slate-500 select-none text-center sm:text-left">
                  {lang === 'it' 
                    ? '© Studio Criminalistica Elena Angelini - Riproduzione riservata.' 
                    : '© Elena Angelini Forensic Studio - All rights reserved.'}
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedPostId(null)}
                    className="w-full sm:w-auto px-4 py-2 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white rounded hover:bg-slate-900/50 transition-all cursor-pointer font-serif uppercase tracking-wider text-center"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {lang === 'it' ? 'Chiudi Lettura' : 'Close Article'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPostId(null);
                      onNavigateToContact();
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-bold text-[10px] rounded hover:from-cyan-500 hover:to-cyan-400 shadow-lg shadow-cyan-950/20 active:scale-95 transition-all cursor-pointer font-serif uppercase tracking-wider text-center"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span>{lang === 'it' ? 'Consulenza sul Caso' : 'Case Consultation'}</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
