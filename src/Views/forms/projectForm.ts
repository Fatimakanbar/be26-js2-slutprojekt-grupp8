import { CreateProject } from "../../database/ProjectFirebaseRequest";
import { Project } from "../../models/Projects";
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
  addMemberButton.textContent = "Lägg till medlemmar";
  const memberListDiv = document.createElement("div") as HTMLDivElement;
  memberListDiv.id = "membersContainer";

  const submitButton = document.createElement("button") as HTMLButtonElement;
  submitButton.type = "submit";
  submitButton.textContent = "Skapa projekt";

  const overlay = document.createElement("div") as HTMLDivElement;
  overlay.id = "formOverlay";

  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const projectName = projectNameInput.value.trim();
    const projectDescription = projectDescriptionInput.value.trim();
    const projectDeadline = dateInput.value;

    if (!projectName || !projectDescription || !projectDeadline) {
      alert("Vänligen fyll i alla fält innan du skapar projektet.");
      return;
    }
    const newProject = new Project(
      projectName,
      projectDescription,
      projectDeadline,
      [],
      [],
    );
    await CreateProject(newProject);
    overlay.remove();
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
    addMemberButton,
    memberListDiv,
    submitButton,
  );

  overlay.appendChild(projectForm);
  projectFormContainer.appendChild(overlay);
});
