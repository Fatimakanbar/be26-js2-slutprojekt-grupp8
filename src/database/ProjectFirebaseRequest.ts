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
