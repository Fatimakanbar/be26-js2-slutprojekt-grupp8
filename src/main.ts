import { CreateMember } from "./database/MemberFirebaseRequest";
import { createTask } from "./database/TaskFirebaseRequest";
import { Member } from "./models/Member";
import { Task } from "./models/Task";
import { getTasks } from "./database/TaskFirebaseRequest";

//const testMember = new Member("Patrik", "frontend", 5, ["build app"]);
//const response = await CreateMember(testMember);

//console.log(response);

/*
const testTask = new Task(
    "Test task",
    "Testuppgift",
    "frontend",
    "new",
    1,
    new Date("2026-10-08"),
    new Date()
);

createTask(testTask)
.then(() => console.log("task skapad"))
.catch(() => console.log("error"));
*/

getTasks()
  .then((tasks) => {
    console.log(tasks);
  })
  .catch((error) => {
    console.error(error);
  });