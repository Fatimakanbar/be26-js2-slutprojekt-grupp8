import {createTaskForm} from "./forms/taskForm";

console.log("projekt.ts körs")

const addTaskBtn = document.querySelector("#addTaskBtn");

addTaskBtn?.addEventListener("click", () => {
    
    const form = createTaskForm();

    const taskFormContainer = document.querySelector("#taskFormContainer");
    taskFormContainer?.append(form);
}
)