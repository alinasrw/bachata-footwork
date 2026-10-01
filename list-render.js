export function groupStepsByCategory(steps) {
  const order = [];
  const byCategory = new Map();
  for (const step of steps) {
    if (!byCategory.has(step.category)) {
      byCategory.set(step.category, []);
      order.push(step.category);
    }
    byCategory.get(step.category).push(step);
  }
  return order.map(category => ({ category, steps: byCategory.get(category) }));
}

export function filterStepsByName(steps, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return steps;
  }
  return steps.filter(step => step.name.toLowerCase().includes(normalized));
}
