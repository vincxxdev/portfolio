import type { ReasoningDiagram } from '@/i18n/types';
import { caseStudySources as sources } from '@/data/caseStudySources';

export const caseStudies: Record<number, ReasoningDiagram> = {
  1: {
    objective: {
      title: 'Far capire cosa so costruire, e come lavoro.',
      description: 'Un portfolio bilingue che evolve insieme ai progetti: percorsi chiari, contenuti aggiornabili e un’identità visiva riconoscibile.',
    },
    decisions: [
      {
        id: 'navigation',
        constraint: 'Progetti, percorso e contatti competevano dentro un’unica pagina.',
        title: 'Un percorso per ogni intento',
        reason: 'La migrazione dalla pagina unica ad App Router separa esplorazione dei progetti, profilo e contatti. Ogni case study ha uno slug stabile e metadati propri.',
        tradeoff: 'Più pagine significano curare i passaggi fra loro: navigazione coerente, ritorno all’indice e progetto successivo.',
        evidence: 'La cronologia documenta il redesign multi-route; gli helper centralizzano gli slug e i metadati associano un URL canonico a ogni percorso.',
        effect: 'Ogni progetto ha un link diretto e un percorso di lettura dedicato.',
        sources: sources.navigation,
      },
      {
        id: 'rendering',
        constraint: 'L’identità visiva deve convivere con tempi di lettura e accessibilità.',
        title: 'Prima il contenuto, poi il movimento',
        reason: 'Il loader monta subito la pagina e sovrappone l’intro. I reveal spostano il testo senza renderlo trasparente; gli effetti rispettano la riduzione del movimento e si fermano fuori schermo.',
        tradeoff: 'Le animazioni hanno un budget preciso: niente attese obbligatorie per leggere, e ogni effetto richiede una versione a movimento ridotto.',
        evidence: 'Loader, registerIn e usePauseOffscreen rendono verificabili queste scelte. Il report Lighthouse alimenta i punteggi pubblicati nel footer.',
        effect: 'Contenuto leggibile dal primo HTML, anche con movimento ridotto.',
        sources: sources.rendering,
      },
      {
        id: 'content',
        constraint: 'Due lingue e un CV in PDF aumentano il contenuto da mantenere.',
        title: 'Contenuti tipizzati, UI separata',
        reason: 'File di dati e dizionari IT/EN tengono i testi fuori dai componenti. Il CV viene generato nel browser con jsPDF e riceve la lingua attiva.',
        tradeoff: 'Il sistema i18n resta piccolo, ma le traduzioni e il sottoinsieme di testi del CV vanno mantenuti esplicitamente: il controllo dei tipi verifica la struttura, non l’equivalenza dei contenuti.',
        evidence: 'LocaleProvider gestisce la lingua; generateCV legge t.cvData. Un successivo redesign porta il CV a una colonna con date in un margine dedicato.',
        effect: 'Lingua coerente tra sito e download, senza modificare i componenti.',
        sources: sources.content,
      },
    ],
    outcome: {
      title: 'Il portfolio diventa anche una dimostrazione del metodo.',
      description: 'Routing, rendering e contenuti sostengono la stessa esperienza. Il progetto continua a evolvere attraverso modifiche verificabili, un CV generato dal browser e audit pubblicati nel footer.',
    },
  },
  2: {
    objective: {
      title: 'Collegare una stazione fisica al suo modello digitale.',
      description: 'Arduino rileva gli eventi; FlexSim rappresenta i treni. Tra i due serve uno stato condiviso per posizioni, binari e passaggi a livello.',
    },
    contribution: {
      summary: 'Ho progettato lo schema dati e sviluppato il backend Express, l’assegnazione dei binari e i test Jest/Supertest. Ho inoltre documentato API e Process Flow e contribuito al modello FlexSim.',
      team: 'Il firmware Arduino è stato sviluppato dal collega; sul modello FlexSim abbiamo lavorato entrambi.',
    },
    decisions: [
      {
        id: 'state',
        constraint: 'Hardware e simulazione devono leggere le stesse informazioni.',
        title: 'Coordinare lo stato con API e database',
        reason: 'Un’applicazione Express espone endpoint REST e servizi distinti per treni, stazioni, rotte e binari. PostgreSQL conserva le relazioni; il servizio cerca un binario disponibile per la stazione di arrivo.',
        tradeoff: 'Il backend diventa un punto centrale da mantenere disponibile. Cercare il primo binario libero è una regola semplice; non equivale a un sistema di ottimizzazione ferroviaria.',
        evidence: 'app.js monta le route /api/v1. I servizi di binari e rotte implementano ricerca del binario disponibile, assegnazione e rilascio.',
        effect: 'Assegnazioni e occupazione passano dallo stesso backend.',
        sources: sources.railwayState,
        contribution: {
          description: 'Ho definito lo schema SQL, sviluppato servizi ed endpoint del backend e implementato la ricerca e l’assegnazione del primo binario disponibile alla fermata di un treno.',
          sources: sources.railwayPersonalBackend,
        },
      },
      {
        id: 'synchronization',
        constraint: 'La posizione fisica può divergere da quella mostrata dal modello.',
        title: 'Rilevare, interrogare, riallineare',
        reason: 'Arduino Nano invia posizione e stato del passaggio a livello con richieste HTTP. FlexSim interroga periodicamente il server e riallinea l’AGV all’ultima posizione rilevata; attende la chiusura della sbarra prima di avanzare.',
        tradeoff: 'Il polling è semplice da integrare, ma introduce attesa e richieste ripetute. La frequenza di lettura non garantisce sincronizzazione istantanea.',
        evidence: 'Lo sketch invia PUT alle API. Il Process Flow documentato confronta le posizioni e usa la modalità Teleport per correggere lo scostamento.',
        effect: 'Gli eventi fisici guidano l’avanzamento della simulazione.',
        sources: sources.railwaySync,
        contribution: {
          description: 'Ho implementato l’aggiornamento dell’occupazione dei binari al variare della rotta, documentato i Process Flow e contribuito al modello FlexSim, anche con l’aggiunta dei passeggeri alla seconda stazione.',
          sources: sources.railwayPersonalIntegration,
        },
      },
      {
        id: 'feedback',
        constraint: 'L’integrazione deve restituire un riscontro anche sul banco fisico.',
        title: 'Chiudere il ciclo con display e test',
        reason: 'Il Nano legge lo stato dei binari e lo passa via seriale a un Arduino UNO. Quest’ultimo aggiorna display LCD e servomotore. Test Jest e Supertest verificano servizi ed endpoint separatamente.',
        tradeoff: 'I test software non dimostrano da soli il funzionamento di sensori, cablaggi e modello 3D: la verifica dell’intero ciclo richiede anche il banco hardware.',
        evidence: 'BinarioLCD.ino gestisce seriale, LCD e servo. Il repository contiene test unitari e test API che richiedono un database di test dedicato.',
        effect: 'Lo stato torna al mondo fisico sotto forma di informazioni e movimento.',
        sources: sources.railwayFeedback,
        contribution: {
          description: 'Ho scritto test unitari per i servizi e test di integrazione delle API, inclusi passaggi a livello e assegnazione dei binari. Il codice Arduino per LCD e servomotore è del collega.',
          sources: sources.railwayPersonalTests,
        },
      },
    ],
    outcome: {
      title: 'Un ciclo completo tra evento, stato e rappresentazione.',
      description: 'Il prototipo universitario integra firmware, backend e modello FlexSim: dal rilevamento del treno alla posizione simulata, fino al display e alla sbarra. Il lavoro centrale è definire come sistemi diversi si scambiano informazioni.',
    },
  },
  3: {
    objective: {
      title: 'Trasformare le regole di Ataxx in un gioco costruito in squadra.',
      description: 'Un’applicazione Java da terminale: mosse, catture e turni devono restare coerenti mentre il team consegna funzionalità in iterazioni.',
    },
    contribution: {
      summary: 'Ho riorganizzato il codice in package, implementato l’acquisizione e l’esecuzione delle mosse, inclusi i salti, scritto test per Color e Message ed esteso quelli di GameController. Ho integrato pull request e inserito i diagrammi delle classi nel report.',
      team: 'Modello, controller, interfaccia e documentazione sono stati sviluppati da più membri del team. La struttura iniziale di GameControllerTest è di un collega; i miei commit ne estendono i casi di test.',
    },
    decisions: [
      {
        id: 'rules',
        constraint: 'Comandi testuali e regole del tavoliere hanno responsabilità diverse.',
        title: 'Separare entità, controllo e interfaccia',
        reason: 'Il pattern Entity-Control-Boundary distingue Game, Field e Move dalle classi di input/output. GameController coordina la validazione della mossa, l’aggiornamento del tavoliere e le catture.',
        tradeoff: 'Il controller resta il punto di coordinamento e richiama anche l’output: la separazione organizza il codice, ma non elimina ogni dipendenza dall’interfaccia.',
        evidence: 'Il report dichiara ECB. Move calcola la distanza; GameController distingue duplicazione e spostamento e controlla le caselle coinvolte.',
        effect: 'Le regole hanno oggetti e responsabilità riconoscibili, verificabili con test.',
        sources: sources.ataxxRules,
        contribution: {
          description: 'Ho separato il codice nei package model, controller, views e utils, sviluppato la lettura delle coordinate delle mosse e implementato movePiece, estendendolo al salto di due caselle.',
          sources: sources.ataxxPersonalRules,
        },
      },
      {
        id: 'process',
        constraint: 'Più persone devono integrare modifiche senza perdere il filo del lavoro.',
        title: 'Consegnare per sprint e revisioni',
        reason: 'Il team organizza il lavoro in tre sprint, con planning, incontri di avanzamento e una board GitHub. Issue e pull request collegano le attività alle modifiche; le retrospettive rendono visibile il processo.',
        tradeoff: 'Coordinamento, review e documentazione richiedono tempo oltre all’implementazione delle regole.',
        evidence: 'Il report descrive sprint e board. Gli ultimi interventi correggono la fine della partita e la stampa delle mosse vuote, mostrando anche il lavoro di rifinitura.',
        effect: 'Le funzionalità e le correzioni lasciano una storia condivisa e consultabile.',
        sources: sources.ataxxProcess,
        contribution: {
          description: 'Ho integrato pull request nel ramo principale, fra cui quella sui test del controller, e inserito e organizzato i diagrammi delle classi nel report. Questi interventi documentano il mio lavoro di integrazione e documentazione nel team.',
          sources: sources.ataxxPersonalProcess,
        },
      },
      {
        id: 'verification',
        constraint: 'Un gioco consegnato deve poter essere verificato e avviato altrove.',
        title: 'Ripetere i controlli e preparare la consegna',
        reason: 'JUnit 5 verifica le classi; Gradle esegue test e analisi statica e produce un JAR eseguibile. GitHub Actions avvia la build sulle pull request che cambiano src; il Dockerfile prepara l’ambiente di esecuzione.',
        tradeoff: 'Checkstyle, PMD e SpotBugs sono configurati con ignoreFailures: i loro rilievi richiedono revisione e non bloccano automaticamente la build.',
        evidence: 'build.gradle configura JUnit e il fat JAR. Il workflow esegue la build su JDK 19; il Dockerfile avvia il JAR prodotto. Le suite di test sono raccolte in src/test.',
        effect: 'La consegna comprende codice, verifiche ripetibili e istruzioni di esecuzione.',
        sources: sources.ataxxChecks,
        contribution: {
          description: 'Ho scritto i test di Color e Message ed esteso GameControllerTest, verificando anche mosse non valide e conferma dell’abbandono. Ho aggiunto setTestCommand per fornire input controllati durante i test.',
          sources: sources.ataxxPersonalTests,
        },
      },
    ],
    outcome: {
      title: 'Un gioco e un processo di sviluppo leggibile.',
      description: 'Il repository raccoglie applicazione da terminale, test, diagrammi di progettazione e report del lavoro in team. La storia mostra sia la costruzione delle funzionalità sia le correzioni prima della consegna.',
    },
  },
};
