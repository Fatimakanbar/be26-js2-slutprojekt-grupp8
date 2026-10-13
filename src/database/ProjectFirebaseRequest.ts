import { Project } from "../models/Projects";
import { urlBuilder } from "./fireBaseClientConfig";

export async function CreateProject(project: Project): Promise<Response> {
  const options = {
    method: "POST",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlBuilder("Projects"), options);
  if (!response.ok) throw new Error("Something went wrong");
  return response;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(urlBuilder("Projects"));
  if (!response.ok) throw new Error("Something went wrong getting the projets");
  const data = await response.json();
  const projects: Project[] = [];

  for (const id in data) {
    const projectData = data[id];

    const project = new Project(
      projectData._name,
      projectData._description,
      projectData._deadline,
      projectData._memberIDs || [],
      projectData._taskIDs || [],
      id,
    );
    projects.push(project);
  }
  return projects;
}
