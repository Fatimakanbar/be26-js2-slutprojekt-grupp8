import { Member } from "../models/Member";
import { DATABASE_URL } from "./fireBaseClientConfig";

export async function fetchMembers(): Promise<Member[]> {
  const response = await fetch(`${DATABASE_URL}/Members.json`);
  if (!response.ok) throw new Error("Kunde inte hämta medlem!!!!");
  const data = await response.json();
  if (!data) return [];
  return Object.entries(data).map(([id, value]) =>
    Member.fromFirebase(id, value),
  );
}

export async function createMember(member: Member): Promise<string> {
  const options = {
    method: "POST",
    body: JSON.stringify(member.toFirebaseObject()),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${DATABASE_URL}/Members.json`, options);
  if (!response.ok) throw new Error("Kunde inte skapa medlem!!!!");
  const result = await response.json();
  return result.name;
}
