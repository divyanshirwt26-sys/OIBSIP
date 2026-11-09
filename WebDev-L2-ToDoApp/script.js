
const STORAGE_KEY = "tasknest_tasks_v1";

const taskList = document.getElementById("task-list");
const dialog = document.getElementById("task-dialog");
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const priorityInput = document.getElementById("task-priority");
const searchInput = document.getElementById("search");
const filterInput = document.getElementById("filter");

let tasks = [];
let editingId = null;

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (Array.isArray(saved)) {
    tasks = saved.filter(task =>
      task && typeof task.id === "string" &&
      typeof task.title === "string" &&
      typeof task.completed === "boolean" &&
      ["low", "medium", "high"].includes(task.priority)
    );
  }
} catch (error) {
  console.warn("Unable to load saved tasks.", error);
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Unable to save tasks.", error);
    alert("Tasks could not be saved in this browser.");
  }
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percent = total ? Math.round(completed / total * 100) : 0;

  document.getElementById("total-count").textContent = total;
  document.getElementById("pending-count").textContent = pending;
  document.getElementById("completed-count").textContent = completed;
  document.getElementById("progress-percent").textContent = percent + "%";
  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-bar")
    .setAttribute("aria-valuenow", percent);
}

function makeButton(label, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  button.dataset.id = id;
  return button;
}

function renderTasks() {
  taskList.replaceChildren();

  const query = searchInput.value.toLowerCase().trim();
  const filter = filterInput.value;

  const visible = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      (task.description || "").toLowerCase().includes(query);

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  if (visible.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";

    const icon = document.createElement("span");
    icon.textContent = "✦";

    const heading = document.createElement("strong");
    heading.textContent = tasks.length === 0
      ? "Your task list is empty"
      : "No matching tasks";

    const description = document.createElement("p");
    description.textContent = tasks.length === 0
      ? "Create your first task to get started."
      : "Try another search or filter.";

    empty.append(icon, heading, description);
    taskList.appendChild(empty);
  }

  visible.forEach(task => {
    const item = document.createElement("article");
    item.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Complete " + task.title);
    checkbox.dataset.action = "toggle";
    checkbox.dataset.id = task.id;

    const content = document.createElement("div");
    content.className = "task-content";

    const heading = document.createElement("h3");
    heading.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description || "";

    const priority = document.createElement("span");
    priority.className = "priority " + task.priority;
    priority.textContent =
      task.priority.charAt(0).toUpperCase() +
      task.priority.slice(1) + " Priority";

    content.append(heading, description, priority);

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.append(
      makeButton("Edit", "edit", task.id),
      makeButton("Delete", "delete", task.id)
    );

    item.append(checkbox, content, actions);
    taskList.appendChild(item);
  });

  updateStats();
}

function openTaskDialog(task = null) {
  form.reset();

  editingId = task ? task.id : null;

  document.getElementById("dialog-title").textContent =
    task ? "Edit Task" : "Create a Task";

  if (task) {
    titleInput.value = task.title;
    descriptionInput.value = task.description || "";
    priorityInput.value = task.priority;
  }

  dialog.showModal();
  titleInput.focus();
}

document.getElementById("new-task").addEventListener("click", () => {
  openTaskDialog();
});

document.getElementById("close-dialog")
  .addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  editingId = null;
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const priority = priorityInput.value;

  if (!title) {
    titleInput.setCustomValidity("Please enter a task title.");
    titleInput.reportValidity();
    return;
  }

  titleInput.setCustomValidity("");

  if (editingId !== null) {
    const task = tasks.find(t => t.id === editingId);

    if (task) {
      task.title = title;
      task.description = description;
      task.priority = priority;
    }
  } else {
    tasks.unshift({
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      completed: false
    });
  }

  saveTasks();
  renderTasks();
  dialog.close();
});

titleInput.addEventListener("input", () => {
  titleInput.setCustomValidity("");
});

taskList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const task = tasks.find(t => t.id === button.dataset.id);
  if (!task) return;

  if (button.dataset.action === "edit") {
    openTaskDialog(task);
  }

  if (button.dataset.action === "delete") {
    if (confirm(`Delete "${task.title}"?`)) {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    }
  }
});

taskList.addEventListener("change", event => {
  if (event.target.dataset.action !== "toggle") return;

  const task = tasks.find(t => t.id === event.target.dataset.id);
  if (!task) return;

  task.completed = event.target.checked;
  saveTasks();
  renderTasks();
});

searchInput.addEventListener("input", renderTasks);
filterInput.addEventListener("change", renderTasks);

renderTasks();
