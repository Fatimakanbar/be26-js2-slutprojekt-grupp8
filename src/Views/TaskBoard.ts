import { Task, type Priority } from "../models/Task";
import {
  getTaskForProject,
  patchDeadline,
  patchPriority,
  patchAssignment,
  patchTaskStatus,
  deleteTask,
} from "../database/TaskFirebaseRequest";
import type { Category, Member } from "../models/Member";
import { createTaskForm } from "./forms/taskForm";
import { postTask } from "../database/TaskFirebaseRequest";
import { fetchMembers } from "../database/MemberFirebaseRequest";

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

await loadTasks();

const addTaskBtn = document.querySelector<HTMLButtonElement>("#addTaskBtn");
//break to function (same way as submitForm)
addTaskBtn?.addEventListener("click", () => {
  addTaskBtn.hidden = true;

  const form = createTaskForm();

  form.addEventListener("submit", submitForm);

  const cancelButton = form.querySelector(
    "#cancelTaskButton",
  ) as HTMLButtonElement;

  //break to function (same way as submitForm)
  cancelButton.addEventListener("click", () => {
    form.remove();
    addTaskBtn.hidden = false;
  });

  const taskFormContainer = document.querySelector("#taskFormContainer");
  taskFormContainer?.append(form);
});

const sortSelect = document.querySelector<HTMLSelectElement>("#sortTasks");
sortSelect?.addEventListener("change", async () => {
  await loadTasks();
});

async function submitForm(event: SubmitEvent) {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;

  if (!projectId) {
    console.error("Project ID is not available");
    return;
  }

  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const task = new Task(
    values.name as string,
    values.description as string,
    values.category as Category,
    Number(values.priority) as Priority,
    values.deadline as string,
    projectId,
    values.member as string,
  );

  form.remove();

  await postTask(task);

  if (addTaskBtn) {
    addTaskBtn.hidden = false;
  }
  await loadTasks();
}

export async function renderTask(
  task: Task,
  members: Member[],
): Promise<HTMLDivElement> {
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

  const memberContainer = document.createElement("div");

  if (task.assignedMemberID) {
    const label = document.createElement("label");
    label.textContent = "Tilldelad medlem: ";

    const memberName = document.createElement("p");
    memberName.textContent = members.find(
      (member) => member.id === task.assignedMemberID,
    )?.name as string;
    memberContainer.append(label, memberName);
  } else {
    const memberLabel = document.createElement("label");
    memberLabel.textContent = "Tilldela medlem";

    const memberSelect = document.createElement("select");

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Välj medlem";
    memberSelect.append(defaultOption);

    members.forEach((member) => {
      const option = document.createElement("option");

      option.value = member.id ?? "";
      option.textContent = member.name;

      if (member.id === task.assignedMemberID) {
        option.selected = true;
      }

      memberSelect.append(option);
    });

    memberLabel.append(memberSelect);
    memberContainer.append(memberLabel);

    memberSelect.addEventListener("change", async () => {
      if (!task.id || !memberSelect.value) return;
      //taskInteraction:
      // addMemberToTask (task, member)
      // task.memberId = member.Id
      // task.status = "ongoing"
      // await patchAssignment(task.id, memberSelect.value);

      await patchAssignment(task.id, memberSelect.value);
      await loadTasks();
    });
  }

  taskCard.append(
    title,
    description,
    category,
    createdDate,
    deadlineLabel,
    priorityLabel,
    memberContainer,
  );

  if (task.status === "ongoing") {
    const doneTaskBtn = document.createElement("button");
    doneTaskBtn.textContent = "Klar";

    taskCard.append(doneTaskBtn);

    doneTaskBtn.addEventListener("click", async () => {
      if (!task.id) return;

      await patchTaskStatus(task.id, "finished");
      await loadTasks();
    });
  }

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.textContent = "Ta bort uppgift";
  taskCard.append(deleteTaskBtn);

  deleteTaskBtn.addEventListener("click", async () => {
    if (!task.id) return;

    const confirmed = confirm("Vill du verkligen ta bort uppgiften?");

    if (!confirmed) return;

    await deleteTask(task.id);
    await loadTasks();
  });

  return taskCard;
}

function sortTasks(tasks: Task[], sortBy: string): Task[] {
  return tasks.sort((a, b) => {
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
  if (!projectId) {
    return;
  }

  const tasks = await getTaskForProject(projectId);
  const members = await fetchMembers();
  const sortSelect = document.querySelector<HTMLSelectElement>("#sortTasks");
  const sortedTasks = sortTasks(tasks, sortSelect?.value ?? "deadline-desc");

  const newTasks = sortedTasks.filter((task) => task.status === "new");
  const ongoingTasks = sortedTasks.filter((task) => task.status === "ongoing");
  const finishedTasks = sortedTasks.filter(
    (task) => task.status === "finished",
  );

  const newTaskContainer = document.querySelector("#newTasksContainer");
  //empty newTaskContainer
  newTaskContainer?.replaceChildren();

  newTasks.forEach(async (task) => {
    const taskCard = await renderTask(
      task,
      members.filter((member) => member.category === task.category),
    );
    newTaskContainer?.append(taskCard);
  });

  const ongoingTaskContainer = document.querySelector("#ongoingTasksContainer");
  //empty ongoingTaskContainer
  ongoingTaskContainer?.replaceChildren();

  ongoingTasks.forEach(async (task) => {
    const taskCard = await renderTask(
      task,
      members.filter((member) => member.category === task.category),
    );
    ongoingTaskContainer?.append(taskCard);
  });

  const doneTaskContainer = document.querySelector("#doneTasksContainer");
  //empty doneTaskContainer
  doneTaskContainer?.replaceChildren();

  finishedTasks.forEach(async (task) => {
    const taskCard = await renderTask(
      task,
      members.filter((member) => member.category === task.category),
    );
    doneTaskContainer?.append(taskCard);
  });
}
