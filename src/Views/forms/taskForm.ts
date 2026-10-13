import { type Priority } from "../../models/Task";

export function createTaskForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.id = "taskForm";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Titel";
  nameLabel.htmlFor = "taskName";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.required = true;
  nameInput.name = "name";
  nameInput.id = "taskName";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Beskrivning";
  descriptionLabel.htmlFor = "taskDescription";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.required = true;
  descriptionInput.name = "description";
  descriptionInput.id = "taskDescription";

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Kategori";
  categoryLabel.htmlFor = "category";

  const categorySelect = document.createElement("select");
  categorySelect.name = "category";
  categorySelect.id = "category";
  const categories = ["frontend", "backend", "ux"];

  categories.forEach((category) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = category;
    categoryOption.textContent = category;
    categorySelect.append(categoryOption);
  });

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Prioritet";
  priorityLabel.htmlFor = "priority";

  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  prioritySelect.id = "priority";
  const priorities: Priority[] = [1, 2, 3];

  priorities.forEach((priority) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = priority.toString();
    priorityOption.textContent = priority.toString();
    prioritySelect.append(priorityOption);
  });

  const deadlineLabel = document.createElement("label");
  deadlineLabel.textContent = "Deadline";
  deadlineLabel.htmlFor = "deadline";

  const deadlineInput = document.createElement("input");
  deadlineInput.type = "date";
  deadlineInput.required = true;
  deadlineInput.name = "deadline";
  deadlineInput.id = "deadline";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Spara";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Avbryt";
  cancelButton.id = "cancelTaskButton";

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
    deadlineInput,
    submitButton,
    cancelButton,
  );

  return form;
}
