# Portfolio Personale di vincxxdev

Questo è il repository per il mio portfolio personale, costruito con Next.js e Tailwind CSS. 

**[Guarda la Live Demo](https://ilmiofuturolink.com)**

---

## Anteprima

![Anteprima del Portfolio](./public/images/preview.png)

---

## ✨ Features

- **Design Moderno e Responsivo**: Interfaccia pulita e completamente accessibile da qualsiasi dispositivo.
- **Tema Scuro/Chiaro**: Switcha tra modalità chiara e scura con persistenza delle preferenze.
- **Animazioni fluide**: Transizioni e animazioni realizzate con Framer Motion per un'esperienza utente dinamica.
- **Architettura Scalabile**: Contenuti come esperienze, skill e progetti sono gestiti tramite file di dati, rendendo l'aggiornamento del portfolio semplice e veloce senza toccare il codice.

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
</p>

---

## 🚀 Come Iniziare

Per eseguire il progetto in locale, segui questi passaggi:

1.  **Clona il repository:**
    ```bash
    git clone https://github.com/zeltarave/portfolio.git
    cd portfolio
    ```

2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

3.  **Avvia il server di sviluppo:**
    ```bash
    npm run dev
    ```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser per vedere il risultato.

---

## 📈 Aggiornare i Contenuti

Grazie all'architettura data-driven, puoi aggiornare facilmente le sezioni del portfolio modificando i file nella directory `src/data`:

-   **Esperienze**: Modifica `src/data/experiences.ts`
-   **Certificazioni**: Modifica `src/data/certifications.ts`
-   **Competenze (Skills)**: Modifica `src/data/skills.ts`
-   **Progetti**: Modifica `src/data/projects.ts`

Il sito si aggiornerà automaticamente con i nuovi dati.