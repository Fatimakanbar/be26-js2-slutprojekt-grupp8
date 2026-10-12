import { getProjects } from "../database/ProjectFirebaseRequest";
import { getTasks } from "../database/TaskFirebaseRequest";
import { Task } from "../models/Task";
import { Project } from "../models/Projects";
import type { Status } from "../models/Task";

const projectContainer = document.querySelector(
  "#projectContainer",
) as HTMLDivElement;

async function displayProjects() {
  try {
    const projects = await getProjects();

    for (const project of projects) {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      const ongoingTasksCount = await amountOfOngoingProjects(project);
      projectElement.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p>Deadline: ${project.deadline}</p>
        <p>Members: ${project.memberIDs?.length ?? 0}</p>
        <p>Ongoing Tasks: ${ongoingTasksCount}</p>
      `;
      projectElement.addEventListener("click", () => {
        console.log("Clicked project:", project.name);
        window.location.href = `/src/Views/project.html?id=${project.id}`;
      });

      projectContainer.appendChild(projectElement);
    }

    return projects;
  } catch (error) {
    console.log("Error fetching projects:", error);
  }
}

async function amountOfOngoingProjects(project: Project) {
  try {
    const tasks = await getTasks();
    console.log("Alla tasks:", tasks);
    console.log("Projektets taskIDs:", project.taskIDs);

    const ongoingTasksCount = tasks.filter(
      (task: Task) =>
        task.status === "ongoing" &&
        (project.taskIDs?.includes(task.id ?? "") ?? false),
    ).length;
    return ongoingTasksCount;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    throw error;
  }
}

displayProjects();
