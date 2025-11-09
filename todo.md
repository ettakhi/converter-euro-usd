# Todo

- [ ] Connecter le taux réel à une API de marché pour remplacer la simulation pseudo-aléatoire actuelle.
- [ ] Couvrir la logique critique (générateur de taux, bascule devise, verrou manuel) avec des tests unitaires.
- [ ] Ajouter des tests E2E rapides pour vérifier l’auto-désactivation du taux manuel (>2 %) et la continuité des montants après switch.
- [ ] Améliorer l’accessibilité (focus visibles, annonces ARIA pour les alertes de taux, navigation clavier sur le switch).
- [ ] Persister l’historique (localStorage / backend) afin de garder les 5 dernières conversions après rechargement.
