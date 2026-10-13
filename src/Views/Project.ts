import { getProjects } from "../database/ProjectFirebaseRequest";
import { fetchMembers } from "../database/MemberFirebaseRequest";

async function displayProjectDetails() {
  const projects = await getProjects();
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const selectedProject = projects.find((project) => project.id === projectId);

  if (!selectedProject) {
    console.log("Project not found");
    return;
  }

  const members = await fetchMembers();

  const projectMembers = members.filter((member) => {
    return (selectedProject.memberIDs ?? []).includes(member.id);
  });

  const projectHeader = document.querySelector("#projectHeader");
  const projectDescription = document.querySelector("#projectDescription");
  const projectDeadline = document.querySelector("#projectDeadline");
  const projectMembersContainer = document.querySelector("#projectMembers");

  if (projectHeader) {
    projectHeader.textContent = selectedProject.name;
  }
  if (projectDescription) {
    projectDescription.textContent = `Projektbeskrivning: ${selectedProject.description}`;
  }

  if (projectDeadline) {
    projectDeadline.textContent = `Deadline: ${selectedProject.deadline}`;
  }

  if (projectMembersContainer) {
    for (const member of projectMembers) {
      const memberName = document.createElement("p") as HTMLParagraphElement;
      memberName.textContent = member.name;
      projectMembersContainer.append(memberName);
    }
    if (projectMembers.length === 0) {
      const noMember = document.createElement("p") as HTMLParagraphElement;
      noMember.textContent = "Inga medlemmar tillagda";
      projectMembersContainer.append(noMember);
    }
  }
}

displayProjectDetails();

const homeButton = document.querySelector("#homeButton");
homeButton?.addEventListener("click", () => {
  window.location.href = "/index.html";
});
