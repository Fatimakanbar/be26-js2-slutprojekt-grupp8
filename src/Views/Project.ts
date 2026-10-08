import { Task, type Priority } from "../models/Task";
import type { Category } from "../models/Member";
import { createTaskForm } from "./forms/taskForm";
import { createTask } from "../database/TaskFirebaseRequest";
import { loadTasks } from "./TaskBoard";

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
