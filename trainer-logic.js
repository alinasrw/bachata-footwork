export function filterStepsForCountMode(steps, mode) {
  return steps
    .filter(step => step.countLength === mode || (mode === 8 && step.countLength === 4 && step.doubleForEight))
    .map(step => {
      const isDoubled = mode === 8 && step.countLength === 4 && step.doubleForEight;
      return {
        ...step,
        countLength: isDoubled ? 8 : step.countLength,
        displayName: step.name,
        displayCounting: isDoubled ? `${step.countingDisplay} / ${step.countingDisplay}` : step.countingDisplay
      };
    });
}

export function filterByCategories(steps, activeCategories) {
  return steps.filter(step => activeCategories.includes(step.category));
}

export function pickRandomStep(steps, rng = Math.random) {
  if (steps.length === 0) {
    throw new Error('No steps available for the current filters');
  }
  const index = Math.floor(rng() * steps.length);
  return steps[index];
}

const COUNT_PACE_FACTOR = 1.2;

export function countDurationMs(bpm) {
  if (bpm <= 0) {
    throw new Error('BPM must be positive');
  }
  return (60000 / bpm) * COUNT_PACE_FACTOR;
}

export function createSequencer({ steps, basicStep, insertBasicBetween, rng = Math.random }) {
  let nextIsBasic = false;
  return {
    next() {
      if (insertBasicBetween && nextIsBasic) {
        nextIsBasic = false;
        return basicStep;
      }
      const figure = pickRandomStep(steps, rng);
      if (insertBasicBetween) {
        nextIsBasic = true;
      }
      return figure;
    }
  };
}
