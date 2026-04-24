const API = '/tasks';

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
      <span onclick="toggleDone(${task.id}, ${task.done})">${task.title}</span>
      <span class="priority">${task.priority}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
        list.appendChild(li);
    });
}

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

async function toggleDone(id, currentDone) {
    await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone })
    });
    await loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    await loadTasks();
}

(async () => { await loadTasks(); })();