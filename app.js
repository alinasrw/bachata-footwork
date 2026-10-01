import { STEPS, BASIC_STEP } from './steps-data.js';
import { filterStepsForCountMode, countDurationMs, createSequencer } from './trainer-logic.js';

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

function getCountMode() {
  return Number(document.querySelector('input[name="count-mode"]:checked').value);
}

function getBasicStepForMode(mode) {
  if (mode === 8) {
    return { ...BASIC_STEP, displayName: BASIC_STEP.name, displayCounting: BASIC_STEP.countingDisplay };
  }
  return { ...BASIC_STEP, countLength: 4, displayName: BASIC_STEP.name, displayCounting: '1-2-3-(4)' };
}

function initWizard() {
  const bpmInput = document.getElementById('bpm-input');
  const chosenSongEl = document.getElementById('chosen-song-name');

  document.querySelectorAll('.song-option').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.song-option').forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
      bpmInput.value = button.dataset.bpm;
      chosenSongEl.textContent = `${button.dataset.name} (${button.dataset.bpm} BPM)`;
      window.open(button.dataset.url, '_blank', 'noopener');
    });
  });
}

function getInsertBasicBetween() {
  const checked = document.querySelector('input[name="insert-basic-choice"]:checked');
  return checked ? checked.value === 'yes' : true;
}

function initTrainer() {
  let timerId = null;
  let currentCount = 0;
  let currentItem = null;

  let upcomingItem = null;

  const nameEl = document.getElementById('trainer-figure-name');
  const countNumberEl = document.getElementById('trainer-count-number');
  const nextEl = document.getElementById('trainer-next-figure');
  const startButton = document.getElementById('trainer-start');
  const stopButton = document.getElementById('trainer-stop');

  function showItem(item, upcoming) {
    currentItem = item;
    upcomingItem = upcoming;
    currentCount = 1;
    nameEl.textContent = item.displayName;
    countNumberEl.textContent = String(currentCount);
    nextEl.textContent = `Next: ${upcoming.displayName}`;
  }

  function tick(sequencer, intervalMs) {
    currentCount += 1;
    if (currentCount > currentItem.countLength) {
      showItem(upcomingItem, sequencer.next());
    } else {
      countNumberEl.textContent = String(currentCount);
    }
    timerId = setTimeout(() => tick(sequencer, intervalMs), intervalMs);
  }

  function start() {
    const mode = getCountMode();
    const insertBasicBetween = getInsertBasicBetween();
    const bpm = Number(document.getElementById('bpm-input').value);

    const available = filterStepsForCountMode(STEPS, mode);
    const basicStep = getBasicStepForMode(mode);
    const sequencer = createSequencer({ steps: available, basicStep, insertBasicBetween });
    const intervalMs = countDurationMs(bpm);

    showItem(sequencer.next(), sequencer.next());
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

function initTooltips() {
  const icons = document.querySelectorAll('.info-icon');
  icons.forEach(icon => {
    icon.addEventListener('click', event => {
      event.stopPropagation();
      const wasActive = icon.classList.contains('active');
      icons.forEach(other => other.classList.remove('active'));
      if (!wasActive) {
        icon.classList.add('active');
      }
    });
  });
  document.addEventListener('click', () => {
    icons.forEach(icon => icon.classList.remove('active'));
  });
}

initTabs();
initWizard();
initTrainer();
initTooltips();
