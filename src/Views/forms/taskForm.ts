export function createTaskForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.id = "taskForm";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Titel";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.required = true;
  nameInput.name = "name";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Beskrivning";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.required = true;
  descriptionInput.name = "description";

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Kategori";

  const categorySelect = document.createElement("select");
  categorySelect.name = "category";
  const categories = ["frontend", "backend", "ux"];

  categories.forEach((category) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = category;
    categoryOption.textContent = category;
    categorySelect.append(categoryOption);
  });

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Prioritet";

  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";

  //make array for priority and do a loop

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
  deadlineInput.name = "deadline";

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
