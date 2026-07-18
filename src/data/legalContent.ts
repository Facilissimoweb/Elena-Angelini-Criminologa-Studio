export interface LegalTranslation {
  title: string;
  tabs: {
    privacy: string;
    cookie: string;
    terms: string;
  };
  buttons: {
    close: string;
    savePreferences: string;
    acceptAll: string;
    rejectAll: string;
  };
  cookieSettings: {
    title: string;
    desc: string;
    essentialTitle: string;
    essentialDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    functionalTitle: string;
    functionalDesc: string;
    statusActive: string;
    statusInactive: string;
    statusAlwaysActive: string;
  };
  privacyContent: string;
  cookieContent: string;
  termsContent: string;
}

export const legalTranslations: Record<'it' | 'en' | string, LegalTranslation> = {
  it: {
    title: "CENTRO DI CONSENSO & NOTE LEGALI // STUDIO ELENA ANGELINI",
    tabs: {
      privacy: "PRIVACY POLICY",
      cookie: "COOKIE POLICY & SCELTE",
      terms: "TERMINI DI SERVIZIO"
    },
    buttons: {
      close: "CHIUDI",
      savePreferences: "SALVA LE MIE PREFERENZE",
      acceptAll: "ACCETTA TUTTI I COOKIE",
      rejectAll: "RIFIUTA I NON NECESSARI"
    },
    cookieSettings: {
      title: "CONFIGURAZIONE GRANULARE DEL CONSENSO COOKIE",
      desc: "In conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679) e la Direttiva ePrivacy, lo Studio Elena Angelini applica il principio di privacy by default. Selezioni qui sotto quali categorie di cookie desidera autorizzare durante la navigazione sul portale scientifico.",
      essentialTitle: "1. COOKIE TECNICI E NECESSARI",
      essentialDesc: "Indispensabili per il corretto funzionamento del sito, la memorizzazione delle preferenze di lingua, la gestione della sessione crittografata e il tracciamento dello stato del consenso. Non possono essere disattivati.",
      analyticsTitle: "2. COOKIE ANALITICI DI PRESTAZIONE (GOOGLE ANALYTICS 4)",
      analyticsDesc: "Abilitano il tracciamento anonimizzato tramite Google Analytics 4 (con mascheramento dell'indirizzo IP). Raccolgono informazioni aggregate sul numero di visitatori e sulle pagine più consultate per ottimizzare le risorse del laboratorio forense.",
      functionalTitle: "3. COOKIE FUNZIONALI E ASSISTENTE CHATBOT",
      functionalDesc: "Permettono l'attivazione e la memorizzazione della cronologia locale dell'Assistente Virtuale Forense (Forensic Chatbot) e di altre personalizzazioni dell'interfaccia interattiva (es. configurazione del widget FORA 3D).",
      statusActive: "STATO: ATTIVO (CONSENSO ACCORDATO)",
      statusInactive: "STATO: DISATTIVATO (RIFIUTATO)",
      statusAlwaysActive: "STATO: SEMPRE ATTIVO (ESSENZIALE)"
    },
    privacyContent: `### INFORMATIVA SUL TRATTAMENTO DEI DATI PERSONALI (ART. 13 REG. UE 2016/679 - GDPR)

Benvenuto sul portale dello **Studio Criminalistica Elena Angelini** (con sede a Rimini, Italia). La tutela dei suoi dati personali e il rigoroso rispetto del segreto professionale costituiscono un valore fondamentale del nostro operato.

#### 1. TITOLARE DEL TRATTAMENTO
Il Titolare del Trattamento è lo **Studio Criminalistica Elena Angelini**, con sede legale a Rimini, Italia.
Per qualsiasi chiarimento o per l'esercizio dei suoi diritti, può contattare il Titolare all'indirizzo e-mail di riferimento o tramite i canali istituzionali dello studio.

#### 2. TIPOLOGIA DI DATI TRATTATI E FINALITÀ
Lo studio tratta i seguenti dati esclusivamente per l'erogazione dei servizi e la tutela dei diritti dei propri assistiti:
* **Dati di navigazione:** Indirizzi IP, parametri del browser e informazioni di sistema aggregate per fini di sicurezza e ottimizzazione delle prestazioni.
* **Dati forniti volontariamente dall'utente:** Nome, indirizzo e-mail, recapito telefonico ed eventuali informazioni descrittive sul caso penale/civile inviate tramite il modulo di contatto o di prenotazione del colloquio conoscitivo.
* **Finalità forensi e consulenziali:** Gestione delle richieste di assistenza tecnica di parte (CTP) in ambito criminologico, balistico, informatico-forense o medico-legale.

#### 3. BASE GIURIDICA DEL TRATTAMENTO
Il trattamento dei suoi dati si fonda su:
* L'esecuzione di misure precontrattuali o contrattuali adottate su sua richiesta (art. 6, par. 1, lett. b, GDPR);
* Il consenso dell'interessato per finalità specifiche come l'interazione con l'Assistente Virtuale Forense o l'abilitazione di cookie analitici (art. 6, par. 1, lett. a, GDPR);
* Il perseguimento del legittimo interesse del Titolare a proteggere l'infrastruttura informatica dello studio e prevenire frodi (art. 6, par. 1, lett. f, GDPR).

#### 4. CONSERVAZIONE DEI DATI E SEGRETO PROFESSIONALE
Nel rispetto delle normative deontologiche vigenti e del codice di procedura penale in materia di indagini difensive:
* Tutti i dati personali e i dettagli del caso trasmessi sono coperti da **rigoroso segreto professionale** e tutelati dal segreto investigativo.
* I dati inseriti nei moduli online vengono conservati solo per il tempo strettamente necessario a gestire la sua richiesta di contatto, dopodiché vengono archiviati in sistemi protetti e offline o eliminati.
* Nessun dato sensibile relativo a procedimenti giudiziari viene memorizzato permanentemente su server web pubblici.

#### 5. DIRITTI DELL'INTERESSATO
Ai sensi degli artt. 15-22 del GDPR, lei ha il diritto di:
* Accedere ai propri dati personali e riceverne copia;
* Chiedere la rettifica dei dati inesatti o l'integrazione di quelli incompleti;
* Richiedere la cancellazione dei dati (diritto all'oblio) qualora non sussistano obblighi di legge contrari;
* Revocare il consenso in qualsiasi momento (senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca).

Per esercitare i suoi diritti, la preghiamo di indirizzare una richiesta scritta ai contatti ufficiali dello studio.`,
    cookieContent: `### INFORMATIVA DETTAGLIATA SUI COOKIE (COOKIE POLICY)

Questo sito web utilizza cookie e tecnologie di tracciamento simili per migliorare la sua esperienza di navigazione, garantire la sicurezza del sistema e analizzare il traffico sul nostro portale scientifico.

#### 1. COSA SONO I COOKIE?
I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie consentono al portale di ricordare le preferenze dell'utente (come la lingua o le impostazioni grafiche del visore 3D FORA) e garantire la navigazione protetta.

#### 2. QUALI COOKIE UTILIZZIAMO SU QUESTO PORTALE?

* **Cookie Tecnici e di Sessione (Strettamente Necessari):**
  Questi cookie sono indispensabili per l'operatività di base del sito. Consentono la navigazione fluida tra le sezioni e la persistenza delle preferenze fondamentali dell'utente (es. la lingua selezionata nel menù POPPINS e lo stato di accettazione dei cookie). Non raccolgono alcuna informazione a fini di marketing e non possono essere disattivati.
  
* **Cookie Analitici (Google Analytics 4):**
  Previo suo consenso, integriamo Google Analytics 4 per raccogliere metriche in forma strettamente anonima e aggregata. Questo servizio ci aiuta a capire quali servizi scientifici riscuotono maggior interesse o se si verificano errori tecnici sulle ricostruzioni balistiche tridimensionali. L'indirizzo IP del visitatore viene mascherato all'origine prima di qualsiasi elaborazione.
  
* **Cookie Funzionali e di Integrazione Sociale:**
  Consentono l'erogazione di funzionalità avanzate. Ad esempio, vengono utilizzati per memorizzare la cronologia locale e lo stato aperto/chiuso del nostro Assistente Virtuale Forense di intelligenza artificiale, o per conservare i parametri fisici configurati all'interno della simulazione FORA 3D.

#### 3. COME GESTIRE IL CONSENSO E DISATTIVARE I COOKIE
In qualsiasi momento, l'utente può modificare le proprie scelte o revocare il consenso cliccando sul link **"Preferenze Cookie"** presente nel piè di pagina del sito. Inoltre, è possibile configurare il proprio browser internet per bloccare o cancellare i cookie. Di seguito i collegamenti per i principali browser:
* [Google Chrome](https://support.google.com/chrome/answer/95647)
* [Mozilla Firefox](https://support.google.com/products/answer/1114)
* [Apple Safari](https://support.apple.com/kb/ph21411)
* [Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/)`,
    termsContent: `### TERMINI E CONDIZIONI DI UTILIZZO DEL PORTALE SCIENTIFICO

I presenti Termini e Condizioni regolano l'accesso e l'uso del sito web dello **Studio Criminalistica Elena Angelini**. L'utilizzo del sito implica l'accettazione integrale di queste clausole.

#### 1. LIMITI ALL'USO DELLE INFORMAZIONI E FINALITÀ INFORMATIVA
* Tutti i contenuti pubblicati sul sito (articoli, schede dei servizi, timeline dei casi, FAQ e risposte fornite dal chatbot forense) hanno uno **scopo puramente informativo, scientifico e divulgativo**.
* Non costituiscono in alcun modo parere legale o consulenza tecnica formale. Il rapporto professionale e la formulazione di un quesito criminologico/forense richiedono l'esplicito conferimento di un incarico e l'analisi diretta del fascicolo processuale.
* L'Assistente Virtuale di Criminologia è un sistema basato su modelli linguistici avanzati. Sebbene istruito sui massimi standard di precisione, le sue risposte non sostituiscono l'esame diretto degli atti da parte di uno specialista abilitato.

#### 2. SOFTWARE FORA (FORENSIC OPEN RECONSTRUCTION)
* Il software FORA 3D incorporato nel portale è un'applicazione web interattiva dimostrativa di scienze forensi.
* È concesso all'utente a scopi puramente illustrativi ed educativi. La proprietà intellettuale del codice, degli algoritmi balistici e dei modelli tridimensionali appartiene allo Studio Elena Angelini o ai relativi licenziatari. È vietata qualsiasi opera di reverse engineering o copia non autorizzata.

#### 3. LIMITAZIONE DI RESPONSABILITÀ
Lo Studio Elena Angelini non potrà essere ritenuto responsabile per:
* Eventuali inesattezze o omissioni nei testi informativi o nelle risposte automatiche fornite dal chatbot;
* Danni diretti o indiretti derivanti dall'utilizzo improprio o dall'affidamento cieco sulle informazioni contenute nel portale;
* Temporanee interruzioni del servizio dovute a manutenzione o cause di forza maggiore.

#### 4. LEGGE APPLICABILE E FORO COMPETENTE
I presenti termini sono regolati dalla legge italiana. Qualsiasi controversia derivante dall'interpretazione o esecuzione delle presenti condizioni d'uso sarà devoluta in via esclusiva al Foro di Rimini, Italia.`
  },
  en: {
    title: "CONSENT CENTER & LEGAL NOTICES // STUDIO ELENA ANGELINI",
    tabs: {
      privacy: "PRIVACY POLICY",
      cookie: "COOKIE POLICY & SETTINGS",
      terms: "TERMS OF SERVICE"
    },
    buttons: {
      close: "CLOSE",
      savePreferences: "SAVE MY PREFERENCES",
      acceptAll: "ACCEPT ALL COOKIES",
      rejectAll: "REJECT NON-ESSENTIAL"
    },
    cookieSettings: {
      title: "GRANULAR COOKIE CONSENT CONFIGURATION",
      desc: "In accordance with the General Data Protection Regulation (GDPR - Regulation EU 2016/679) and the ePrivacy Directive, Studio Elena Angelini applies the privacy by default principle. Select below which cookie categories you wish to authorize while browsing our scientific portal.",
      essentialTitle: "1. TECHNICAL & NECESSARY COOKIES",
      essentialDesc: "Indispensable for the correct functioning of the website, language preferences retention, secure encrypted sessions, and tracking consent state. They cannot be deactivated.",
      analyticsTitle: "2. PERFORMANCE ANALYTICS COOKIES (GOOGLE ANALYTICS 4)",
      analyticsDesc: "Enables anonymized tracking via Google Analytics 4 (with IP address masking). They collect aggregate information about visitors count and highly viewed scientific pages to optimize forensic laboratory resources.",
      functionalTitle: "3. FUNCTIONAL COOKIES & VIRTUAL CHATBOT",
      functionalDesc: "Allows activation and local history retention of our Virtual Forensic Assistant (AI Chatbot) and other graphical interface customizations (such as the FORA 3D simulation widget).",
      statusActive: "STATUS: ACTIVE (CONSENT GRANTED)",
      statusInactive: "STATUS: DEACTIVATED (REFUSED)",
      statusAlwaysActive: "STATUS: ALWAYS ACTIVE (ESSENTIAL)"
    },
    privacyContent: `### PRIVACY POLICY (ART. 13 REG. EU 2016/679 - GDPR)

Welcome to the portal of **Studio Criminalistica Elena Angelini** (located in Rimini, Italy). Protecting your personal data and strictly adhering to professional secrecy is a cornerstone of our work.

#### 1. DATA CONTROLLER
The Data Controller is **Studio Criminalistica Elena Angelini**, with registered office in Rimini, Italy.
For any clarification or to exercise your rights under the GDPR, you can contact the Controller at our official email address or through our institutional phone lines.

#### 2. DATA CATEGORIES AND PURPOSES
The firm processes the following data exclusively to provide our services and protect our clients' legal rights:
* **Browsing Data:** IP addresses, browser parameters, and aggregate system information analyzed for security, network diagnostics, and load-balancing.
* **Data provided voluntarily:** Name, email address, telephone number, and any descriptive details about criminal or civil cases sent via the online contact form or booking widget.
* **Forensic and Advisory Purposes:** Managing defense investigations, party technical expert (CTP) operations in criminology, ballistics, cyber forensics, or forensic pathology.

#### 3. LEGAL BASIS FOR PROCESSING
The processing of your personal data is grounded on:
* Performance of pre-contractual or contractual measures taken upon your request (Art. 6(1)(b) GDPR);
* Consent of the data subject for specific purposes, such as engaging with the AI Forensic Chatbot or enabling analytical cookies (Art. 6(1)(a) GDPR);
* Pursuit of the Controller's legitimate interest to defend web systems and infrastructure against cyberattacks or malicious activities (Art. 6(1)(f) GDPR).

#### 4. DATA RETENTION AND PROFESSIONAL SECRECY
In compliance with strict professional ethical rules and the Italian Code of Criminal Procedure regarding defense investigation files:
* All personal data and case particulars transmitted are fully covered by **strict professional secrecy** and investigation privilege.
* Form inputs are stored only for the minimum period required to handle your inquiry, after which they are archived in secure, offline, air-gapped systems or deleted.
* No sensitive case data or judicial filings are stored permanently on public-facing web servers.

#### 5. RIGHTS OF THE DATA SUBJECT
Pursuant to Articles 15-22 of the GDPR, you have the right to:
* Access your personal data and obtain a copy;
* Request rectification of inaccurate or incomplete details;
* Request erasure (right to be forgotten) unless overrides of legal obligations or public interest defense apply;
* Withdraw your consent at any time without affecting lawful processing prior to retraction.

To exercise your rights, please send a written request to the firm's official contacts.`,
    cookieContent: `### COOKIE POLICY & DISCLOSURE

This website uses cookies and similar tracking technologies to enhance your browsing experience, safeguard our technical infrastructure, and analyze user interactions on our scientific portal.

#### 1. WHAT ARE COOKIES?
Cookies are small text files sent by websites to the user's terminal, where they are stored to be sent back to the same sites on subsequent visits. Cookies allow our portal to remember your choices (such as the language or FORA 3D display parameters) and ensure safe navigation.

#### 2. TYPES OF COOKIES USED BY THIS SITE

* **Technical and Session Cookies (Strictly Necessary):**
  These cookies are required for basic operations. They manage secure logins, handle the encrypted contact forms, and remember your language preference (set in the Poppins menu) and cookie consent settings. They do not collect data for marketing and cannot be deactivated.
  
* **Performance Analytics Cookies (Google Analytics 4):**
  Subject to your explicit consent, we deploy Google Analytics 4 to collect metrics in an anonymous, aggregated manner. This helps us understand which forensic specialties generate more interest and check for layout or technical issues in the FORA 3D viewport. Your IP address is masked at the source.
  
* **Functional and Interface Cookies:**
  These enable rich interactive modules. For instance, they store local messaging histories for the virtual AI Forensic Assistant, or save ballistics trajectory vectors and custom physics configurations in the FORA 3D canvas.

#### 3. MANAGING CONSENT AND DISABLING COOKIES
You can change your consent settings or revoke approval at any time by clicking the **"Cookie Preferences"** link in the footer of the page. You can also block or delete cookies inside your web browser. Links to standard guidelines:
* [Google Chrome](https://support.google.com/chrome/answer/95647)
* [Mozilla Firefox](https://support.google.com/products/answer/1114)
* [Apple Safari](https://support.apple.com/kb/ph21411)
* [Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/)`,
    termsContent: `### TERMS AND CONDITIONS OF USE FOR THE FORENSIC PORTAL

These Terms and Conditions govern access to and use of the website of **Studio Criminalistica Elena Angelini**. By using this site, you agree to these clauses in full.

#### 1. LIMITATION OF USE AND PURPOSE OF INFORMATION
* All materials published on this portal (including technical articles, service descriptions, historical case files, FAQs, and responses generated by our chatbot) are for **informational, educational, and scientific dissemination purposes only**.
* They do not constitute formal legal counsel or professional forensic advice. Establishing a professional engagement requires a signed mandate and direct review of the prosecution or defense files.
* The Virtual Criminology Assistant uses an advanced LLM. While calibrated for precision, its responses do not substitute direct file analysis by a qualified and certified technical specialist.

#### 2. FORA (FORENSIC OPEN RECONSTRUCTION) WEB WIDGET
* The FORA 3D widget embedded in the portal is a demonstrative criminology simulation.
* It is granted for illustrative and research purposes only. Intellectual property rights for the source code, ballistics formulas, and 3D modeling meshes belong exclusively to Studio Elena Angelini or its licensors. Unauthorized copy or reverse engineering is prohibited.

#### 3. WARRANTY AND LIABILITY DISCLAIMERS
Studio Elena Angelini shall not be held liable for:
* Minor inaccuracies, translation variances, or temporary errors in our technical documents or chatbot outputs;
* Any direct or indirect damage arising from reliance on information found on this portal;
* Technical downtimes or system interruptions caused by hosting providers, updates, or cyber defense protocols.

#### 4. GOVERNING LAW AND JURISDICTION
These terms are governed by and construed in accordance with Italian law. Any dispute arising out of or in connection with these conditions shall be subject to the exclusive jurisdiction of the Court of Rimini, Italy.`
  }
};
