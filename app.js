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
  let overallCount = 0;
  let segmentLength = 8;
  let currentItem = null;
  let upcomingItem = null;
  let sequencer = null;
  let intervalMs = null;

  const nameEl = document.getElementById('trainer-figure-name');
  const countNumberEl = document.getElementById('trainer-count-number');
  const nextEl = document.getElementById('trainer-next-figure');
  const startButton = document.getElementById('trainer-start');
  const pauseButton = document.getElementById('trainer-pause');
  const stopButton = document.getElementById('trainer-stop');

  function swapFigure() {
    currentItem = upcomingItem;
    upcomingItem = sequencer.next();
    nameEl.textContent = currentItem.displayName;
    nextEl.textContent = `Next: ${upcomingItem.displayName}`;
  }

  function tick() {
    overallCount += 1;
    if (overallCount > 8) {
      overallCount = 1;
    }
    if ((overallCount - 1) % segmentLength === 0) {
      swapFigure();
    }
    countNumberEl.textContent = String(overallCount);
    timerId = setTimeout(tick, intervalMs);
  }

  function start() {
    const mode = getCountMode();
    const insertBasicBetween = getInsertBasicBetween();
    const bpm = Number(document.getElementById('bpm-input').value);

    segmentLength = mode;
    const available = filterStepsForCountMode(STEPS, mode);
    const basicStep = { ...BASIC_STEP, displayName: BASIC_STEP.name, displayCounting: BASIC_STEP.countingDisplay };
    sequencer = createSequencer({ steps: available, basicStep, insertBasicBetween });
    intervalMs = countDurationMs(bpm);

    overallCount = 1;
    currentItem = sequencer.next();
    upcomingItem = sequencer.next();
    nameEl.textContent = currentItem.displayName;
    countNumberEl.textContent = '1';
    nextEl.textContent = `Next: ${upcomingItem.displayName}`;

    startButton.disabled = true;
    pauseButton.disabled = false;
    pauseButton.textContent = 'Pause';
    stopButton.disabled = false;
    timerId = setTimeout(tick, intervalMs);
  }

  function togglePause() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
      pauseButton.textContent = 'Resume';
    } else {
      pauseButton.textContent = 'Pause';
      timerId = setTimeout(tick, intervalMs);
    }
  }

  function stop() {
    clearTimeout(timerId);
    timerId = null;
    sequencer = null;
    intervalMs = null;
    currentItem = null;
    upcomingItem = null;
    overallCount = 0;
    nameEl.textContent = '—';
    countNumberEl.textContent = '–';
    nextEl.textContent = 'Next: —';
    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = 'Pause';
    stopButton.disabled = true;
  }

  startButton.addEventListener('click', start);
  pauseButton.addEventListener('click', togglePause);
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
