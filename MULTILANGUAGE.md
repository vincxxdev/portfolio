# 🚀 Quick Start - Multilanguage Support

## Lingue Disponibili

- 🇮🇹 **Italiano** (default) - `http://localhost:3000/it`
- 🇬🇧 **English** - `http://localhost:3000/en`

## Come Cambiare Lingua

Gli utenti possono cambiare lingua in due modi:

1. **Language Switcher**: Clicca sull'icona 🌐 nella navbar (desktop) o nel menu mobile
2. **URL diretta**: Visita direttamente `/it` o `/en`

## Aggiungere Traduzioni

### 1. Trova il file di traduzione

- Italiano: `messages/it.json`
- Inglese: `messages/en.json`

### 2. Aggiungi la chiave di traduzione

```json
{
  "mySection": {
    "title": "Titolo della sezione",
    "description": "Descrizione"
  }
}
```

### 3. Usa nel componente

```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('mySection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## Struttura dei File

```
portfolio/
├── messages/              # File di traduzione
│   ├── it.json           # Traduzioni italiane
│   └── en.json           # Traduzioni inglesi
├── src/
│   ├── i18n/             # Configurazione i18n
│   │   ├── routing.ts    # Definizione route e locales
│   │   └── request.ts    # Configurazione next-intl
│   ├── middleware.ts     # Gestione routing multi-lingua
│   └── app/
│       └── [locale]/     # Pagine con supporto multi-lingua
│           ├── layout.tsx
│           └── page.tsx
└── docs/
    └── I18N.md          # Documentazione completa i18n
```

## Note Importanti

⚠️ Tutti i componenti client che usano traduzioni devono essere dentro `[locale]/` per accedere al context di next-intl.

✅ Il middleware gestisce automaticamente il redirect alla lingua appropriata basato sulle preferenze del browser.

📖 Per documentazione completa, vedi: `docs/I18N.md` o `IMPLEMENTATION_I18N.md`
