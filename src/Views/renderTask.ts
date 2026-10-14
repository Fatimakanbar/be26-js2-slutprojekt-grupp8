import { patchDeadline, patchPriority, patchAssignment, patchTaskStatus, deleteTask } from "../database/taskFirebaseRequest";
import type { Member } from "../models/Member";
import type { Task, Priority } from "../models/Task";
import { reloadTaskBoard } from "./taskBoard";


export async function createTaskCard(
  task: Task,
  members: Member[]
): Promise<HTMLDivElement> {
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-card");

  const taskTitle = document.createElement("h3");
  taskTitle.textContent = task.name;
  taskCard.append(taskTitle);

  const taskDescription = document.createElement("p");
  taskDescription.textContent = task.description;
  taskCard.append(taskDescription);

  const category = document.createElement("p");
  category.textContent = `Kategori: ${task.category}`;
  taskCard.append(category);

  const createdDate = document.createElement("p");
  createdDate.textContent = `Skapad: ${task.createdDate}`;
  taskCard.append(createdDate);

  const deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline:";

  const deadline = document.createElement("input");
  deadline.type = "date";
  deadline.value = task.deadline;

  deadlineLabel.append(deadline);
  taskCard.append(deadlineLabel);

  deadline.addEventListener("change", async () => {
    if (!task.id) return;
    try {
      await patchDeadline(task.id, deadline.value);
    } catch (error) {
      console.error("Kunde inte uppdatera deadline:", error);
      alert("Det gick inte att uppdatera deadline. Försök igen senare.");
    }
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
  taskCard.append(priorityLabel);

  priority.addEventListener("change", async () => {
    if (!task.id) return;
    try {
      await patchPriority(task.id, Number(priority.value) as Priority);
    } catch (error) {
      console.error("Kunde inte uppdatera prioritet:", error);
      alert("Det gick inte att spara prioriteten. Försök igen senare.");
    }
  });

  const memberContainer = document.createElement("div");
  taskCard.append(memberContainer);

  if (task.assignedMemberId) {
    const label = document.createElement("label");
    label.textContent = "Tilldelad medlem: ";

    const memberName = document.createElement("p");
    const assignedMember = members.find(
      (member) => member.id === task.assignedMemberId
    );
    if (assignedMember) {
      memberName.textContent = assignedMember.name;
    } else {
      memberName.textContent = "Medlemmen hittades inte";
    }
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

      if (member.id === task.assignedMemberId) {
        option.selected = true;
      }

      memberSelect.append(option);
    });

    memberLabel.append(memberSelect);
    memberContainer.append(memberLabel);

    memberSelect.addEventListener("change", async () => {
      if (!task.id || !memberSelect.value) return;

      try {
        await patchAssignment(task.id, memberSelect.value);
        await reloadTaskBoard();
      } catch (error) {
        console.error("Kunde inte tilldela medlem:", error);
        alert("Det gick inte att tilldela medlem. Försök igen senare.");
      }
    });
  }

  if (task.status === "finished" && task.finishedDate) {
    const finishedDate = document.createElement("p");

    finishedDate.textContent = `Avslutad: ${new Date(
      task.finishedDate
    ).toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    taskCard.append(finishedDate);
  }

  if (task.status === "ongoing") {
    const doneTaskBtn = document.createElement("button");
    doneTaskBtn.textContent = "Klar";

    taskCard.append(doneTaskBtn);

    doneTaskBtn.addEventListener("click", async () => {
      if (!task.id) return;
      try {
        await patchTaskStatus(task.id, "finished");
        await reloadTaskBoard();
      } catch (error) {
        console.error("Kunde inte avsluta uppgiften:", error);
        alert(
          "Det gick inte att markera uppgiften som klar. Försök igen senare."
        );
      }
    });
  }

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.textContent = "Ta bort uppgift";
  taskCard.append(deleteTaskBtn);

  deleteTaskBtn.addEventListener("click", async () => {
    if (!task.id) return;

    const confirmed = confirm("Vill du verkligen ta bort uppgiften?");

    if (!confirmed) return;
    try {
      await deleteTask(task.id);
      await reloadTaskBoard();
    } catch (error) {
      console.error("Kunde inte ta bort uppgiften:", error);
      alert("Det gick inte att ta bort uppgiften. Försök igen senare.");
    }
  });

  return taskCard;
}
