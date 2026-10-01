import { STEPS, BASIC_STEP } from './steps-data.js';
import { groupStepsByCategory, filterStepsByName } from './list-render.js';
import { filterStepsForCountMode, filterByCategories, countDurationMs, createSequencer } from './trainer-logic.js';

function initTabs() {
  const buttons = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(`tab-${button.dataset.tab}`).classList.add('active');
    });
  });
}

function renderList(query) {
  const filtered = filterStepsByName(STEPS, query);
  const groups = groupStepsByCategory(filtered);
  const container = document.getElementById('list-content');
  container.innerHTML = groups.map(group => `
    <h2>${group.category}</h2>
    <table>
      <thead><tr><th>Step</th><th>Counting</th><th>Beschreibung</th></tr></thead>
      <tbody>
        ${group.steps.map(step => `
          <tr>
            <td>${step.name}</td>
            <td>${step.countingDisplay}</td>
            <td>${step.description}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `).join('');
}

function initList() {
  const searchInput = document.getElementById('list-search');
  renderList('');
  searchInput.addEventListener('input', () => renderList(searchInput.value));
}

function initCategoryFilters() {
  const fieldset = document.getElementById('category-filters');
  const categories = [...new Set(STEPS.map(step => step.category))];
  fieldset.innerHTML = categories.map(category => `
    <label>
      <input type="checkbox" class="category-checkbox" value="${category}" checked />
      ${category}
    </label>
  `).join('');
}

function getActiveCategories() {
  return [...document.querySelectorAll('.category-checkbox:checked')].map(checkbox => checkbox.value);
}

function getCountMode() {
  return Number(document.querySelector('input[name="count-mode"]:checked').value);
}

function getBasicStepForMode(mode) {
  if (mode === 8) {
    return { ...BASIC_STEP, displayName: BASIC_STEP.name, displayCounting: BASIC_STEP.countingDisplay };
  }
  return { ...BASIC_STEP, countLength: 4, displayName: BASIC_STEP.name, displayCounting: '1-2-3-(4)' };
}

function initTrainer() {
  initCategoryFilters();

  let timerId = null;
  let currentCount = 0;
  let currentItem = null;

  const nameEl = document.getElementById('trainer-figure-name');
  const countingEl = document.getElementById('trainer-figure-counting');
  const countNumberEl = document.getElementById('trainer-count-number');
  const startButton = document.getElementById('trainer-start');
  const stopButton = document.getElementById('trainer-stop');

  function showItem(item) {
    currentItem = item;
    currentCount = 1;
    nameEl.textContent = item.displayName;
    countingEl.textContent = item.displayCounting;
    countNumberEl.textContent = String(currentCount);
  }

  function tick(sequencer, intervalMs) {
    currentCount += 1;
    if (currentCount > currentItem.countLength) {
      showItem(sequencer.next());
    } else {
      countNumberEl.textContent = String(currentCount);
    }
    timerId = setTimeout(() => tick(sequencer, intervalMs), intervalMs);
  }

  function start() {
    const mode = getCountMode();
    const activeCategories = getActiveCategories();
    const insertBasicBetween = document.getElementById('insert-basic').checked;
    const bpm = Number(document.getElementById('bpm-input').value);

    const available = filterByCategories(filterStepsForCountMode(STEPS, mode), activeCategories);
    if (available.length === 0) {
      alert('Keine Steps für die aktuelle Auswahl verfügbar. Bitte Kategorien anpassen.');
      return;
    }
    const basicStep = getBasicStepForMode(mode);
    const sequencer = createSequencer({ steps: available, basicStep, insertBasicBetween });
    const intervalMs = countDurationMs(bpm);

    showItem(sequencer.next());
    startButton.disabled = true;
    stopButton.disabled = false;
    timerId = setTimeout(() => tick(sequencer, intervalMs), intervalMs);
  }

  function stop() {
    clearTimeout(timerId);
    timerId = null;
    startButton.disabled = false;
    stopButton.disabled = true;
  }

  startButton.addEventListener('click', start);
  stopButton.addEventListener('click', stop);
}

initTabs();
initList();
initTrainer();
