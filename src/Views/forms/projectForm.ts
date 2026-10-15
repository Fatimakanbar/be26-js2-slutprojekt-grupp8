import { CreateProject } from "../../database/ProjectFirebaseRequest";
import { Project } from "../../models/Projects";
import { fetchMembers } from "../../database/memberFirebaseRequest";
import { displayProjects } from "../Overview";
const addProjectBtn = document.querySelector(
  "#addProjectBtn",
) as HTMLButtonElement;

addProjectBtn.addEventListener("click", () => {
  if (document.querySelector("#projectForm")) {
    return;
  }
  const projectFormContainer = document.getElementById(
    "projectFormContainer",
  ) as HTMLDivElement;
  const projectForm = document.createElement("form") as HTMLFormElement;
  projectForm.id = "projectForm";

  const projectFormHeader = document.createElement("h2") as HTMLHeadingElement;
  projectFormHeader.textContent = "Skapa Projekt";

  const closeButton = document.createElement("button") as HTMLButtonElement;
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.id = "closeProjectForm";

  closeButton.addEventListener("click", () => {
    overlay.remove();
  });

  const projectNameLabel = document.createElement("label") as HTMLLabelElement;
  projectNameLabel.htmlFor = "projectName";
  projectNameLabel.textContent = "Projekt namn:";

  const projectNameInput = document.createElement("input") as HTMLInputElement;
  projectNameInput.id = "projectName";
  projectNameInput.type = "text";
  projectNameInput.placeholder = "Projekt namn";

  const projectDescriptionLabel = document.createElement(
    "label",
  ) as HTMLLabelElement;
  projectDescriptionLabel.htmlFor = "projectDescription";
  projectDescriptionLabel.textContent = "Projekt beskrivning:";

  const projectDescriptionInput = document.createElement(
    "textarea",
  ) as HTMLTextAreaElement;
  projectDescriptionInput.id = "projectDescription";
  projectDescriptionInput.placeholder = "Projekt beskrivning";

  const dateLabel = document.createElement("label") as HTMLLabelElement;
  dateLabel.htmlFor = "projectDeadline";
  dateLabel.textContent = "Deadline:";

  const dateInput = document.createElement("input") as HTMLInputElement;
  dateInput.id = "projectDeadline";
  dateInput.type = "date";

  const addMemberButton = document.createElement("button") as HTMLButtonElement;
  addMemberButton.type = "button";
  addMemberButton.id = "addProjectMemberButton";
  addMemberButton.textContent = "Lägg till medlemmar";
  const memberListDiv = document.createElement("div") as HTMLDivElement;
  memberListDiv.id = "membersContainer";
  memberListDiv.style.display = "none";

  const memberDropdown = document.createElement("div") as HTMLDivElement;
  memberDropdown.id = "memberDropdown";
  memberDropdown.append(addMemberButton, memberListDiv);

  addMemberButton.addEventListener("click", async () => {
    if (memberListDiv.style.display === "none") {
      memberListDiv.style.display = "block";
    } else {
      memberListDiv.style.display = "none";
    }

    if (memberListDiv.children.length === 0) {
      const members = await fetchMembers();

      for (const member of members) {
        const memberBox = document.createElement("input") as HTMLInputElement;
        memberBox.type = "checkbox";
        memberBox.value = member.id;
        const memberNameLabel = document.createElement(
          "label",
        ) as HTMLLabelElement;
        memberNameLabel.textContent = member.name;
        memberNameLabel.append(memberBox);
        memberListDiv.append(memberNameLabel);
      }
    }
  });

  const submitButton = document.createElement("button") as HTMLButtonElement;
  submitButton.type = "submit";
  submitButton.id = "submitProjectButton";
  submitButton.textContent = "Skapa projekt";

  const overlay = document.createElement("div") as HTMLDivElement;
  overlay.id = "formOverlay";

  const errorMessage = document.createElement("p") as HTMLParagraphElement;
  errorMessage.id = "projectErrorMessage";

  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorMessage.textContent = "";
    const projectName = projectNameInput.value.trim();
    const projectDescription = projectDescriptionInput.value.trim();
    const projectDeadline = dateInput.value;

    if (!projectName || !projectDescription || !projectDeadline) {
      alert("Vänligen fyll i alla fält innan du skapar projektet.");
      return;
    }

    const checkboxes = memberListDiv.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    const selectedMembersIDs: string[] = [];

    for (const checkbox of checkboxes) {
      console.log("Checkbox:", checkbox.value, checkbox.checked);
      if (checkbox.checked) {
        selectedMembersIDs.push(checkbox.value);
      }
    }

    const newProject = new Project(
      projectName,
      projectDescription,
      projectDeadline,
      selectedMembersIDs,
      [],
    );
    try {
      await CreateProject(newProject);
      overlay.remove();
    } catch (error) {
      console.error("Kunde inte skapa projekt:", error);
      errorMessage.textContent =
        "Det gick inte att skapa projektet. Försök igen!";
      return;
    }

    try {
      await displayProjects();
    } catch (error) {
      console.error("Kunde inte uppdatera projektöversikten:", error);

      const overviewError = document.querySelector<HTMLParagraphElement>(
        "#projectOverviewError",
      );

      if (overviewError) {
        overviewError.textContent =
          "Projektet skapades, men översikten kunde inte uppdateras. Ladda om sidan.";
      }
    }
  });
  projectForm.append(
    projectFormHeader,
    closeButton,
    projectNameLabel,
    projectNameInput,
    projectDescriptionLabel,
    projectDescriptionInput,
    dateLabel,
    dateInput,
    memberDropdown,
    submitButton,
    errorMessage,
  );

  overlay.appendChild(projectForm);
  projectFormContainer.appendChild(overlay);
});
