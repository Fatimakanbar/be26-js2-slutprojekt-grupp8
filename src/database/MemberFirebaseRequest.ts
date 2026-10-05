import { Member } from "../models/Member";
import { urlBuilder } from "./fireBaseClientConfig";

export async function CreateMember(member: Member): Promise<Response> {
  const options = {
    method: "POST",
    body: JSON.stringify(member),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(urlBuilder("Members"), options);

  if (!response.ok) throw new Error("something went wrong");

  return response;
}
