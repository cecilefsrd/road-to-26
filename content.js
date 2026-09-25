/* ============================================================
   CONTENU DE LA CHASSE AU TRÉSOR — ROAD TO 26
   ============================================================
   Ce fichier contient TOUS les textes, énigmes, réponses et
   coordonnées. C'est le seul fichier à modifier pour changer
   le contenu : pas besoin de toucher à app.js ou style.css.

   Comment éditer sur GitHub (sans rien installer) :
   1. Va sur ton repo GitHub, ouvre ce fichier "content.js"
   2. Clique sur l'icône crayon (Edit) en haut à droite
   3. Modifie le texte entre les guillemets / backticks
   4. En bas de page, clique "Commit changes"
   5. Le site se met à jour automatiquement en 1-2 min
   ============================================================ */

window.CONTENT = {

  // Rayon (en mètres) dans lequel une équipe est considérée
  // "sur place". Volontairement large pour la marge d'erreur GPS.
  defaultRadius: 200,

  // Messages d'ambiance affichés à l'arrivée de chaque lieu, dans l'ordre
  // de PROGRESSION (1er lieu visité, 2e lieu visité...) — pas liés à un
  // lieu précis puisque l'ordre change selon les équipes. 5 lieux au total.
  stepArrivalMessages: [
    "Vous êtes arrivés à votre 1er lieu ! 🎯",
    "2e lieu en poche, vous assurez ! 🔥",
    "Mi-parcours franchi, ça avance bien ! 🚀",
    "Avant-dernier lieu, vous y êtes presque ! ✨",
    "Dernier lieu ! Après ça, direction la fête 🥂"
  ],

  intro: {
    title: "ROAD TO 26",
    subtitle: "26 ans. 5 lieux. 1 destination.",
    welcomeMessage: `Merci d'être avec moi pour fêter mon anniversaire ! Avant de tous se retrouver pour célébrer,
      je vous challenge un peu avec une chasse au trésor dans Paris 🗺️ Résolvez les énigmes, retrouvez les
      lieux, et laissez-vous guider jusqu'à la destination finale. J'espère que ça va vous plaire !
      Je suis trop contente de partager ce moment avec vous 💛 See you soon 🌟`,
    text: "Paris cache aujourd'hui quelque chose qui vous est destiné. Résolvez les énigmes, rejoignez les lieux, prouvez votre présence et récupérez vos fragments. Ils vous mèneront jusqu'à la destination finale.",
    meetingPoint: "Départ : devant le Fluctuat Nec Mergitur, 18 place de la République"
  },

  // Coordonnées et infos de la destination finale
  finalDestination: {
    name: "Lange",
    address: "8 rue Paradis, 75010 Paris",
    coords: { lat: 48.8746, lng: 2.3544 },
    logo: "lange-logo.jpg",
    successMessage: "Ce sont les bonnes coordonnées ! Rendez-vous à Lange, 8 rue Paradis. Je vous attends avec le champagne au frais 🥂🎉"
  },

  // Chaque position (A à H) attend un chiffre précis.
  // C'est ce qui permet à des équipes de collecter les fragments
  // dans n'importe quel ordre et de reconstituer la même coordonnée.
  expectedDigits: { A: "8", B: "7", C: "4", D: "6", E: "3", F: "5", G: "4", H: "4" },

  // -----------------------------------------------------------
  // LIEUX (5 au total — Bastille est le départ commun à toutes les équipes)
  // -----------------------------------------------------------
  locations: {

    "bastille": {
      name: "Place de la Bastille",
      coords: { lat: 48.8531, lng: 2.3696 },
      riddleGo: `Ici, des pierres ont été rasées pour qu'un peuple respire.<br><br>
        À leur place, une aiguille de bronze s'élance vers le ciel, couronnée d'un messager doré,
        prêt à s'envoler.<br><br>
        Sous ses pieds, le sol garde le souvenir de ceux qui ne l'ont jamais quitté.`,
      narrative: `Au centre de la place se dresse la Colonne de Juillet, élevée en mémoire des victimes des
        journées révolutionnaires de 1830. Mais le monument cache une particularité : ce n'est pas qu'une
        colonne commémorative, c'est aussi une nécropole.`,
      fragments: [
        {
          position: "B",
          prompt: "Sous cette colonne reposent des combattants tombés pour la liberté, en plusieurs centaines. Ne gardez que le premier chiffre de leur nombre.",
          answer: "7"
        },
        {
          position: "G",
          prompt: "Tout en haut de la colonne, un ange doré s'élance, flambeau en main. Lui seul, sans son piédestal de bronze : combien mesure-t-il, en mètres ?",
          answer: "4"
        }
      ]
    },

    "pere-lachaise": {
      name: "Cimetière du Père-Lachaise",
      coords: { lat: 48.859969, lng: 2.389222 },
      riddleGo: `Je suis une ville dans la ville.<br><br>
        Mes habitants ne parlent plus, mais leurs noms voyagent encore dans le monde entier.
        Écrivains, artistes, musiciens, hommes politiques — des milliers de destins s'y croisent en silence.<br><br>
        Mes grilles se referment sur eux chaque soir ; vous, contentez-vous du mur.`,
      narrative: `Vous êtes devant l'un des cimetières les plus célèbres du monde. Inutile de franchir les grilles :
        votre indice se trouve directement sur le mur d'enceinte, sur le Monument aux Parisiens morts
        pendant la Première Guerre mondiale, inauguré en 2018.`,
      fragments: [
        {
          position: "A",
          prompt: "Comptez, en milliers, ceux que la guerre a emportés sans même leur laisser une tombe où reposer.",
          answer: "8"
        },
        {
          position: "F",
          prompt: "Sur cette même pierre, un autre nombre, bien plus grand, compte cette fois les morts au combat. Ne gardez que son tout dernier chiffre.",
          answer: "5"
        }
      ]
    },

    "atelier-lumieres": {
      name: "Atelier des Lumières",
      coords: { lat: 48.8616, lng: 2.3808 },
      riddleGo: `Je suis né grâce au métal.<br><br>
        Pendant des décennies, on y forgeait machines et pièces dans la chaleur des fourneaux.
        Aujourd'hui, mes murs de fonte n'accueillent plus que des images, des couleurs et de la lumière.<br><br>
        Une ancienne fonderie du XIXe siècle, devenue toile géante — voilà ce que vous cherchez.`,
      narrative: `La fonderie du Chemin-Vert fut créée en 1835 par les frères Plichon. Après avoir connu
        différentes vies industrielles, le bâtiment s'est métamorphosé en cathédrale d'images et de lumière.`,
      fragments: [
        {
          position: "H",
          prompt: "Ce lieu ne dessine rien sans toute une armée de projecteurs — un nombre à trois chiffres. Gardez celui du milieu.",
          answer: "4"
        }
      ]
    },

    "maurice-gardette": {
      name: "Square Maurice-Gardette",
      coords: { lat: 48.8617, lng: 2.3791 },
      riddleGo: `Cherchez un jardin caché au cœur du quartier.<br><br>
        Un kiosque à musique y attend les passants — mais ce n'est pas lui que vous devez trouver.
        Dans les allées se cache un homme : il travaille la terre, il porte une botte de gerbes.<br><br>
        Trouvez le square où veille le Botteleur.`,
      narrative: `Le square occupe l'ancien emplacement de l'abattoir de Ménilmontant, ouvert en 1815 puis
        détruit en 1867. Aujourd'hui, votre attention doit se porter sur une sculpture : Le Botteleur,
        œuvre de Jacques Perrin. Regardez bien cet homme au travail — et ce qui pousse à ses côtés.`,
      fragments: [
        {
          position: "E",
          prompt: "Une curiosité végétale se cache dans le square : des arbres remarquables, venus de Byzance, dont on ne trouve que quelques pieds ici. Combien en compte-t-on ?",
          answer: "3"
        }
      ]
    },

    "canal": {
      name: "Canal Saint-Martin",
      coords: { lat: 48.8719, lng: 2.3646 },
      riddleGo: `Je traverse Paris sans être une rue.<br><br>
        Je transporte des bateaux sans être la Seine.
        Mes portes s'ouvrent et se ferment, mes passerelles permettent de me traverser,
        et une partie de mon parcours disparaît sous les rues de Paris.<br><br>
        Napoléon est à l'origine de mon histoire. Qui suis-je ?`,
      narrative: `Long de 4,5 kilomètres, le canal relie le bassin de la Villette à la Seine. Une partie de
        son parcours passe aujourd'hui sous les boulevards parisiens. Inauguré en 1825, il vit rythmé par
        ses portes qui s'ouvrent et se referment, et par les silhouettes qui le traversent d'une rive à l'autre.`,
      fragments: [
        {
          position: "D",
          prompt: "Comptez les passerelles qui permettent aux piétons de sauter d'une rive à l'autre, sans jamais mouiller leurs pieds.",
          answer: "6"
        },
        {
          position: "C",
          prompt: "D'autres traversées existent, plus rares : des ponts qui préfèrent pivoter plutôt que de se laisser enjamber. Combien le canal en compte-t-il ? Retirez ce nombre de celui des passerelles.",
          answer: "4"
        }
      ]
    }
  },

  // -----------------------------------------------------------
  // ÉQUIPES / PARCOURS
  // Toutes les équipes commencent par Bastille, puis divergent sur les
  // 4 lieux restants avant de converger vers le Canal, juste avant l'arrivée.
  // -----------------------------------------------------------
  teams: [
    { id: 1, name: "Équipe 1", route: ["bastille", "pere-lachaise", "atelier-lumieres", "maurice-gardette", "canal"] },
    { id: 2, name: "Équipe 2", route: ["bastille", "pere-lachaise", "maurice-gardette", "atelier-lumieres", "canal"] },
    { id: 3, name: "Équipe 3", route: ["bastille", "maurice-gardette", "atelier-lumieres", "pere-lachaise", "canal"] },
    { id: 4, name: "Équipe 4", route: ["bastille", "atelier-lumieres", "pere-lachaise", "maurice-gardette", "canal"] }
  ]
};
