import { Task, type Priority } from "../models/Task";
import type { Category } from "../models/Member";
import { createTaskForm } from "./forms/taskForm";
import { createTask } from "../database/TaskFirebaseRequest";
import { loadTasks } from "./TaskBoard";
import { getProjects } from "../database/ProjectFirebaseRequest";

const addTaskBtn = document.querySelector<HTMLButtonElement>("#addTaskBtn");

addTaskBtn?.addEventListener("click", () => {
  addTaskBtn.hidden = true;

  const form = createTaskForm();

  form.addEventListener("submit", submitForm);

  const cancelButton = form.querySelector(
    "#cancelTaskButton",
  ) as HTMLButtonElement;

  cancelButton.addEventListener("click", () => {
    form.remove();
    addTaskBtn.hidden = false;
  });

  const taskFormContainer = document.querySelector("#taskFormContainer");
  taskFormContainer?.append(form);
});

async function submitForm(event: SubmitEvent) {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;

  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const task = new Task(
    values.name as string,
    values.description as string,
    values.category as Category,
    "new",
    Number(values.priority) as Priority,
    values.deadline as string,
    new Date().toISOString().split("T")[0],
    values.member as string,
  );

  await createTask(task);
  await loadTasks();

  form.remove();

  if (addTaskBtn) {
    addTaskBtn.hidden = false;
  }

  console.log(task);
}

async function displayProjectDetails() {
  const projects = await getProjects();
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const selectedProject = projects.find((project) => project.id === projectId);

  if (!selectedProject) {
    console.log("Project not found");
    return;
  }

  const projectHeader = document.querySelector("#projectHeader");
  const projectDescription = document.querySelector("#projectDescription");
  const projectDeadline = document.querySelector("#projectDeadline");

  if (projectHeader) {
    projectHeader.textContent = selectedProject.name;
  }
  if (projectDescription) {
    projectDescription.textContent = `Projektbeskrivning: ${selectedProject.description}`;
  }

  if (projectDeadline) {
    projectDeadline.textContent = `Deadline: ${selectedProject.deadline}`;
  }
  // Lägg till membersname när getMembers finns.

  console.log("Selected project:", selectedProject);
}

displayProjectDetails();

const homeButton = document.querySelector("#homeButton");
homeButton?.addEventListener("click", () => {
  window.location.href = "/index.html";
});
