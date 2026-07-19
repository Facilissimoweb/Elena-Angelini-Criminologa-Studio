import { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Search, 
  BookOpen, 
  MapPin, 
  Calendar, 
  ArrowRight,
  ShieldAlert,
  UserCheck,
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { motion } from 'motion/react';

interface PortfolioProps {
  lang: Language;
  onNavigateToContact: () => void;
}

type PortfolioCategory = 'all' | 'consulenza' | 'formazione' | 'ricerca' | 'pubblicazioni';

interface PortfolioItem {
  id: string;
  category: 'consulenza' | 'formazione' | 'ricerca' | 'pubblicazioni';
  date: {
    it: string;
    en: string;
  };
  title: {
    it: string;
    en: string;
  };
  description: {
    it: string;
    en: string;
  };
  bullets?: {
    it: string;
    en: string;
  }[];
}

export default function Portfolio({ lang, onNavigateToContact }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<PortfolioCategory>('all');
  const isIt = lang === 'it' || !lang;

  // Translation helpers
  const t = {
    title: isIt ? 'Portfolio Professionale' : 'Professional Portfolio',
    subtitle: isIt ? 'Esperienze, Consulenze, Formazione e Ricerca' : 'Experiences, Consulting, Training & Research',
    criminology: isIt ? 'Criminologia' : 'Criminology',
    criminalistics: isIt ? 'Criminalistica' : 'Criminalistics',
    forensics: isIt ? 'Scienze Forensi' : 'Forensic Sciences',
    quoteTitle: isIt ? 'Studio Criminalistica di Elena Angelini' : 'Criminalistics Studio of Elena Angelini',
    quoteLine1: isIt ? 'Una cicala potrebbe impiegare 17 anni a schiudersi...' : 'A cicada might take 17 years to hatch...',
    quoteLine2: isIt ? "...così come l'eventuale emergere dei fatti di un delitto." : '...just like the eventual emergence of the facts of a crime.',
    aboutTitle: isIt ? 'La Consulente Elena Angelini' : 'The Consultant Elena Angelini',
    aboutLine1: isIt ? 'Alla sinergica collaborazione di aziende, studi legali e altri professionisti di ambito criminologico ha affiancato la sensibilità coltivata nel supporto alle vittime di stalking e mobbing.' : 'Alongside synergistic collaboration with companies, law firms and other criminology professionals, she offers deep sensitivity cultivated through supporting victims of stalking and mobbing.',
    aboutLine2: isIt ? 'Mette a disposizione la propria esperienza e conoscenza per la difesa e la parte civile nei procedimenti penali e per le associazioni e gli enti di prevenzione del crimine e della violenza.' : 'She puts her experience and knowledge at the disposal of defense teams and plaintiffs in criminal proceedings, as well as associations and entities for the prevention of crime and violence.',
    tabAll: isIt ? 'Tutte le attività' : 'All Activities',
    tabConsulenza: isIt ? 'Consulenza' : 'Advisory & Consulting',
    tabFormazione: isIt ? 'Formazione' : 'Training & Lectures',
    tabRicerca: isIt ? 'Ricerca' : 'Scientific Research',
    tabPubblicazioni: isIt ? 'Pubblicazioni' : 'Publications',
    officeTitle: isIt ? 'Il nostro ufficio' : 'Our Office',
    officeText: isIt ? 'Si riceve solo su appuntamento presso Arbor Vitae, Via Fabio Filzi 9 - 47923 Rimini ITALY' : 'Visits strictly by appointment at Arbor Vitae, Via Fabio Filzi 9 - 47923 Rimini ITALY',
    officeCta: isIt ? 'Prenota un colloquio conoscitivo' : 'Schedule a preliminary call',
  };

  const portfolioItems: PortfolioItem[] = [
    // --- CONSULENZA ---
    {
      id: 'c1',
      category: 'consulenza',
      date: {
        it: 'Ottobre 2023',
        en: 'October 2023'
      },
      title: {
        it: 'Progettazione partecipata ex Quartiere 4, Rimini',
        en: 'Participatory design of the former District 4, Rimini'
      },
      description: {
        it: "Partecipa alla progettazione partecipata dell'ex Quartiere 4, Rimini, puntando sulla continuità delle attività di capacitazione delle persone portate avanti dai collettivi e dalle associazioni locali (relazione socio-criminologica disponibile su Academia).",
        en: 'Participated in the participatory design of the former District 4 in Rimini, focusing on the continuity of capability-building activities led by local collectives and associations (sociocriminological report available on Academia).'
      }
    },
    {
      id: 'c2',
      category: 'consulenza',
      date: {
        it: 'Settembre - Novembre 2022',
        en: 'September - November 2022'
      },
      title: {
        it: 'Avvio del Protocollo Zeus a Rimini',
        en: 'Launch of the Zeus Protocol in Rimini'
      },
      description: {
        it: 'Insieme alla Dottoressa Ilaria Laghi e CIPM (Centro Italiano per la Promozione della Mediazione), avvia il Protocollo Zeus tra il CIPM e la Questura di Rimini, volto alla prevenzione della violenza e al recupero dei soggetti maltrattanti.',
        en: 'Together with Dr. Ilaria Laghi and CIPM (Italian Center for the Promotion of Mediation), initiated the Zeus Protocol between CIPM and the Rimini Police Headquarters, focusing on violence prevention and treatment for offenders.'
      }
    },
    {
      id: 'c3',
      category: 'consulenza',
      date: {
        it: 'Settembre - Novembre 2022',
        en: 'September - November 2022'
      },
      title: {
        it: 'Profilazione digitale e stalking',
        en: 'Digital behavior analysis and stalking'
      },
      description: {
        it: 'Insieme alla Dottoressa Sara Bardi ricostruisce il comportamento digitale e stila il profilo di uno stalker (procedimento in corso).',
        en: 'Together with Dr. Sara Bardi, reconstructed the digital footprints and compiled a psychological profile of an active cyberstalker (proceedings ongoing).'
      }
    },
    {
      id: 'c4',
      category: 'consulenza',
      date: {
        it: 'Da Gennaio 2022',
        en: 'Since January 2022'
      },
      title: {
        it: 'Pool difensivo per il caso Federico Carnicci',
        en: 'Defense team for the Federico Carnicci case'
      },
      description: {
        it: 'Insieme alla Dottoressa Sara Bardi partecipa al Pool difensivo per richiedere la riapertura del caso concernente la morte di Federico Carnicci, avvenuta a Roma nel 2015.',
        en: 'Together with Dr. Sara Bardi, joined the defense pool to request the reopening of the cold case regarding the death of Federico Carnicci (Rome, 2015).'
      }
    },
    {
      id: 'c5',
      category: 'consulenza',
      date: {
        it: 'Dal 10 Maggio 2022',
        en: 'Since May 10, 2022'
      },
      title: {
        it: 'Supporto gratuito con Autodifesa Transfemminista',
        en: 'Pro-bono collaboration with Autodifesa Transfemminista'
      },
      description: {
        it: "Collaborazione a titolo gratuito con AUTODIFESA TRANSFEMMINISTA (Pride OFF, Non Una di Meno e Casa Madiba di Rimini) per l'accoglienza e il supporto legale-criminologico delle vittime di violenza.",
        en: 'Pro-bono cooperation with AUTODIFESA TRANSFEMMINISTA (Pride OFF, Non Una di Meno and Casa Madiba in Rimini) offering support and advice to victims of gender-based violence.'
      }
    },
    {
      id: 'c6',
      category: 'consulenza',
      date: {
        it: 'Settembre 2021 - Ottobre 2022',
        en: 'September 2021 - October 2022'
      },
      title: {
        it: 'Pool difensivo per serie di incendi a Grosseto',
        en: 'Defense team for serial arson accusations'
      },
      description: {
        it: 'Insieme alla Dottoressa Sara Bardi e all’Avvocato Fornaciari Chittoni, partecipa al Pool difensivo di V. M. in relazione all’imputazione di 50 incendi boschivi e rurali verificatisi a Grosseto negli anni 2016-2017.',
        en: 'In partnership with Dr. Sara Bardi and Attorney Fornaciari Chittoni, worked on the defense team of V. M. accused of 50 forest and rural arson counts in Grosseto during 2016-2017.'
      }
    },
    {
      id: 'c7',
      category: 'consulenza',
      date: {
        it: 'Ottobre - Novembre 2021',
        en: 'October - November 2021'
      },
      title: {
        it: 'Consulenza stragiudiziale per omicidio (Rimini)',
        en: 'Extrajudicial consulting for homicide (Rimini)'
      },
      description: {
        it: 'Consulenza stragiudiziale tecnica per G. L., in merito a un caso di omicidio avvenuto a Rimini nel 2020.',
        en: 'Extrajudicial technical consultancy for G. L. regarding a homicide case occurred in Rimini in 2020.'
      }
    },
    {
      id: 'c8',
      category: 'consulenza',
      date: {
        it: 'Settembre 2021',
        en: 'September 2021'
      },
      title: {
        it: 'Progetto SAIV, Sportelli DIANA e ZEUS',
        en: 'SAIV Project, DIANA & ZEUS desks'
      },
      description: {
        it: 'Presentazione del “Progetto SAIV, Sportelli DIANA e ZEUS contro la violenza”, elaborato in collaborazione con la Dott.ssa Sara Bardi in occasione delle elezioni comunali di Grosseto per la prevenzione della violenza domestica e di genere.',
        en: 'Presented the "SAIV Project, DIANA and ZEUS support desks against violence" compiled with Dr. Sara Bardi for the Grosseto local municipal policies.'
      }
    },
    {
      id: 'c9',
      category: 'consulenza',
      date: {
        it: 'Da Gennaio 2019',
        en: 'Since January 2019'
      },
      title: {
        it: 'Collaborazione con Forensic Consultants Associates',
        en: 'Partnership with Forensic Consultants Associates'
      },
      description: {
        it: 'Collaborazione attiva sul territorio e in procedimenti tecnici complessi con Forensic Consultants Associates, insieme alle dottoresse Ilaria Laghi e Daniela Cavuoto.',
        en: 'Active ongoing partnership in complex technical cases with Forensic Consultants Associates, with Dr. Ilaria Laghi and Dr. Daniela Cavuoto.'
      }
    },
    {
      id: 'c10',
      category: 'consulenza',
      date: {
        it: 'Ottobre 2018',
        en: 'October 2018'
      },
      title: {
        it: 'Graduatoria Esperto Criminologo Clinico ex art. 80',
        en: 'Ranking as Expert Clinical Criminologist under Art. 80'
      },
      description: {
        it: 'Inserimento in graduatoria come Esperto Criminologo clinico ex. art. 80 Legge 354/75 per gli istituti penitenziari dell’Emilia-Romagna e delle Marche.',
        en: 'Achieved ranking as Expert Clinical Criminologist under art. 80 Law 354/75 for correctional institutions across Emilia-Romagna and Marche.'
      }
    },
    {
      id: 'c11',
      category: 'consulenza',
      date: {
        it: 'Da Novembre 2014',
        en: 'Since November 2014'
      },
      title: {
        it: 'PROGETTO PROMETEO: Sportello Antiviolenza',
        en: 'PROMETEO PROJECT: Support Desk'
      },
      description: {
        it: 'Avvio e coordinamento del PROGETTO PROMETEO: Sportello di ascolto e orientamento contro Violenza, Mobbing, Stalking e Bullismo rivolto a donne e uomini, attivo a Rimini presso il centro Arbor Vitae.',
        en: 'Initiated and coordinated the PROMETEO PROJECT: support desk dealing with violence, mobbing, stalking, and bullying for all genders, hosted at Arbor Vitae in Rimini.'
      }
    },

    // --- FORMAZIONE ---
    {
      id: 'f1',
      category: 'formazione',
      date: {
        it: '14 Ottobre 2023',
        en: '14 October 2023'
      },
      title: {
        it: 'Settimana della Sociologia 2023',
        en: 'Sociology Week 2023'
      },
      description: {
        it: 'Relatrice al workshop online "Il Mestiere del Sociologo in Criminologia" trasmesso in diretta sul canale YouTube, analizzando le potenzialità della Sociologia nell\'investigare le reti sociali (Hachen, 2018) e le dinamiche di potere (Gordon, 2022).',
        en: 'Speaker at the online workshop "The Career of the Sociologist in Criminology" broadcast live on YouTube, focusing on social networks (Hachen, 2018) and power dynamics (Gordon, 2022) in criminology.'
      },
      bullets: [
        {
          it: 'Analisi sul ruolo del Criminologo di formazione sociologica nei confronti di PM, avvocati e investigatori.',
          en: 'Analyzed the sociological criminologist profile cooperating with prosecutors, defense lawyers, and private eyes.'
        },
        {
          it: 'Spiegazione teorico-pratica di una consulenza di analisi criminale sociologica e workshop di 6 ore.',
          en: 'Practical overview of criminological consulting during a highly targeted 6-hour online workshop.'
        }
      ]
    },
    {
      id: 'f2',
      category: 'formazione',
      date: {
        it: '24 Novembre 2022',
        en: '24 November 2022'
      },
      title: {
        it: 'Audizione al Consiglio Comunale di Rimini',
        en: 'Hearing at the Rimini Municipal Council'
      },
      description: {
        it: "Audizione ufficiale presso il Consiglio Comunale di Rimini in merito all'attivazione del Protocollo Zeus e all'efficacia delle misure di ammonimento del Questore nei casi di stalking e violenza domestica.",
        en: 'Official expert hearing at the City Council of Rimini regarding the deployment of the Zeus Protocol and the efficacy of police warnings in domestic violence.'
      }
    },
    {
      id: 'f3',
      category: 'formazione',
      date: {
        it: '22 Novembre 2021',
        en: '22 November 2021'
      },
      title: {
        it: 'Formazione Arbor Vitae su Stalking e Relazioni Abusive',
        en: 'Arbor Vitae internal training on abuse and stalking'
      },
      description: {
        it: 'Corso di formazione interna online rivolto ai professionisti di Arbor Vitae intitolato "Stalking e relazioni abusive: red flags e delicatezza della relazione di aiuto".',
        en: 'Conducted an online internal training course for clinicians and psychologists regarding abusive dynamics, relationship red flags, and help-relationship protocols.'
      }
    },
    {
      id: 'f4',
      category: 'formazione',
      date: {
        it: 'Agosto - Settembre 2021',
        en: 'August - September 2021'
      },
      title: {
        it: 'Docenza AICIS per Zero Academy',
        en: 'AICIS lectures for Zero Academy'
      },
      description: {
        it: 'Co-relatrice con la Dott.ssa Ilaria Laghi per Zero Academy per il corso nazionale AICIS su “Giustizia Riparativa e Mediazione Penale”, curando i moduli relativi a “Nozioni di Vittimologia” e “Strumenti della Giustizia riparativa”.',
        en: 'Co-lecturer with Dr. Ilaria Laghi for Zero Academy on the national AICIS curriculum "Restorative Justice and Criminal Mediation", focusing on Victimology.'
      }
    },
    {
      id: 'f5',
      category: 'formazione',
      date: {
        it: '7 Aprile 2021',
        en: '7 April 2021'
      },
      title: {
        it: 'Le tecniche di interrogatorio - Associazione Primola',
        en: 'Interrogation techniques - Primola Association'
      },
      description: {
        it: 'Co-relatrice al corso specialistico di Criminologia per l’Associazione Primola (Imola, online) sul tema cardine de “Le tecniche di interrogatorio”.',
        en: 'Co-lecturer at the Criminology series of Primola Association (Imola, online) analyzing forensic interrogation techniques.'
      }
    },
    {
      id: 'f6',
      category: 'formazione',
      date: {
        it: '28 Novembre 2020',
        en: '28 November 2020'
      },
      title: {
        it: 'Le Radici della violenza - Convegno Nazionale',
        en: 'The Roots of Violence - National Conference'
      },
      description: {
        it: "Relatrice accreditata sul tema “Le Radici della violenza” al convegno nazionale intitolato “Storie di violenza e storie di rinascita”, organizzato online in cooperazione con l’Università di Pisa e il CAFRE.",
        en: 'Keynote speaker on "The Roots of Violence" at the academic conference organized online in collaboration with the University of Pisa and CAFRE.'
      }
    },
    {
      id: 'f7',
      category: 'formazione',
      date: {
        it: '25 Novembre 2017',
        en: '25 November 2017'
      },
      title: {
        it: 'Io non sono tua - Butterfly Riccione',
        en: 'Io non sono tua (I am not yours) - Riccione'
      },
      description: {
        it: 'Relatrice al convegno pubblico “Io non sono tua” incentrato sul contrasto alla violenza di genere, organizzato dall’associazione Butterfly presso il Palazzo del Turismo di Riccione.',
        en: 'Panel speaker on public gender-violence awareness at the tourism palace in Riccione, organized by Butterfly association.'
      }
    },
    {
      id: 'f8',
      category: 'formazione',
      date: {
        it: '18 Novembre 2017',
        en: '18 November 2017'
      },
      title: {
        it: 'La violenza domestica omosessuale e sindrome di Procne',
        en: 'Domestic violence in same-sex couples'
      },
      description: {
        it: 'Relatrice alla presentazione del volume di Gloria Mazzeo “GELOSA-MENTE. Riflessioni per conoscere, educare, prevenire” a Riccione, con un intervento specialistico incentrato su “La sindrome di Procne e la violenza domestica nelle coppie omosessuali”.',
        en: 'Key speaker at Gloria Mazzeo book presentation, focusing on domestic abuse patterns in same-sex relationships.'
      }
    },
    {
      id: 'f9',
      category: 'formazione',
      date: {
        it: '2016 - 2017',
        en: '2016 - 2017'
      },
      title: {
        it: 'Collaborazione Arcigay Rimini "Alan Turing"',
        en: 'Collaboration with Arcigay Rimini "Alan Turing"'
      },
      description: {
        it: 'Attività seminariale e interventi come relatrice in dibattiti socio-culturali organizzati da Arcigay Rimini:',
        en: 'Keynote speaker and social analyst for multiple debates organized by Arcigay Rimini regarding minority rights and psychology:'
      },
      bullets: [
        {
          it: '2 Aprile 2017: Relatrice al dibattito teatrale post-rappresentazione "Masculu e Fìammina" a Montescudo (RN).',
          en: '2 April 2017: Speaker at the stage debate after "Masculu e Fìammina" representation in Montescudo.'
        },
        {
          it: '12 Dicembre 2016: Relatrice al panel "Cinema e Psicoanalisi: relazioni affettive nel cinema di Ang Lee (Brokeback Mountain)", insieme al Dr. Cottone e alla Dott.ssa Vannini a Sant’Arcangelo di Romagna.',
          en: '12 Dec 2016: Panel analyst on relationship psychological representation in Ang Lee films (Brokeback Mountain) in Santarcangelo.'
        },
        {
          it: '29 Novembre 2016: Relatrice al dibattito sul film "Dallas Buyers Club" con il Circolo Giovani Democratici a Cesena.',
          en: '29 Nov 2016: Debater for the youth association projection of Dallas Buyers Club in Cesena.'
        },
        {
          it: '11 Marzo 2016: Relatrice in merito a "Migrazioni e diritti LGBTI" a Cesena.',
          en: '11 March 2016: Presenter on LGBTI migration issues and psychological assistance in Cesena.'
        }
      ]
    },
    {
      id: 'f10',
      category: 'formazione',
      date: {
        it: 'Gennaio - Marzo 2015',
        en: 'January - March 2015'
      },
      title: {
        it: 'Docenza Comunicazione e Negoziazione Iscom-ER',
        en: 'Communications & Negotiation teacher for Iscom-ER'
      },
      description: {
        it: 'Docente incaricata per l’insegnamento delle materie “Comunicazione professionale e Stili negoziali” per Iscom-ER, all’interno del percorso formativo obbligatorio per Apprendisti.',
        en: 'Appointed teacher of workplace professional communication and advanced negotiation styles for Iscom-ER corporate training tracks.'
      }
    },

    // --- RICERCA ---
    {
      id: 'r1',
      category: 'ricerca',
      date: {
        it: 'Da Settembre 2022',
        en: 'Since September 2022'
      },
      title: {
        it: 'Analisi incidenti stradali per ASAPS & IlCentauro',
        en: 'Road accidents reports for ASAPS'
      },
      description: {
        it: 'Collaborazione attiva con ASAPS (Associazione Sostenitori ed Amici della Polizia Stradale) per la rivista scientifico-professionale IlCentauro (Sapidata Editore), curando la reportistica statistica ed empirica sugli incidenti stradali su scala nazionale.',
        en: 'Collaborator with ASAPS (Road Police Friends Association) for the specialized journal "IlCentauro", processing and writing data-driven analytical reports on national traffic accidents.'
      }
    },
    {
      id: 'r2',
      category: 'ricerca',
      date: {
        it: 'Gennaio 2020 - Luglio 2021',
        en: 'January 2020 - July 2021'
      },
      title: {
        it: 'Progetto "Dal focolare al mondo" (Regione ER)',
        en: 'Regional research "From fireplace to the world"'
      },
      description: {
        it: 'Ricercatrice sul campo e co-curatrice editoriale dell’indagine sociologica finanziata dalla Regione Emilia-Romagna tramite l’associazione “Per Le Donne”, volta ad esaminare la qualità della vita e i carichi di lavoro delle donne lavoratrici nel territorio circondariale imolese.',
        en: 'Field researcher and co-editor of the sociological study funded by Emilia-Romagna Region via "Per Le Donne" association, measuring the quality of life and work overload of working women in the Imola region.'
      }
    },
    {
      id: 'r3',
      category: 'ricerca',
      date: {
        it: 'Giugno - Novembre 2017',
        en: 'June - November 2017'
      },
      title: {
        it: 'Start Up e analisi di mercato (Rimini)',
        en: 'Vapor industry start-up market research'
      },
      description: {
        it: 'Elaborazione del progetto di impresa e conduzione di una approfondita ricerca di mercato sul settore della sigaretta elettronica e dei relativi riflessi sociali ed economici sul territorio, ottenendo finanziamento d’impresa agevolato in sinergia con Banca Etica e Primo Miglio.',
        en: 'Designed an innovative business plan supported by a deep micro-economic and social market research on vaporizers, securing specialized green funding from Banca Etica.'
      }
    },

    // --- PUBBLICAZIONI ---
    {
      id: 'p_pub1',
      category: 'pubblicazioni',
      date: {
        it: 'Settembre 2021',
        en: 'September 2021'
      },
      title: {
        it: 'Competizione aziendale ed evoluzione delle dinamiche lavorative',
        en: 'Corporate competition and work dynamics evolution'
      },
      description: {
        it: 'Autrice del saggio accademico “Competizione funzionale e disfunzionale all’interno dell’azienda. Due casi” inserito nel volume a cura di Serena Gianfaldoni "Competizione funzionale e disfunzionale. Le radici della competizione e l\'esercizio in ambito lavorativo", Collana Risorse Umane n.8, Master Risorse Umane CAFRE, Università di Pisa.',
        en: 'Author of the paper "Functional and dysfunctional competition inside the firm: Two case studies" published by Pisa University (CAFRE HR series #8).'
      }
    },
    {
      id: 'p_pub2',
      category: 'pubblicazioni',
      date: {
        it: 'Gennaio 2016',
        en: 'January 2016'
      },
      title: {
        it: 'Psicopatologia sessuale o crimine? - Rivista di Sessuologia',
        en: 'Sexual psychopathology or crime? - Journal of Sexology'
      },
      description: {
        it: 'Co-autrice insieme alla Dottoressa Sara Bardi del saggio scientifico "Psicopatologia sessuale o crimine?" focalizzato sull\'analisi criminologica dei reati sessuali, pubblicato sulla prestigiosa "RIVISTA DI SESSUOLOGIA" (Vol. 39 - n.1/2015) all’interno dello speciale "La violenza sessuale".',
        en: 'Co-authored with Dr. Sara Bardi the clinical article "Sexual psychopathology or crime?" on sexual offense profiling, published in the Italian Journal of Sexology (Vol. 39 - #1/2015).'
      }
    },
    {
      id: 'p_pub3',
      category: 'pubblicazioni',
      date: {
        it: 'Luglio 2007',
        en: 'July 2007'
      },
      title: {
        it: 'I culti distruttivi - Monografia',
        en: 'Destructive cults - Specialized Book'
      },
      description: {
        it: 'Autrice del volume monografico "I culti distruttivi. Il lavoro del consulente di investigazioni e sicurezza per le associazioni di aiuto alle vittime" (Edizioni Il Ponte Vecchio, Cesena), testo di riferimento per gli analisti della devianza cultuale e dei gruppi coercitivi.',
        en: 'Author of the monograph "I culti distruttivi" (The destructive cults: the role of security and investigation advisors for support associations), published by Il Ponte Vecchio (Cesena).'
      }
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'consulenza': return 'border-cyan-500 text-cyan-400 bg-cyan-950/10';
      case 'formazione': return 'border-amber-500 text-amber-400 bg-amber-950/10';
      case 'ricerca': return 'border-emerald-500 text-emerald-400 bg-emerald-950/10';
      case 'pubblicazioni': return 'border-purple-500 text-purple-400 bg-purple-950/10';
      default: return 'border-slate-500 text-slate-400 bg-slate-950/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'consulenza': return <Briefcase className="w-4 h-4" />;
      case 'formazione': return <GraduationCap className="w-4 h-4" />;
      case 'ricerca': return <Search className="w-4 h-4" />;
      case 'pubblicazioni': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-12 py-4 text-slate-300">
      
      {/* Editorial Quote Header / Hero Header Accent */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-4 pb-2">
        <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-cyan-500 uppercase block">
          {t.quoteTitle}
        </span>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
            Elena Angelini
          </h2>
          <div className="flex items-center justify-center space-x-2 text-xs md:text-sm font-mono text-cyan-400 font-medium">
            <span>{t.criminology}</span>
            <span className="text-slate-700">//</span>
            <span>{t.criminalistics}</span>
            <span className="text-slate-700">//</span>
            <span>{t.forensics}</span>
          </div>
        </div>

        {/* The beautiful cicada metaphor requested by client */}
        <div className="bg-slate-950/70 border border-cyan-500/10 rounded-2xl p-6 md:p-8 space-y-4 max-w-2xl mx-auto mt-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
          <p className="text-base md:text-lg font-serif italic text-slate-100 tracking-wide relative z-10">
            "{t.quoteLine1}"
          </p>
          <p className="text-sm md:text-base font-serif italic text-cyan-400/90 tracking-wider relative z-10">
            {t.quoteLine2}
          </p>
          <div className="w-10 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent mx-auto mt-4" />
        </div>
      </div>

      {/* About the consultant details card */}
      <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 md:p-8 space-y-6 max-w-5xl mx-auto relative shadow-xl">
        <div className="absolute top-2.5 right-3 font-mono text-[8px] text-cyan-500/20">
          STATION // CONSULTANT_PROFILE // BIO_V1.0
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-serif font-extrabold text-slate-100 uppercase tracking-wide border-b border-slate-900 pb-2">
              {t.aboutTitle}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              {t.aboutLine1}
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              {t.aboutLine2}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Interactive Portfolio Workstation */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4">
          <div className="text-left">
            <span className="text-[9px] font-mono text-cyan-500 font-bold uppercase tracking-widest block">// REGISTRO ATTIVITÀ</span>
            <h3 className="text-xl font-serif font-extrabold text-white">{isIt ? 'Cronologia delle Attività' : 'Activity Records'}</h3>
          </div>

          {/* Tab switches */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-900 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-cyan-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {t.tabAll}
            </button>
            <button
              onClick={() => setActiveTab('consulenza')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'consulenza' 
                  ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>{t.tabConsulenza}</span>
            </button>
            <button
              onClick={() => setActiveTab('formazione')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'formazione' 
                  ? 'bg-amber-950 border border-amber-500/40 text-amber-300 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>{t.tabFormazione}</span>
            </button>
            <button
              onClick={() => setActiveTab('ricerca')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'ricerca' 
                  ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Search className="w-3 h-3" />
              <span>{t.tabRicerca}</span>
            </button>
            <button
              onClick={() => setActiveTab('pubblicazioni')}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'pubblicazioni' 
                  ? 'bg-purple-950 border border-purple-500/40 text-purple-300 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>{t.tabPubblicazioni}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Activity List / Grid with high-fidelity cyberpunk card timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
              key={item.id}
              className="bg-slate-950/70 border border-slate-900 hover:border-slate-800/80 rounded-xl p-5 md:p-6 text-left relative overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              {/* Colored edge border indicator */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="space-y-4">
                {/* Header row with date and category badge */}
                <div className="flex justify-between items-center relative z-10 pl-2">
                  <span className="text-[9px] font-mono text-slate-500 font-bold tracking-widest flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500/40 shrink-0" />
                    <span>{(isIt ? item.date.it : item.date.en).toUpperCase()}</span>
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border flex items-center space-x-1 ${getCategoryColor(item.category)}`}>
                    {getCategoryIcon(item.category)}
                    <span>{item.category.toUpperCase()}</span>
                  </span>
                </div>

                {/* Content area */}
                <div className="space-y-2 pl-2">
                  <h4 className="text-sm md:text-base font-serif font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {isIt ? item.title.it : item.title.en}
                  </h4>
                  <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-sans">
                    {isIt ? item.description.it : item.description.en}
                  </p>

                  {/* Operational nested details if present */}
                  {item.bullets && item.bullets.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-900 space-y-1.5">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-1.5 text-[10px] font-mono text-slate-500">
                          <span className="text-cyan-500/50 mt-0.5">&bull;</span>
                          <span className="leading-normal">{isIt ? bullet.it : bullet.en}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Office & Appointment Callout */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-950 via-slate-950/70 to-cyan-950/20 border border-cyan-500/10 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl rounded-full" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-left">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-serif font-extrabold text-white uppercase tracking-wide">
                {t.officeTitle}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                {t.officeText}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToContact}
            className="w-full md:w-auto px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-mono font-bold text-xs rounded-lg transition-all shadow-lg hover:shadow-cyan-500/10 flex items-center justify-center space-x-2 active:scale-95 cursor-pointer shrink-0"
          >
            <span>{t.officeCta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
