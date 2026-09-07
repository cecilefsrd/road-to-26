/* ============================================================
   LOGIQUE DE L'APPLICATION — ne pas éditer sauf pour changer
   le fonctionnement (pas les textes : ça, c'est content.js)
   ============================================================ */

const C = window.CONTENT;
const root = document.getElementById("app");

// ---------- Utilitaires ----------

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, "");
}

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---------- État persistant (localStorage) ----------

function stateKey(teamId) {
  return `roadTo26_team_${teamId}`;
}

function loadState(teamId) {
  const raw = localStorage.getItem(stateKey(teamId));
  if (raw) return JSON.parse(raw);
  return { stepIndex: 0, fragments: {}, locationUnlocked: false };
}

function saveState(teamId, state) {
  localStorage.setItem(stateKey(teamId), JSON.stringify(state));
}

// ---------- État global de session ----------

let currentTeamId = getParam("team") ? parseInt(getParam("team"), 10) : null;
if (!currentTeamId) {
  const stored = localStorage.getItem("roadTo26_currentTeam");
  if (stored) currentTeamId = parseInt(stored, 10);
}

let view = "loading"; // team-select | intro | go | check | fragments | final | recap
let geoError = "";
let answerErrors = {};

// ---------- Rendu ----------

function render() {
  root.innerHTML = "";

  if (view === "cover") {
    renderCover();
    return;
  }

  if (!currentTeamId) {
    renderTeamSelect();
    return;
  }

  const team = C.teams.find((t) => t.id === currentTeamId);
  if (!team) {
    renderTeamSelect();
    return;
  }

  const state = loadState(team.id);

  renderHeader(team, state);

  if (view === "recap") {
    renderRecap(team, state);
    return;
  }

  if (state.stepIndex >= team.route.length) {
    renderFinal(team, state);
    return;
  }

  const locId = team.route[state.stepIndex];
  const loc = C.locations[locId];

  if (view === "fragments" || state.locationUnlocked) {
    renderFragments(team, state, loc);
  } else {
    renderGoScreen(team, state, loc);
  }
}

function renderCover() {
  const wrap = el("div", "cover-screen");
  wrap.appendChild(el("div", "cover-rays"));
  wrap.appendChild(garlandSVG());

  const photoWrap = el("div", "cover-photo-wrap");
  const img = document.createElement("img");
  img.src = "assets/cover.jpg";
  img.alt = "Cécile";
  photoWrap.appendChild(img);
  wrap.appendChild(photoWrap);

  wrap.appendChild(el("h1", "cover-title", C.intro.title));
  wrap.appendChild(el("p", "cover-subtitle", C.intro.subtitle));
  wrap.appendChild(el("p", "cover-message", C.intro.welcomeMessage));
  wrap.appendChild(el("div", "cover-meeting", "📍 " + C.intro.meetingPoint));

  const ctaWrap = el("div", "cover-cta");
  const btn = el("button", "primary-btn", "Commencer la chasse 🎉");
  btn.onclick = () => {
    view = currentTeamId ? "go" : "team-select";
    render();
  };
  ctaWrap.appendChild(btn);
  wrap.appendChild(ctaWrap);

  root.appendChild(wrap);
}

function garlandSVG() {
  const colors = ["#FF8FAE", "#FFCBA0", "#FFE49C", "#9FDDB8", "#BFE0F2", "#D8C6F2"];
  let flags = "";
  const n = 9;
  for (let i = 0; i < n; i++) {
    const x = 20 + i * 44;
    flags += `<path d="M${x} 4 L${x + 20} 4 L${x + 10} 30 Z" fill="${colors[i % colors.length]}" />`;
  }
  const svgHTML = `
    <svg viewBox="0 0 420 34" width="100%" height="34" preserveAspectRatio="xMidYMin meet">
      <path d="M0 4 Q210 -6 420 4" stroke="#E8B7C4" stroke-width="2" fill="none" />
      ${flags}
    </svg>`;
  return el("div", "cover-garland", "", svgHTML);
}

function checkIconSVG() {
  return `
    <svg class="check-icon" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#9FDDB8" />
      <path d="M20 33 L28 41 L45 23" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`;
}

function checkIconSmall() {
  return `
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" style="flex-shrink:0;">
      <circle cx="32" cy="32" r="30" fill="#45B87A" />
      <path d="M20 33 L28 41 L45 23" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`;
}

