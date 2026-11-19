import { CHALLENGES, getItems } from './challenges.js';
import { createChallengeCycle, shuffle } from './challenge-cycle.js';
import { isCorrectPlacement, starsForFirstTry } from './rules.js';

const app = document.querySelector('#app');
const challengeCycle = createChallengeCycle(CHALLENGES);
const state = { screen: 'menu', challenge: null, items: [], index: 0, firstTryCount: 0, attempts: 0, placed: {}, feedback: '', transitioning: false };
let transitionTimer;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function renderMenu() {
  window.clearTimeout(transitionTimer);
  state.screen = 'menu';
  app.innerHTML = `<section class="page" aria-labelledby="menu-title">
    <h1 id="menu-title">Juguem a classificar!</h1>
    <p class="intro">A cada ronda t’espera un repte diferent. Mira els exemples i ordena sis dibuixos.</p>
    <button class="primary" type="button" data-action="start">Comença a jugar</button>
  </section>`;
  app.querySelector('[data-action="start"]').addEventListener('click', startRound);
}

function startRound() {
  window.clearTimeout(transitionTimer);
  state.screen = 'round';
  state.challenge = challengeCycle.next();
  state.items = shuffle(getItems(state.challenge));
  state.index = 0;
  state.firstTryCount = 0;
  state.attempts = 0;
  state.transitioning = false;
  state.placed = Object.fromEntries(state.challenge.groups.map(group => [group.id, []]));
  state.feedback = '';
  renderRound();
}

function renderRound() {
  const challenge = state.challenge;
  if (state.index >= state.items.length) return renderResult();
  const item = state.items[state.index];
  const completed = Object.values(state.placed).reduce((sum, list) => sum + list.length, 0);
  app.innerHTML = `<section class="page" aria-labelledby="round-title" data-screen="round" data-challenge="${challenge.id}">
    <div class="round-top"><p id="round-title"><strong>${escapeHtml(challenge.label)}</strong></p><button class="secondary" type="button" data-action="menu">INICI</button></div>
    <div class="progress" role="progressbar" aria-label="Progrés de la ronda" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${completed}"><div class="progress-fill" style="width:${(completed / 6) * 100}%"></div></div>
    <p class="prompt">${escapeHtml(challenge.prompt)} <strong>${state.index + 1} de ${state.items.length}</strong></p>
    <div class="sorting-area">${challenge.groups.map(group => `<button class="target" type="button" data-target="${group.id}" aria-label="${escapeHtml(group.label)}. Exemple: ${group.examples.join(' ')}" ${state.transitioning ? 'disabled' : ''}>
      <span class="target-heading"><span class="target-cue" aria-hidden="true">${group.cue}</span><span class="target-name">${escapeHtml(group.label)}</span></span>
      <span class="target-examples" aria-hidden="true">${group.examples.join('')}</span>
      <span class="target-items" aria-label="Elements classificats">${state.placed[group.id].join('')}</span>
    </button>`).join('')}</div>
    <div class="item-tray" role="group" aria-label="Safata de dibuixos"><span class="tray-label">Safata</span>${state.items.slice(state.index).map((trayItem, offset) => offset === 0
      ? `<button class="tray-item active-item" type="button" draggable="${!state.transitioning}" data-item aria-label="Dibuix actiu: ${trayItem.emoji}" ${state.transitioning ? 'disabled' : ''}>${trayItem.emoji}</button>`
      : `<span class="tray-item upcoming-item" aria-hidden="true">${trayItem.emoji}</span>`).join('')}</div>
    <p class="feedback ${state.feedback === 'Molt bé!' ? 'good' : ''}" role="status">${escapeHtml(state.feedback)}</p>
  </section>`;
  app.querySelector('[data-action="menu"]').addEventListener('click', renderMenu);
  app.querySelectorAll('[data-target]').forEach(target => {
    target.addEventListener('click', () => placeItem(target.dataset.target));
    target.addEventListener('dragover', event => event.preventDefault());
    target.addEventListener('drop', event => { event.preventDefault(); placeItem(target.dataset.target); });
  });
  app.querySelector('[data-item]').addEventListener('dragstart', event => event.dataTransfer?.setData('text/plain', item.emoji));
}

function placeItem(groupId) {
  const item = state.items[state.index];
  if (!item || state.transitioning) return;
  state.attempts += 1;
  if (!isCorrectPlacement(item, groupId)) {
    state.feedback = 'Torna-ho a provar!';
    renderRound();
    return;
  }
  if (state.attempts === 1) state.firstTryCount += 1;
  state.placed[groupId].push(item.emoji);
  state.index += 1;
  state.attempts = 0;
  state.feedback = 'Molt bé!';
  state.transitioning = true;
  renderRound();
  if (state.index < state.items.length) transitionTimer = window.setTimeout(() => {
    if (state.screen === 'round') { state.feedback = ''; state.transitioning = false; renderRound(); }
  }, 500);
}

function renderResult() {
  state.screen = 'result';
  const stars = starsForFirstTry(state.firstTryCount, state.items.length);
  app.innerHTML = `<section class="page celebrate" aria-labelledby="result-title" data-screen="result">
    <h1 id="result-title">Molt bé!</h1>
    <div class="result-stars ${stars === 5 ? 'perfect' : ''}" aria-label="${stars} estrelles">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
    <p class="result-copy">${stars} de 5 estrelles</p>
    <p class="intro">Has classificat tots els dibuixos.</p>
    <div class="result-actions"><button class="primary" type="button" data-action="next">Un altre repte</button><button class="secondary" type="button" data-action="finish">Acaba per ara</button></div>
  </section>`;
  app.querySelector('[data-action="next"]').addEventListener('click', startRound);
  app.querySelector('[data-action="finish"]').addEventListener('click', renderMenu);
}

renderMenu();
