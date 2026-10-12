import { getProjects } from "../database/ProjectFirebaseRequest";

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