function renderTeamSelect() {
  const wrap = el("div", "screen team-select");
  wrap.appendChild(el("div", "eyebrow", "Choisis ton équipe"));
  wrap.appendChild(el("h1", "title", "C'est parti !"));

  const grid = el("div", "team-grid");
  C.teams.forEach((t) => {
    const btn = el("button", "team-btn", t.name);
    btn.onclick = () => {
      currentTeamId = t.id;
      localStorage.setItem("roadTo26_currentTeam", t.id);
      view = "go";
      render();
    };
    grid.appendChild(btn);
  });
  wrap.appendChild(grid);
  root.appendChild(wrap);
}

function renderHeader(team, state) {
  const header = el("div", "app-header");
  header.appendChild(el("span", "team-name", team.name));
  const total = team.route.length;
  const done = Math.min(state.stepIndex, total);
  header.appendChild(el("span", "progress", `${done} / ${total} lieux`));
  root.appendChild(header);

  const bar = el("div", "progress-bar");
  const fill = el("div", "progress-bar-fill");
  fill.style.width = `${(done / total) * 100}%`;
  bar.appendChild(fill);
  root.appendChild(bar);
}

function renderGoScreen(team, state, loc) {
  const wrap = el("div", "screen");
  wrap.appendChild(el("div", "eyebrow", "Prochain lieu"));
  wrap.appendChild(el("div", "riddle-card", "", loc.riddleGo));

  const btn = el("button", "primary-btn", "📍 Je suis sur place");
  btn.onclick = () => checkLocation(team, state, loc);
  wrap.appendChild(btn);

  if (geoError) {
    wrap.appendChild(el("div", "error-box", geoError));
  }

  const recapLink = el("button", "link-btn", "Voir mes fragments");
  recapLink.onclick = () => {
    view = "recap";
    render();
  };
  wrap.appendChild(recapLink);

  root.appendChild(wrap);
}

