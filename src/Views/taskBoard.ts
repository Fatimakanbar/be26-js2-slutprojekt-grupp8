import { Task, type Priority } from "../models/Task";
import {
  postTask,
  getTaskForProject,
} from "../database/taskFirebaseRequest";
import type { Category } from "../models/Member";
import { createTaskForm } from "./forms/taskForm";
import { fetchMembers } from "../database/MemberFirebaseRequest";
import { getFilteredSortedTasks } from "./taskSorter";
import { renderTask } from "./renderTask";

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

if (!projectId) {
  alert("Project ID is not available");
  throw new Error("Project ID is not available");
}

const addTaskBtn = document.querySelector<HTMLButtonElement>("#addTaskBtn");
const taskSortingSelect =
  document.querySelector<HTMLSelectElement>("#sortTasks");

const categoryFilterElement = document.querySelector<HTMLSelectElement>(
  "#filterTasksByCategory",
);

const memberFilterElement = document.querySelector<HTMLSelectElement>(
  "#filterTasksByMember",
);

const tasks = await getTaskForProject(projectId);
const members = await fetchMembers();

await loadTasks();

//break to function (same way as submitForm)
addTaskBtn?.addEventListener("click", () => {
  addTaskBtn.hidden = true;

  const taskForm = createTaskForm();

  taskForm.addEventListener("submit", submitForm);

  const cancelButton = taskForm.querySelector(
    "#cancelTaskButton",
  ) as HTMLButtonElement;

  //break to function (same way as submitForm)
  cancelButton.addEventListener("click", () => {
    taskForm.remove();
    addTaskBtn.hidden = false;
  });

  const taskFormContainer = document.querySelector("#taskFormContainer");
  taskFormContainer?.append(taskForm);
});

taskSortingSelect?.addEventListener("change", async () => {
  await loadTasks();
});

categoryFilterElement?.addEventListener("change", async () => {
  await loadTasks();
});

memberFilterElement?.addEventListener("change", async () => {
  await loadTasks();
});

async function loadMemberFilter() {
  try {
    const members = await fetchMembers();

    if (!memberFilterElement) return;

    members.forEach((member) => {
      const option = document.createElement("option");
      option.value = member.id;
      option.textContent = member.name;
      memberFilterElement.append(option);
    });
  } catch (error) {
    console.error("Kunde inte ladda medlemmar:", error);
    alert("Det gick inte att ladda medlemmar. Försök igen senare.");
  }
}

await loadMemberFilter();

async function submitForm(event: SubmitEvent) {
  event.preventDefault();

  const taskForm = event.currentTarget as HTMLFormElement;

  if (!projectId) {
    console.error("Project ID is not available");
    return;
  }

  const taskFormData = new FormData(taskForm);
  const taskFormValues = Object.fromEntries(taskFormData);

  const task = new Task(
    taskFormValues.name as string,
    taskFormValues.description as string,
    taskFormValues.category as Category,
    Number(taskFormValues.priority) as Priority,
    taskFormValues.deadline as string,
    projectId,
    taskFormValues.member as string,
  );

  try {
    await postTask(task);
    taskForm.remove();
    if (addTaskBtn) {
      addTaskBtn.hidden = false;
    }

    await loadTasks();
  } catch (error) {
    console.error("Kunde inte spara uppgiften:", error);
    alert("Det gick inte att spara uppgiften. Försök igen senare.");
  }
}

export async function loadTasks() {
  try {
    const filterByCategoryValue = categoryFilterElement?.value ?? "all";
    const filterByMemberValue = memberFilterElement?.value ?? "all";
    const taskSortOrder = taskSortingSelect?.value ?? "deadline-desc";

    const sortedTasks = getFilteredSortedTasks(
      tasks,
      filterByCategoryValue,
      filterByMemberValue,
      taskSortOrder,
    );

    const newTasks = sortedTasks.filter((task) => task.status === "new");
    const ongoingTasks = sortedTasks.filter(
      (task) => task.status === "ongoing",
    );
    const finishedTasks = sortedTasks.filter(
      (task) => task.status === "finished",
    );

    const newTaskContainer = document.querySelector("#newTasksContainer");
    newTaskContainer?.replaceChildren();

    newTasks.forEach(async (task) => {
      const taskCard = await renderTask(
        task,
        members.filter((member) => member.category === task.category),
      );
      newTaskContainer?.append(taskCard);
    });

    const ongoingTaskContainer = document.querySelector(
      "#ongoingTasksContainer",
    );

    ongoingTaskContainer?.replaceChildren();

    ongoingTasks.forEach(async (task) => {
      const taskCard = await renderTask(
        task,
        members.filter((member) => member.category === task.category),
      );
      ongoingTaskContainer?.append(taskCard);
    });

    const doneTaskContainer = document.querySelector("#doneTasksContainer");

    doneTaskContainer?.replaceChildren();

    finishedTasks.forEach(async (task) => {
      const taskCard = await renderTask(
        task,
        members.filter((member) => member.category === task.category),
      );
      doneTaskContainer?.append(taskCard);
    });
  } catch (error) {
    console.error("Kunde inte ladda uppgifter:", error);
    alert("Det gick inte att ladda uppgifter. Försök igen senare.");
  }
}
