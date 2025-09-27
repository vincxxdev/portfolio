# Portfolio Personale di vincxxdev

Questo è il repository per il mio portfolio personale, costruito con Next.js, TypeScript e Tailwind CSS.

**[Guarda la Live Demo](https://vincxx.dev)**

---

## Anteprima

![Anteprima del Portfolio](public/images/preview.png)

---

## ✨ Features

- **Design Moderno e Responsivo**: Interfaccia pulita e completamente accessibile da qualsiasi dispositivo.
- **Tema Scuro/Chiaro**: Switch tra modalità chiara e scura con persistenza delle preferenze.
- **Animazioni fluide**: Transizioni e animazioni realizzate con Framer Motion per un'esperienza utente dinamica.
- **Sfondo Interattivo**: Particelle animate in background create con tsParticles.
- **Architettura Scalabile**: Contenuti come esperienze, skill e progetti sono gestiti tramite file di dati, rendendo l'aggiornamento del portfolio semplice e veloce senza toccare il codice.

---

## 🛠️ Tech Stack & Librerie

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/tsParticles-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjUwLjgsMTI4LjhjLTAuMSwzMy45LDEyLjUsNjYuMSwzNi45LDkwLjVjMjQuNCwyNC40LDU2LjYsMzcuMSw5MC41LDM3YzMzLjksLTAuMSw2Ni4xLC0xMi41LDkwLjUsLTM2LjljMjQuNCwtMjQuNCwzNy4xLC01Ni42LDM3LC05MC41YzAuMSwtMzMuOSwtMTIuNSwtNjYuMSwtMzYuOSwtOTAuNWMtMjQuNCwtMjQuNCwtNTYuNiwtMzcuMSwtOTAuNSwtMzdtLTIwLjYsMjAuNmMxOS45LDE5LjksMzAuOSw0Ni40LDMwLjksNzBjMCwyMy42LC0xMSw1MC4xLC0zMC45LDcwYy0xOS45LDE5LjksLTQ2LjQsMzAuOSwtNzAsMzAuOWMtMjMuNiwwLC01MC4xLC0xMSwtNzAsLTMwLjljLTE5LjksLTE5LjksLTMwLjksLTQ2LjQsLTMwLjksLTcwYzAsLTIzLjYsMTEsLTUwLjEsMzAuOSwtNzBjMTkuOSwtMTkuOSw0Ni40LC0zMC45LDcwLC0zMC45YzIzLjYsMCw1MC4xLDExLDcwLDMwLjlaIj48L3BhdGg+PC9zdmc+&logoColor=white" alt="tsParticles"/>
</p>

---

## 🚀 Come Iniziare

Per eseguire il progetto in locale, segui questi passaggi:

1.  **Clona il repository:**
    ```bash
    git clone https://github.com/vincxxdev/portfolio.git
    cd portfolio
    ```

2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

3.  **Avvia il server di sviluppo (con Turbopack):**
    ```bash
    npm run dev
    ```

4.  **Apri il browser:**
    Naviga su [http://localhost:3000](http://localhost:3000) per vedere il risultato.

### Altri Comandi Utili

-   **Build per produzione:**
    ```bash
    npm run build
    ```
-   **Avvio in produzione:**
    ```bash
    npm run start
    ```
-   **Controllo Linting:**
    ```bash
    npm run lint
    ```

---

## 📈 Aggiornare i Contenuti

Grazie all'architettura data-driven, puoi aggiornare facilmente le sezioni del portfolio modificando i file nella directory `src/data`:

-   **Esperienze**: Modifica `src/data/experiences.ts`
-   **Certificazioni**: Modifica `src/data/certifications.ts`
-   **Competenze (Skills)**: Modifica `src/data/skills.ts`
-   **Progetti**: Modifica `src/data/projects.ts`

Il sito si aggiornerà automaticamente con i nuovi dati dopo aver riavviato il server di sviluppo.

---
