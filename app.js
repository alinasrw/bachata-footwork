import { STEPS } from './steps-data.js';
import { groupStepsByCategory, filterStepsByName } from './list-render.js';

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

initTabs();
initList();
