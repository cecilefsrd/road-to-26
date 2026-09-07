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
  // lieu précis puisque l'ordre change selon les équipes.
  stepArrivalMessages: [
    "Vous êtes arrivés à votre 1er lieu ! 🎯",
    "2e lieu en poche, vous assurez ! 🔥",
    "Lieu 3 validé, mi-parcours franchi ! 🚀",
    "4e lieu ! La fin approche... 👀",
    "Avant-dernier lieu, vous y êtes presque ! ✨",
    "Dernier lieu ! Après ça, direction la fête 🥂"
  ],

  intro: {
    title: "ROAD TO 26",
    subtitle: "26 ans. 6 lieux. 1 destination.",
    welcomeMessage: `Merci d'être avec moi pour fêter mon anniversaire ! Avant de tous se retrouver pour célébrer,
      je vous challenge un peu avec une chasse au trésor dans Paris 🗺️ Résolvez les énigmes, retrouvez les
      lieux, et laissez-vous guider jusqu'à la destination finale. J'espère que ça va vous plaire !
      Je suis trop contente de partager ce moment avec vous 💛 See you soon 🌟`,
    text: "Paris cache aujourd'hui quelque chose qui vous est destiné. Résolvez les énigmes, rejoignez les lieux, prouvez votre présence et récupérez vos fragments. Ils vous mèneront jusqu'à la destination finale.",
    meetingPoint: "Départ : devant le Fluctuat Nec Mergitur, 18 place de la République"
  },

  // Coordonnées et infos de la destination finale
  finalDestination: {
    name: "Bar 73",
    address: "138 avenue Parmentier, 75011 Paris",
    coords: { lat: 48.8691, lng: 2.3718 },
    successMessage: "Ce sont les bonnes coordonnées ! Rendez-vous au Bar 73, 138 avenue Parmentier. Je vous attends avec le champagne au frais 🥂🎉"
  },

  // Chaque position (A à H) attend un chiffre précis.
  // C'est ce qui permet à des équipes de collecter les fragments
  // dans n'importe quel ordre et de reconstituer la même coordonnée.
  expectedDigits: { A: "8", B: "6", C: "9", D: "1", E: "3", F: "7", G: "1", H: "8" },

  // -----------------------------------------------------------
  // LIEUX
  // -----------------------------------------------------------
  locations: {

    "pere-lachaise": {
      name: "Cimetière du Père-Lachaise",
      coords: { lat: 48.859969, lng: 2.389222 },
      riddleGo: `Je suis une ville dans la ville.<br><br>
        Mes habitants ne parlent plus, mais leurs noms voyagent encore dans le monde entier.
        Écrivains, artistes, musiciens, hommes politiques — des milliers de destins s'y croisent en silence.<br><br>
        Mes grilles se referment sur eux chaque soir ; vous, contentez-vous du mur.`,
      narrative: `Vous êtes devant l'un des cimetières les plus célèbres du monde. Inutile de franchir les grilles :
        votre indice se trouve directement sur le mur d'enceinte, sur le Monument aux Parisiens morts
        pendant la Première Guerre mondiale, inauguré en 2018. Il rend hommage aux 94 415 Parisiens morts
        et aux disparus de la Grande Guerre.`,
      fragments: [
        {
          position: "A",
          prompt: "Comptez, en milliers, ceux que la guerre a emportés sans même leur laisser une tombe où reposer.",
          answer: "8"
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
          position: "B",
          prompt: "Comptez les passerelles qui permettent aux piétons de sauter d'une rive à l'autre, sans jamais mouiller leurs pieds.",
          answer: "6"
        },
        {
          position: "C",
          prompt: "Ce sont elles qui font monter et descendre les bateaux, marche après marche, du niveau de la Seine à celui de la Villette. Combien le canal en compte-t-il ?",
          answer: "9"
        }
      ]
    },

    "belleville": {
      name: "Parc de Belleville",
      coords: { lat: 48.8716, lng: 2.3850 },
      riddleGo: `Il existe à Paris un endroit où l'on prend de la hauteur sans monter dans un immeuble.<br><br>
        Un endroit où Paris se dévoile sous vos yeux. Un endroit où poussent même des vignes.<br><br>
        Vous n'êtes pas à Montmartre. Trouvez le parc perché.`,
      narrative: `Créé en 1988 sur cette ancienne colline du nord-est parisien, le parc offre une vue dégagée
        sur toute la capitale. Mais ce qui vous intéresse pousse un peu plus bas : les vignes de Belleville,
        plantées de Pinot Meunier et de Chardonnay.`,
      fragments: [
        {
          position: "D",
          prompt: "Les pieds de vigne se comptent par centaines dans ce vignoble parisien. Ne retenez que le premier chiffre de leur nombre.",
          answer: "1"
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
          position: "F",
          prompt: "Sous cette colonne reposent des combattants tombés pour la liberté, en plusieurs centaines. Ne gardez que le premier chiffre de leur nombre.",
          answer: "7"
        }
      ]
    },

    "atelier-lumieres": {
      name: "Atelier des Lumières",
      coords: { lat: 48.8619, lng: 2.3769 },
      riddleGo: `Je suis né grâce au métal.<br><br>
        Pendant des décennies, on y forgeait machines et pièces dans la chaleur des fourneaux.
        Aujourd'hui, mes murs de fonte n'accueillent plus que des images, des couleurs et de la lumière.<br><br>
        Une ancienne fonderie du XIXe siècle, devenue toile géante — voilà ce que vous cherchez.`,
      narrative: `La fonderie du Chemin-Vert fut créée en 1835 par les frères Plichon. Après avoir connu
        différentes vies industrielles, le bâtiment s'est métamorphosé en cathédrale d'images et de lumière.`,
      fragments: [
        {
          position: "G-H",
          prompt: "Ce lieu a rouvert ses portes plusieurs printemps après le tournant du nouveau millénaire. Comptez ces printemps un à un, depuis l'an 2000 jusqu'à sa renaissance en atelier de lumière : c'est votre clé, à deux chiffres.",
          answer: "18",
          // Un fragment à 2 chiffres se répartit sur 2 positions.
          multiPosition: ["G", "H"]
        }
      ]
    }
  },

  // -----------------------------------------------------------
  // ÉQUIPES / PARCOURS
  // Chaque équipe visite les mêmes 6 lieux, dans un ordre différent.
  // Ajoute une équipe en copiant un bloc et en changeant l'ordre du "route".
  // -----------------------------------------------------------
  teams: [
    { id: 1, name: "Équipe 1", route: ["canal", "belleville", "pere-lachaise", "bastille", "maurice-gardette", "atelier-lumieres"] },
    { id: 2, name: "Équipe 2", route: ["canal", "pere-lachaise", "belleville", "bastille", "atelier-lumieres", "maurice-gardette"] },
    { id: 3, name: "Équipe 3", route: ["belleville", "canal", "pere-lachaise", "bastille", "maurice-gardette", "atelier-lumieres"] },
    { id: 4, name: "Équipe 4", route: ["pere-lachaise", "belleville", "canal", "bastille", "atelier-lumieres", "maurice-gardette"] },
    { id: 5, name: "Équipe 5", route: ["canal", "belleville", "bastille", "pere-lachaise", "maurice-gardette", "atelier-lumieres"] },
    { id: 6, name: "Équipe 6", route: ["bastille", "maurice-gardette", "atelier-lumieres", "pere-lachaise", "belleville", "canal"] }
  ]
};