function checkLocation(team, state, loc) {
  geoError = "";
  if (!navigator.geolocation) {
    geoError = "Ton téléphone ne partage pas sa position. Active la localisation et réessaie.";
    render();
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const dist = haversineMeters(here, loc.coords);
      const radius = C.defaultRadius || 200;
      if (dist > radius) {
        geoError = `Vous êtes trop loin du lieu, approchez-vous encore un peu 🧭 (environ ${Math.round(dist)} m à faire)`;
        render();
      } else {
        state.locationUnlocked = true;
        saveState(team.id, state);
        view = "fragments";
        render();
      }
    },
    () => {
      geoError = "Impossible de récupérer ta position. Vérifie que la localisation est activée pour ce site.";
      render();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function renderFragments(team, state, loc) {
  const wrap = el("div", "screen");
  wrap.appendChild(el("div", "eyebrow", loc.name));
  wrap.appendChild(el("div", "confirmed-banner", "", `${checkIconSmall()} Vous y êtes ! Localisation confirmée`));
  wrap.appendChild(el("div", "narrative-card", "", loc.narrative));

  const form = el("div", "fragment-form");
  const inputs = [];

  loc.fragments.forEach((frag, i) => {
    const block = el("div", "fragment-block");
    block.appendChild(el("p", "fragment-prompt", frag.prompt));
    const input = document.createElement("input");
    input.type = "text";
    input.className = "fragment-input";
    input.placeholder = "Votre réponse";
    input.dataset.index = i;
    if (answerErrors[i]) block.classList.add("has-error");
    inputs.push(input);
    block.appendChild(input);
    form.appendChild(block);
  });

  wrap.appendChild(form);

  if (Object.keys(answerErrors).length > 0) {
    wrap.appendChild(el("div", "error-box", "Ce n'est pas tout à fait ça, réessayez 🔍"));
  }

  const btn = el("button", "primary-btn", "Valider les fragments");
  btn.onclick = () => validateFragments(team, state, loc, inputs);
  wrap.appendChild(btn);

  root.appendChild(wrap);
}

function validateFragments(team, state, loc, inputs) {
  answerErrors = {};
  let allCorrect = true;

  loc.fragments.forEach((frag, i) => {
    const val = normalize(inputs[i].value);
    if (val !== normalize(frag.answer)) {
      answerErrors[i] = true;
      allCorrect = false;
    }
  });

  if (!allCorrect) {
    render();
    return;
  }

  // Tous les fragments sont corrects : on les enregistre
  loc.fragments.forEach((frag) => {
    if (frag.multiPosition) {
      // ex: "18" -> G:"1", H:"8"
      frag.multiPosition.forEach((pos, idx) => {
        state.fragments[pos] = frag.answer[idx];
      });
    } else {
      state.fragments[frag.position] = frag.answer;
    }
  });

  state.stepIndex += 1;
  state.locationUnlocked = false;
  saveState(team.id, state);
  answerErrors = {};
  geoError = "";
  view = "success";
  renderSuccess(team, state, loc);
}

function renderSuccess(team, state, loc) {
  root.innerHTML = "";
  renderHeader(team, state);

  const wrap = el("div", "screen success-screen");
  wrap.appendChild(el("div", "", "", checkIconSVG()));
  wrap.appendChild(el("h2", "success-title", "Fragment récupéré !"));

  const positions = loc.fragments.flatMap((f) => f.multiPosition || [f.position]);
  const digits = loc.fragments.flatMap((f) =>
    f.multiPosition ? f.multiPosition.map((p, idx) => f.answer[idx]) : [f.answer]
  );

  positions.forEach((pos, i) => {
    const tag = el(
      "div",
      "seal",
      "",
      `<span class="seal-pos">${pos}</span><span class="seal-digit">${digits[i]}</span>`
    );
    wrap.appendChild(tag);
  });

  wrap.appendChild(
    el(
      "p",
      "success-note",
      "Ces fragments correspondent aux positions indiquées ci-dessus. Gardez-les bien précieusement !"
    )
  );

  const btn = el(
    "button",
    "primary-btn",
    state.stepIndex >= team.route.length ? "Voir l'écran final" : "Étape suivante"
  );
  btn.onclick = () => {
    view = "go";
    render();
  };
  wrap.appendChild(btn);

  root.appendChild(wrap);
}

function renderRecap(team, state) {
  const wrap = el("div", "screen");
  wrap.appendChild(el("div", "eyebrow", "Mes fragments"));

  if (Object.keys(state.fragments).length === 0) {
    wrap.appendChild(el("p", "meeting", "Aucun fragment récupéré pour l'instant."));
  } else {
    const grid = el("div", "seal-grid");
    C.positions_ordered().forEach((pos) => {
      if (state.fragments[pos]) {
        const tag = el(
          "div",
          "seal",
          "",
          `<span class="seal-pos">${pos}</span><span class="seal-digit">${state.fragments[pos]}</span>`
        );
        grid.appendChild(tag);
      }
    });
    wrap.appendChild(grid);
  }

  const back = el("button", "primary-btn", "Retour à la chasse");
  back.onclick = () => {
    view = "go";
    render();
  };
  wrap.appendChild(back);

  root.appendChild(wrap);
}

function renderFinal(team, state) {
  const wrap = el("div", "screen final-screen");
  wrap.appendChild(el("div", "eyebrow", "Assemblage final"));
  wrap.appendChild(
    el(
      "p",
      "meeting",
      "Vous avez tous les fragments. Reconstituez les coordonnées GPS du lieu final en remplissant chaque case."
    )
  );

  const grid = el("div", "assembly-grid");
  const positions = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const inputs = {};
  positions.forEach((pos) => {
    const cell = el("div", "assembly-cell");
    cell.appendChild(el("span", "assembly-label", pos));
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.className = "assembly-input";
    inputs[pos] = input;
    cell.appendChild(input);
    grid.appendChild(cell);
  });
  wrap.appendChild(grid);

  const errorBox = el("div", "error-box hidden", "Vérifiez vos fragments, quelque chose ne colle pas.");
  wrap.appendChild(errorBox);

  const successBox = el("div", "final-success hidden");
  wrap.appendChild(successBox);

  const btn = el("button", "primary-btn", "Reconstituer les coordonnées");
  btn.onclick = () => {
    let allMatch = true;
    positions.forEach((pos) => {
      if (normalize(inputs[pos].value) !== normalize(C.expectedDigits[pos])) {
        allMatch = false;
      }
    });
    if (!allMatch) {
      errorBox.classList.remove("hidden");
      successBox.classList.add("hidden");
    } else {
      errorBox.classList.add("hidden");
      const d = C.finalDestination;
      successBox.innerHTML = `
        ${checkIconSVG()}
        <p class="final-coords">48.${positions.slice(0,4).map(p=>inputs[p].value).join("")} , 2.${positions.slice(4,8).map(p=>inputs[p].value).join("")}</p>
        <p class="final-name">${d.name}</p>
        <p class="final-address">${d.address}</p>
        <p class="final-message">${d.successMessage}</p>
        <a class="map-link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${d.coords.lat},${d.coords.lng}">Ouvrir dans Google Maps →</a>
      `;
      successBox.classList.remove("hidden");
    }
  };
  wrap.appendChild(btn);

  root.appendChild(wrap);
}

// ---------- Helper création d'éléments ----------

function el(tag, className, text, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  else if (text !== undefined) e.textContent = text;
  return e;
}

C.positions_ordered = function () {
  return ["A", "B", "C", "D", "E", "F", "G", "H"];
};

// ---------- Démarrage ----------

view = "cover";
render();
