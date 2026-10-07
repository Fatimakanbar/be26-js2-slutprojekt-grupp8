export function createTaskForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.id = "taskForm";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Namn";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.required = true;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Beskrivning";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.required = true;

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Kategori";

  const categorySelect = document.createElement("select");

  const categoryOptionFrontend = document.createElement("option");
  categoryOptionFrontend.value = "frontend";
  categoryOptionFrontend.textContent = "Frontend";

  const categoryOptionBackend = document.createElement("option");
  categoryOptionBackend.value = "backend";
  categoryOptionBackend.textContent = "Backend";

  const categoryOptionUx = document.createElement("option");
  categoryOptionUx.value = "ux";
  categoryOptionUx.textContent = "UX";

  categorySelect.append(
    categoryOptionFrontend,
    categoryOptionBackend,
    categoryOptionUx,
  );

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Prioritet";

  const prioritySelect = document.createElement("select");

  const priorityOptionOne = document.createElement("option");
  priorityOptionOne.value = "1";
  priorityOptionOne.textContent = "1";

  const priorityOptionTwo = document.createElement("option");
  priorityOptionTwo.value = "2";
  priorityOptionTwo.textContent = "2";

  const priorityOptionThree = document.createElement("option");
  priorityOptionThree.value = "3";
  priorityOptionThree.textContent = "3";

  prioritySelect.append(
    priorityOptionOne,
    priorityOptionTwo,
    priorityOptionThree,
  );

const deadlineLabel = document.createElement("label");
deadlineLabel.textContent = "Deadline";

const deadlineInput = document.createElement("input");
deadlineInput.type = "date";
deadlineInput.required = true;

const memberLabel = document.createElement("label");
memberLabel.textContent = "Tilldelad member";

const memberSelect = document.createElement("select");




  form.append(
    nameLabel,
    nameInput,
    descriptionLabel,
    descriptionInput,
    categoryLabel,
    categorySelect,
    priorityLabel,
    prioritySelect,
    deadlineLabel,
    deadlineInput
  );


  return form;
}
