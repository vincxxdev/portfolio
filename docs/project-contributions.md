# Contributo personale ricostruito dalla cronologia

Sono stati analizzati i commit raggiungibili da `main`, i diff delle modifiche rilevanti, le pull request e il codice finale. I merge documentano integrazione; non vengono trattati come prova che chi li ha eseguiti abbia scritto tutto il codice incluso. Non sono state usate percentuali di commit o di righe per stimare il contributo.

## Identità storiche

Gli autori `vincxxdev`, `Vincenzo Buttari`, `zeltarave` e `zrlvx` sono stati ricondotti al contributore del portfolio. Il codice di condotta di Ataxx associa Vincenzo Buttari a `zeltarave`; i metadati Git collegano `zeltarave` e `zrlvx`. Il riscontro pubblico decisivo per la riorganizzazione dei package è la [PR #107](https://github.com/softeng2324-inf-uniba/progetto-cocke/pull/107): GitHub la attribuisce a `vincxxdev`, ID 93495338, e la associa al commit `748ffbd`, firmato `zrlvx`. Il singolo commit non ha oggi un autore GitHub risolto dall’API; l’attribuzione usa quindi anche la pull request, non solo il nome visualizzato nel log.

## Railway Simulator

| Ambito | Contributo riscontrato | Evidenze |
| --- | --- | --- |
| Dati e backend | Creazione ed evoluzione dello schema SQL, collegamento a PostgreSQL, servizi ed endpoint Express. | [Schema SQL](https://github.com/vincxxdev/Railway-Simulator/commit/0a0e670), [connessione DB](https://github.com/vincxxdev/Railway-Simulator/commit/2129306), [servizio treni e test](https://github.com/vincxxdev/Railway-Simulator/commit/fd0b323). |
| Gestione dei binari | Ricerca e assegnazione del primo binario disponibile; aggiornamento dell’occupazione in relazione allo stato della fermata. | [Assegnazione](https://github.com/vincxxdev/Railway-Simulator/commit/ef59541), [aggiornamento dello stato](https://github.com/vincxxdev/Railway-Simulator/commit/1918c57). |
| Verifica | Test unitari dei servizi e test di integrazione degli endpoint; adeguamento dei test alle nuove operazioni sui binari. | [Test treni](https://github.com/vincxxdev/Railway-Simulator/commit/fd0b323), [test passaggi a livello](https://github.com/vincxxdev/Railway-Simulator/commit/98d7714), [test assegnazione](https://github.com/vincxxdev/Railway-Simulator/commit/ef59541). |
| Documentazione e modello | Documentazione delle API e dei Process Flow; contributi al modello FlexSim, incluso il commit sui passeggeri della seconda stazione. | [API](https://github.com/vincxxdev/Railway-Simulator/commit/ba46cae), [Process Flow](https://github.com/vincxxdev/Railway-Simulator/commit/48ecfe5), [modello](https://github.com/vincxxdev/Railway-Simulator/commit/8a7b21f). |

Gli sketch per [sensori](https://github.com/vincxxdev/Railway-Simulator/commit/28ce3e0) e [display/servo](https://github.com/vincxxdev/Railway-Simulator/commit/f8b2f48) risultano di `frankrep`. Entrambi gli autori modificano il modello FlexSim. Il file `.fsm` è binario: il riferimento ai passeggeri deriva dal messaggio del commit e dal file modificato, senza attribuire al singolo autore ogni comportamento interno della simulazione.

## Ataxx

| Ambito | Contributo riscontrato | Evidenze |
| --- | --- | --- |
| Organizzazione del codice | Separazione in package e redistribuzione delle classi; successive modifiche al package views. | [PR package](https://github.com/softeng2324-inf-uniba/progetto-cocke/pull/107), [revisione views](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/6ad619c). |
| Input e mosse | Acquisizione delle coordinate, esecuzione delle mosse con `movePiece`, estensione al salto di due caselle e successive correzioni. | [Input](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/cd4c3ae), [movePiece](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/96b7d07), [salto](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/3d6a484). |
| Test | Creazione e revisione dei test di Color e Message; estensione dei casi di GameControllerTest; introduzione di input controllati nei test. | [Utils](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/c2c42eb), [controller](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/0fa47ab), [setTestCommand](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/cfff49f). |
| Integrazione e documentazione | Merge di pull request nel ramo principale e inserimento/organizzazione dei diagrammi delle classi nel report. | [Merge PR #222](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/288ea41), [report UML](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/a629be8). |

Le mosse attraversano un revert e una reintegrazione: l’attribuzione è stata verificata anche sulle righe finali di `GameController`, che conservano il lavoro reintegrato in [0799bac](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/0799bac) e il refactoring successivo. Nello stesso metodo compaiono interventi di altri membri per catture e gestione dei turni: il case study non attribuisce l’intero motore di gioco a una sola persona.

La [struttura iniziale di GameControllerTest](https://github.com/softeng2324-inf-uniba/progetto-cocke/commit/4afccfc) è di `lmikk0`: il contributo personale è descritto come estensione dei casi. L’inserimento di immagini UML nel report non dimostra da solo la paternità esclusiva del disegno architetturale. Analogamente, i merge non vengono presentati come approvazioni di code review o come prova del ruolo di Scrum Master.

## Applicazione al portfolio

Le attribuzioni sono riportate in italiano e inglese, sia nella sintesi visibile del diagramma sia nei dettagli di ciascuna scelta. I riferimenti relativi al contributo personale sono separati dalle fonti che descrivono il funzionamento complessivo del progetto. Il case study del portfolio, già indicato come sviluppo individuale, mantiene il proprio contenuto.

Verificati i riferimenti ai commit rispetto a `main` e ai relativi autori, la corrispondenza IT/EN e la presenza delle attribuzioni nell’HTML statico. Build, ESLint e TypeScript completati. Il controllo Lighthouse di Ataxx a 320 px restituisce 100 per accessibilità, best practices e SEO; la schermata prodotta dall’audit mostra la sintesi senza allargamento della pagina. Il nuovo audit desktop della home restituisce 99 per performance e 100 nelle altre tre categorie; il report e i dati del footer sono aggiornati.
