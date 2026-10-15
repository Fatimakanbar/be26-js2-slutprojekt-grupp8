import { getProjects } from "../database/projectFirebaseRequest";
import { getAllTasks } from "../database/taskFirebaseRequests";
import { Task } from "../models/Task";
import { Project } from "../models/Projects";

const projectContainer = document.querySelector(
  "#projectContainer",
) as HTMLDivElement;

export async function displayProjects() {
  const overviewError = document.querySelector("#projectOverviewError");

  if (overviewError) {
    overviewError.textContent = "";
  }

  try {
    const projects = await getProjects();
    projectContainer.innerHTML = "";

    for (const project of projects) {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      const ongoingTasksCount = await amountOfOngoingProjects(project);
      projectElement.innerHTML = `
        <h3>${project.name}</h3>
        <p>Projektbeskrivning: ${project.description}</p>
        <p>Deadline: ${project.deadline}</p>
        <p>Antal medlemmar: ${project.memberIDs?.length ?? 0}</p>
        <p>Pågående uppgifter: ${ongoingTasksCount}</p>
      `;
      projectElement.addEventListener("click", () => {
        window.location.href = `/src/Views/project.html?id=${project.id}`;
      });

      projectContainer.appendChild(projectElement);
    }

    return projects;
  } catch (error) {
    console.log("Error fetching projects:", error);
    throw error;
  }
}

async function amountOfOngoingProjects(project: Project) {
  try {
    const tasks = await getAllTasks();

    const ongoingTasksCount = tasks.filter(
      (task: Task) =>
        task.status === "ongoing" && task.projectId === project.id,
    ).length;
    return ongoingTasksCount;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    throw error;
  }
}

displayProjects().catch((error) => {
  console.error("Kunde inte ladda projektöversikten:", error);

  const overviewError = document.querySelector("#projectOverviewError");

  if (overviewError) {
    overviewError.textContent =
      "Det gick inte att ladda projekten. Kontrollera din anslutning och ladda om sidan.";
  }
});
