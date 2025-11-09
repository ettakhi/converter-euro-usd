# Convertisseur EUR ⇄ USD

Application React (Vite + TypeScript + TailwindCSS) qui simule en temps réel un taux de change Euro / Dollar, permet les conversions bidirectionnelles, le verrouillage manuel du taux (désactivé automatiquement si l’écart dépasse 2 %) et conserve l’historique des 5 dernières conversions.

## Présentation rapide

- **Taux en direct** : un polling toutes les 3 s applique une variation aléatoire sur la base 1,10. Le header affiche la tendance (hausse/baisse/stable).
- **Convertisseur bi-directionnel** : le champ d’entrée suit la devise choisie (switch avec drapeaux). Le montant calculé présente systématiquement le symbole monétaire en suffixe.
- **Taux manuel** : une simple checkbox verrouille le taux saisi tant que l’écart avec le taux réel reste < 2 %. Au-delà, l’app repasse automatiquement sur le taux réel avec un message d’alerte.
- **Historique** : liste des 5 requêtes les plus récentes avec horodatage, taux réel, taux saisi et montants d’entrée/sortie.
- **Responsive** : layout pensé pour mobile et desktop (cartes superposées puis grille 3/2 colonnes).

👉 Démo GitHub Pages : [https://ettakhi.github.io/converter-euro-usd](https://ettakhi.github.io/converter-euro-usd)

## Structure du code

```
src/
├── components/         # UI atomiques : RateHeader, ConversionPanel, ManualRateCard, HistoryTable
├── constants/          # Drapeaux, libellés, symboles et helpers de format monétaire
├── hooks/              # useLiveRate (polling) & useManualRate (verrou et drift 2 %)
├── utils/              # formatters communs + helpers de conversion des taux
├── types.ts            # Types partagés (Currency, HistoryEntry, RateDirection…)
└── App.tsx             # Orchestration : états montant/devise, historique et rendu des composants
```

Chaque composant reçoit uniquement les données dont il a besoin (ex. ConversionPanel se concentre sur les montants, ManualRateCard gère sa checkbox). Les hooks personnalisés isolent la logique métier :

- `useLiveRate` gère l’intervalle et expose `{ realRate, rateDirection }`.
- `useManualRate` centralise la saisie, le verrouillage, le message utilisateur et l’écart vs taux réel, tout en conservant le taux canonique (EUR→USD) comme source de vérité.

## Lancer le projet en local

```bash
# 1. Installer les dépendances (utilise un cache local déjà prêt dans le repo)
npm install

# 2. Démarrer le serveur de dev
npm run dev
# => http://localhost:5173

# 3. Build de production (utilisé pour GitHub Pages)
npm run build

# 4. (Optionnel) Prévisualiser le build
npm run preview
```

La commande `npm run build` génère le dossier `dist/` prêt à être publié (via GitHub Pages ou autre hébergeur statique).

## Notes complémentaires

- Tailwind est configuré via `tailwind.config.js` avec une palette sombre adaptée aux cartes et un import de la police Inter dans `src/index.css`.
- Les conversions conservent la continuité : lorsqu’on change la devise du champ d’entrée, l’app réinjecte automatiquement la valeur précédemment calculée dans l’autre devise.
- `todo.md` liste les améliorations rapides (tests unitaires, API temps réel, persistance historique) et `roadmap.md` propose les pistes moyen‑terme (multi-devises, graphiques, alertes, etc.).
