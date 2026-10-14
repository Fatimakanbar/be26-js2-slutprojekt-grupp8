import type { Task } from "../models/Task";

export function filterCategory(tasks: Task[], category: string): Task[] {
    if (category === "all") {
        return tasks;
    }
    return tasks.filter((task) => task.category === category);
}

export function filterMember(tasks: Task[], memberId: string): Task[] {
    if (memberId === "all") {
        return tasks;
    } 
    return tasks.filter((task) => task.assignedMemberId === memberId);
}

export function sortTasks(tasks: Task[], sortBy: string): Task[] {
  return tasks.sort((a, b) => {
    if (sortBy === "deadline-asc") {
      return a.deadline.localeCompare(b.deadline);
    }

    if (sortBy === "deadline-desc") {
      return b.deadline.localeCompare(a.deadline);
    }

    if (sortBy === "title-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "title-desc") {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });
}   
