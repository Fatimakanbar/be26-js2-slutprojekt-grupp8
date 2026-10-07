import type { Category } from "../models/Member";
import { Task, type Priority, type Status } from "../models/Task";
import { urlBuilder } from "./fireBaseClientConfig";

type FirebaseTask = {
  _name: string;
  _description: string;
  _category: Category;
  _status: Status;
  _priority: Priority;
  _deadline: Date;
  _createdDate: Date;
  _assignedMemberId?: string;
  _finishedDate?: Date;
};

type FirebaseTaskResponse = {
  [id: string]: FirebaseTask;
};

export async function createTask(task: Task): Promise<Response> {
  const options = {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlBuilder("Tasks"), options);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(urlBuilder("Tasks"));

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = (await response.json()) as FirebaseTaskResponse;

  return Object.entries(data).map(([id, task]) => {
    return new Task(
      task._name,
      task._description,
      task._category,
      task._status,
      task._priority,
      task._deadline,
      task._createdDate,
      task._assignedMemberId,
      task._finishedDate,
      id,
    );
  });
}
