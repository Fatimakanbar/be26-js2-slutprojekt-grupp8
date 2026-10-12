import { type Category } from "../models/Member";
import { Task, type Priority, type Status } from "../models/Task";
import { urlBuilder } from "./fireBaseClientConfig";

type FirebaseTask = {
  _name: string;
  _description: string;
  _category: Category;
  _status: Status;
  _priority: Priority;
  _deadline: string;
  _createdDate: string;
  _assignedMemberId?: string;
  _finishedDate?: string;
};

type FirebaseTaskResponse = {
  [id: string]: FirebaseTask;
};

export async function postTask(task: Task): Promise<Response> {
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
      task._priority,
      task._deadline,
      task._assignedMemberId,
      task._createdDate,
      task._status,
      task._finishedDate,
      id,
    );
  });
}

export async function patchDeadline(
  taskId: string,
  deadline: string,
): Promise<Response> {
  const options = {
    method: "PATCH",
    body: JSON.stringify({ _deadline: deadline }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlBuilder(`Tasks/${taskId}`), options);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response;
}

export async function patchPriority(
  taskId: string,
  priority: Priority,
): Promise<Response> {
  const options = {
    method: "PATCH",
    body: JSON.stringify({ _priority: priority }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlBuilder(`Tasks/${taskId}`), options);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response;
}

export async function patchAssignment(
  taskId: string,
  memberId: string,
): Promise<Response> {
  const response = await fetch(urlBuilder(`Tasks/${taskId}`), {
    method: "PATCH",
    body: JSON.stringify({
      _assignedMemberId: memberId,
      _status: "ongoing",
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response;
}

export async function deleteTask(taskId: string): Promise<Response> {
  const response = await fetch(urlBuilder(`Tasks/${taskId}`), {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response;
}

//skapar tillfällig getMembers funktion för att kunna bygga vidare med tasks
/*
type FirebaseMember = {
  _name: string;
  _category: Category;
  _taskAmount?: number;
  _projectId?: string[];
};

type FirebaseMemberResponse = {
  [id: string]: FirebaseMember;
};

export async function getMembers(): Promise<Member[]> {
  const response = await fetch(urlBuilder("Members"));

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json() as FirebaseMemberResponse;

  return Object.entries(data).map(([id, member]) => {
    return new Member(
      member._name,
      member._category,
      member._taskAmount,
      member._projectId,
      id,
    );
  });
}
*/