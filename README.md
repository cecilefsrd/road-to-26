# Road to 26 — Chasse au trésor

Site statique (HTML/CSS/JS pur, aucune installation nécessaire) pour la chasse au trésor.

## 1. Mettre le site en ligne (GitHub Pages, gratuit)

1. Va sur [github.com](https://github.com) et crée un compte si tu n'en as pas.
2. Clique sur **"New repository"**, donne-lui un nom (ex: `road-to-26`), coche **Public**, ne coche rien d'autre, puis **Create repository**.
3. Sur la page du repo vide, clique sur **"uploading an existing file"**.
4. Glisse-dépose les 6 fichiers de ce dossier (`index.html`, `style.css`, `app.js`, `content.js`, `README.md`, `cover.jpg`).
5. Clique **Commit changes**.
6. Va dans l'onglet **Settings** du repo → section **Pages** (dans le menu de gauche) → sous "Build and deployment", choisis **Deploy from a branch**, branche `main`, dossier `/ (root)` → **Save**.
7. Attends 1-2 minutes. Ton site sera accessible à une adresse du type :
   `https://TON-PSEUDO-GITHUB.github.io/road-to-26/`

## 2. Modifier les textes plus tard (sans me redemander de refaire le code)

**Tout le contenu éditable est dans `content.js`** : les énigmes, les réponses, les textes narratifs, les équipes/parcours, la destination finale.

Pour éditer directement sur GitHub :
1. Ouvre `content.js` dans ton repo.
2. Clique sur l'icône **crayon** (en haut à droite du fichier) pour l'éditer.
3. Modifie le texte entre guillemets ou backticks (`` ` ``) — ne touche pas aux virgules, accolades `{}` et deux-points `:`, ils font fonctionner le code.
4. En bas de la page, clique **Commit changes**.
5. Le site se met à jour tout seul en 1-2 minutes.

Tu ne devrais **jamais** avoir besoin d'ouvrir `app.js` ou `style.css` pour changer un texte, une réponse, ou un parcours d'équipe.

### Ajouter une équipe / un parcours
Dans `content.js`, section `teams`, copie une ligne et change le `id`, le `name`, et l'ordre des lieux dans `route` (les identifiants possibles : `pere-lachaise`, `canal`, `belleville`, `maurice-gardette`, `bastille`, `atelier-lumieres`).

### Changer le rayon de détection GPS
Modifie `defaultRadius` en haut de `content.js` (en mètres). Actuellement 200m, volontairement large.

## 3. Donner le lien à chaque équipe (QR codes)

Chaque équipe peut avoir un lien direct qui saute l'écran de sélection :

```
https://TON-PSEUDO-GITHUB.github.io/road-to-26/?team=1
https://TON-PSEUDO-GITHUB.github.io/road-to-26/?team=2
... jusqu'à ?team=6
```

Pour générer un QR code par équipe : va sur un générateur gratuit comme [qr-code-generator.com](https://www.qr-code-generator.com) ou [qrcode-monkey.com](https://www.qrcode-monkey.com), colle chaque lien, télécharge l'image.

Si tu préfères, tu peux aussi juste donner le lien général du site (sans `?team=`) : chaque équipe verra alors l'écran de sélection et cliquera sur son propre nom.

## 4. Tester avant le jour J

- Le bouton "Je suis sur place" utilise la géolocalisation du téléphone : teste-le toi-même sur chaque lieu, ou en te tenant à proximité, pour vérifier que le rayon (200m par défaut) fonctionne bien.
- Si le navigateur demande d'autoriser la localisation, il faut accepter — sinon le bouton ne pourra pas vérifier la position.
- La progression est sauvegardée automatiquement sur le téléphone de chaque équipe (même après fermeture du navigateur), donc pas de souci si quelqu'un ferme l'appli par erreur.
