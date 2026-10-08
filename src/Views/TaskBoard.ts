import { Task } from "../models/Task";
import { getTasks } from "../database/TaskFirebaseRequest";

export function renderTask(task: Task): HTMLDivElement {
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");

  const title = document.createElement("h3");
  title.textContent = task.name;

  const description = document.createElement("p");
  description.textContent = task.description;

  taskCard.append(title, description);

  return taskCard;
}

export async function loadTasks() {
  const tasks = await getTasks();

  const newTaskContainer = document.querySelector("#newTasksContainer");

  const ongoingTaskContainer = document.querySelector("#ongoingTasksContainer");

  const doneTaskContainer = document.querySelector("#doneTasksContainer");

  tasks.forEach((task) => {
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

loadTasks();
