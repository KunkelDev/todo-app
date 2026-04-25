/**
 * Frontend-Logik der Task App.
 * Kommuniziert mit der REST-API und aktualisiert die Anzeige dynamisch.
 */
const API = '/tasks';

/**
 * Laedt alle Tasks von der API und rendert sie in der Liste.
 * Beruecksichtigt aktuelle Filter-, Such- und Sortiereinstellungen.
 */
async function loadTasks() {
    const priority = document.getElementById('filterPriority').value;
    const sort = document.getElementById('sortBy').value;
    const search = document.getElementById('searchInput').value;

    const params = new URLSearchParams();
    if (priority) params.append('priority', priority);
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);

    const url = params.toString() ? `${API}?${params.toString()}` : API;

    const res = await fetch(url);
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.done) li.classList.add('done');
        li.innerHTML = `
      <span>${task.title}</span>
      <span class="badge ${task.priority}">${task.priority}</span>
      <button class="btn-done" onclick="toggleDone(${task.id}, ${task.done})">✓</button>
      <button class="btn-delete" onclick="deleteTask(${task.id})">✕</button>
    `;
        list.appendChild(li);
    });
}

/**
 * Liest Titel und Prioritaet aus dem Formular und erstellt einen neuen Task.
 */
async function createTask() {
    const title = document.getElementById('titleInput').value.trim();
    const priority = document.getElementById('priorityInput').value;
    if (!title) return alert('Bitte einen Titel eingeben!');

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority })
    });

    document.getElementById('titleInput').value = '';
    await loadTasks();
}

/**
 * Schaltet den Erledigungsstatus eines Tasks um.
 * @param {number} id - ID des Tasks
 * @param {boolean} currentDone - aktueller Status
 */
async function toggleDone(id, currentDone) {
    await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone })
    });
    await loadTasks();
}

/**
 * Loescht einen Task permanent.
 * @param {number} id - ID des zu loeschenden Tasks
 */
async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    await loadTasks();
}

(async () => { await loadTasks(); })();