import { Task, type Priority } from "../models/Task";
import type { Category } from "../models/Member";
import { createTaskForm } from "./forms/taskForm";
import { createTask } from "../database/TaskFirebaseRequest";

const addTaskBtn = document.querySelector("#addTaskBtn");

addTaskBtn?.addEventListener("click", () => {
  const form = createTaskForm();

  form.addEventListener("submit", submitForm);

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
    new Date(values.deadline as string),
    new Date(),
    values.member as string,
  );
  await createTask(task);

  console.log(task);

  //take values from evemt

  // const task = new Task(
  //   nameInput.value,
  //   descriptionInput.value,
  //   categorySelect.value as Category,
  //   "new",
  //   Number(prioritySelect.value) as Priority,
  //   new Date(deadlineInput.value),
  //   new Date(),
  //   memberSelect.value
  // );
  // await createTask(task);
}
