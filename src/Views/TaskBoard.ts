import { Task, type Priority } from "../models/Task";
import {
  getTasks,
  patchDeadline,
  patchPriority,
} from "../database/TaskFirebaseRequest";

export function renderTask(task: Task): HTMLDivElement {
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");

  const title = document.createElement("h3");
  title.textContent = task.name;

  const description = document.createElement("p");
  description.textContent = task.description;

  const category = document.createElement("p");
  category.textContent = `Kategori: ${task.category}`;

  const createdDate = document.createElement("p");
  createdDate.textContent = `Skapad: ${task.createdDate}`;

  const deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline:";

  const deadline = document.createElement("input");
  deadline.type = "date";
  deadline.value = task.deadline;

  deadlineLabel.append(deadline);

  deadline.addEventListener("change", async () => {
    if (!task.id) return;

    await patchDeadline(task.id, deadline.value);
  });

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Prioritet:";

  const priority = document.createElement("select");

  for (let i = 1; i <= 3; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = String(i);

    if (task.priority === i) {
      option.selected = true;
    }

    priority.append(option);
  }

  priorityLabel.append(priority);
  priority.addEventListener("change", async () => {
    if (!task.id) return;

    await patchPriority(task.id, Number(priority.value) as Priority);
  });

  taskCard.append(
    title,
    description,
    category,
    createdDate,
    deadlineLabel,
    priorityLabel,
  );

  return taskCard;
}
function sortTasks(tasks: Task[], sortBy: string): Task[] {
  return [...tasks].sort((a, b) => {
    if (sortBy === "deadline-asc") {
      return a.deadline.localeCompare(b.deadline);
    }

    if (sortBy === "deadline-desc") {
      return b.deadline.localeCompare(a.deadline);
    }

    if (sortBy === "title-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "title-desc") {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });
}

export async function loadTasks() {
  const tasks = await getTasks();
  const sortSelect = document.querySelector<HTMLSelectElement>("#sortTasks");

  const sortedTasks = sortTasks(tasks, sortSelect?.value ?? "deadline-desc");

  const newTaskContainer = document.querySelector("#newTasksContainer");
  const ongoingTaskContainer = document.querySelector("#ongoingTasksContainer");
  const doneTaskContainer = document.querySelector("#doneTasksContainer");

  newTaskContainer?.replaceChildren();
  ongoingTaskContainer?.replaceChildren();
  doneTaskContainer?.replaceChildren();

  sortedTasks.forEach((task) => {
    const taskCard = renderTask(task);

    if (task.status === "new") {
      newTaskContainer?.append(taskCard);
    }

    if (task.status === "ongoing") {
      ongoingTaskContainer?.append(taskCard);
    }

    if (task.status === "finished") {
      doneTaskContainer?.append(taskCard);
    }
  });

  console.log(tasks);
}
  const sortSelect = document.querySelector<HTMLSelectElement>("#sortTasks");

  sortSelect?.addEventListener("change", () => {
    loadTasks();
  });
loadTasks();
