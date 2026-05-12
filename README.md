# Crossword Solver

A web app that helps you finish crosswords, scrabble-style puzzles and anagrams. Tell it the length of the word, any letters you already know and the pool of letters available to you — it returns every dictionary word that fits.

Supports **English** and **Russian** vocabularies out of the box.

## Features

- Pattern matching by word length and known letter positions (`*` acts as a wildcard).
- Constraint by an available "letters kit" — only words that can be assembled from the given letters are returned (duplicates respected).
- Two languages with auto-detected UI locale (`react-i18next` + browser detector).
- Compressed dictionaries (`.json.gz`, ~1 MB for EN, ~4.5 MB for RU) decompressed in-browser via [`fflate`](https://github.com/101arrowz/fflate).
- Offline-friendly: dictionaries are cached in IndexedDB through [`localforage`](https://github.com/localForage/localForage) and re-fetched only when the MD5 hash changes.
- Debounced search so typing stays responsive on large dictionaries.

## How it works

1. On language change the app loads `public/locales/<lang>/vocabulary_<lang>.json.gz`.
2. The blob is decompressed and parsed into a flat array of words.
3. `findWord` builds a regex from the target pattern (filling wildcards with the union of available letters) and filters the vocabulary, then drops candidates that would require more copies of a letter than the kit provides.
4. The result list re-renders via MUI's `Autocomplete` (read-only).

Vocabulary integrity is verified through a build-time step (`parse_vocabularies.js`) that walks `public/locales/`, hashes each `.json.gz` and writes the result to `src/vocabularies.json`. The runtime compares this hash with the cached one before reusing a stored dictionary.

## Tech stack

- **React 18** + **TypeScript** (Create React App)
- **MUI v5** with `styled-components` engine
- **i18next** / `react-i18next` for localization
- **axios**, **fflate**, **js-md5**, **localforage**, **lodash.debounce**, **ts-pattern**
- **Yarn 3 (Berry)** as package manager
- **Husky** + **lint-staged** + **Prettier** for pre-commit formatting

## Getting started

Requirements: Node.js 16+ and Yarn 3 (the repo pins `yarn@3.6.1` via `packageManager`).

```bash
yarn install
yarn start
```

The dev server runs on [http://localhost:3000](http://localhost:3000). `yarn start` also runs `parse_vocabularies.js` first, so vocabulary hashes are always in sync with the files on disk.

## Scripts

| Command      | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `yarn start` | Regenerate vocabulary hashes and start the CRA dev server. |
| `yarn build` | Production build to `build/`.                              |
| `yarn test`  | Run the CRA test runner in watch mode.                     |
| `yarn eject` | Eject CRA configuration (one-way).                         |

## Project structure

```
src/
├── App.tsx                  # Top-level layout, i18n wiring, language selector
├── i18n.ts                  # i18next init (HTTP backend + language detector)
├── components/
│   ├── AppHeader/           # Header with language switcher
│   ├── Main/                # Inputs, pattern boxes and result list
│   └── Footer/
├── constants/constants.ts   # Per-language regex validation + flag icons
├── types/types.ts           # Languages enum and storage types
├── ui/                      # Shared icons (flags, close button…)
├── utils/
│   ├── findWord.ts          # Core matching algorithm
│   ├── getVocabulary.ts     # Fetch, decompress, hash, cache
│   └── useExternalScripts.ts
└── vocabularies.json        # Generated: { language, hash } pairs
public/
└── locales/
    ├── en/                  # translation.json + vocabulary_en.json.gz
    └── ru/                  # translation.json + vocabulary_ru.json.gz
parse_vocabularies.js        # Generates src/vocabularies.json from public/locales
```

## Adding a new language

1. Drop a gzipped wordlist at `public/locales/<lang>/vocabulary_<lang>.json.gz` (an array of lowercase strings encoded as JSON, then gzipped).
2. Add a `translation.json` next to it with the UI strings.
3. Extend `Languages` in `src/types/types.ts` and `LanguagesStructure` in `src/constants/constants.ts` with a flag icon and a `validation` regex that matches a single letter of the new alphabet.
4. Restart `yarn start` — `parse_vocabularies.js` will pick up the new file and refresh `src/vocabularies.json`.

## Deployment

The project is configured for Vercel (uses `@vercel/analytics`). Any static host that serves the contents of `build/` works — the app is fully client-side and only needs the `locales/` directory served alongside the bundle.
