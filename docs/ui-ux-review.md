# UI e UX: dove investire nel portfolio

Il sistema visivo ha già una direzione chiara: superfici grafite/cemento, accento cobalto, tipografia coerente e movimento misurato. Il maggiore miglioramento possibile è rendere più facile valutare il lavoro: capire il problema, riconoscere il contributo personale e vedere il risultato in azione.

Questa valutazione deriva dai componenti locali, dalle anteprime effettive, dalla cronologia Git e dal codice e dalla documentazione dei due progetti esterni. Le priorità sono ipotesi progettuali: non sono risultati di test con utenti.

## Priorità

| Priorità | Intervento | Motivo e verifica |
| --- | --- | --- |
| 1 | Mostrare un comportamento reale per progetto | L’immagine del treno e il tavoliere iniziale identificano il progetto, ma non mostrano l’interazione. Per Railway: breve sequenza rilevamento → aggiornamento FlexSim → LCD/sbarra. Per Ataxx: una mossa prima/dopo, con cattura evidenziata e comando visibile. Misurare se una persona sa spiegare cosa fa il progetto dopo pochi secondi. |
| Completato | Rendere concreto il contributo individuale | Ricostruito da diff, autori, PR e codice finale: la sintesi e i nodi dei diagrammi ora distinguono il contributo personale dal lavoro del team, con fonti dedicate. Metodo e riscontri in [project-contributions.md](project-contributions.md). |
| 2 | Rendere più precisa la promessa iniziale | Nel primo schermo devono risultare chiari ruolo attuale, tipo di problemi affrontati e direzione professionale desiderata. “Software Engineer & Full Stack Developer” è ampio: dare più spazio a una frase concreta sui prodotti costruiti e al progetto che meglio rappresenta la direzione scelta. |
| 2 | Dare pesi diversi ai tre lavori | Le tre card hanno oggi una gerarchia simile. Un progetto principale, con gli altri due a supporto, può far emergere meglio la specializzazione. Railway è un buon candidato per un percorso backend/IoT; il portfolio per un percorso frontend. La scelta dipende dal ruolo cercato. |
| 3 | Verificare le interazioni decorative con persone reali | Intro, cursore personalizzato e audio compongono l’identità. Controllare con tastiera, touch e persone alla prima visita che non riducano la chiarezza dei controlli. Conservare la preferenza per movimento ridotto, la possibilità di saltare l’intro e l’audio disattivato inizialmente. |

La home porta già i progetti subito dopo l’hero, e i filtri tecnici sono già raccolti in un controllo espandibile: queste scelte aiutano la priorità dei contenuti e non richiedono un nuovo redesign.

## Implementato in questo intervento

- I tre case study diventano diagrammi con obiettivo comune, tre rami **vincolo → scelta → effetto** e una conclusione. Ogni scelta apre motivazione, compromesso e riscontri nel progetto.
- Le fonti puntano a revisioni Git consultate, così il riferimento resta verificabile anche se il repository evolve. La nota del diagramma distingue l’interpretazione tecnica dalle evidenze.
- La sintesi resta leggibile senza aprire nodi. Le aperture usano `details/summary`, disponibili anche senza JavaScript; su mobile i rami scorrono in verticale lungo un collegamento comune.
- Il diagramma precede la grande anteprima. L’intestazione elimina un paragrafo ripetuto, le immagini mantengono l’intero contenuto e la conclusione della pagina offre un collegamento ai contatti.
- Le descrizioni delle card diventano specifiche; PostgreSQL entra nello stack di Railway perché è una parte centrale dell’implementazione.
- I case study di gruppo esplicitano il contributo personale ricostruito dalla cronologia: backend, dati e test in Railway; organizzazione del codice, input/mosse, test e integrazione in Ataxx. I ruoli sono aggiornati in entrambe le lingue.

## Fonti e limiti

Per il portfolio sono stati consultati il codice locale e la cronologia fino a `a9c6d6e`. I collegamenti pubblici usano `8b86d6d`, presente sul ramo remoto: i commit successivi sono ancora locali. Per [Railway Simulator](https://github.com/vincxxdev/Railway-Simulator/tree/f80a6ac6cc2fdd67e5d439ee53f28d41e7ae7a4e) sono stati letti backend, firmware, documentazione FlexSim e test. Per [Ataxx](https://github.com/softeng2324-inf-uniba/progetto-cocke/tree/9227b8279b1765a43edf307652d09c903a732a7e) sono stati letti report, controller/modello, test, configurazione Gradle, workflow e cronologia.

Ataxx dichiara **Entity-Control-Boundary**, non MVC. Railway usa aggiornamenti HTTP e polling: non viene presentato come streaming WebSocket o come insieme di microservizi distribuiti. Non sono state eseguite le suite dei due progetti esterni né il banco Arduino/FlexSim; il diagramma ne descrive l’implementazione consultabile, senza inventare metriche o attribuire tutte le scelte a un singolo membro del team.

## Verifica dell’implementazione

ESLint, TypeScript e build Next.js completati. Controllati i tre diagrammi in entrambe le lingue, gli identificatori delle scelte e i riferimenti ai file/commit; il rendering statico contiene un solo H1 e tre nodi espandibili per progetto.

Lighthouse locale sulla home: 100 per performance, accessibilità, best practices e SEO. Case study del portfolio su desktop: 100 nelle quattro categorie. Railway a 390 px e Ataxx a 320 px: 100 per accessibilità, best practices e SEO; performance mobile non misurata in questi due audit. Esaminate le schermate prodotte dagli audit nel tema scuro predefinito: nessun allargamento della pagina e anteprima Ataxx completa. I punteggi descrivono queste esecuzioni locali, non sostituiscono una prova con utenti o una verifica manuale delle tecnologie assistive.
