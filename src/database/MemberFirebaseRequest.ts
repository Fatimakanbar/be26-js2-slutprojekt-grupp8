<<<<<<< HEAD
import { Member } from "../models/Member";
import { DATABASE_URL } from "../database/fireBaseClientConfig";
=======
import { Member } from "../models/member";
import { DATABASE_URL } from "./fireBaseClientConfig";
>>>>>>> 75c1899a2123295035faa58a620cf7d8e7eb5561

//!hämtar members från firebase
export async function fetchMembers(): Promise<Member[]> {
  const response = await fetch(`${DATABASE_URL}/Members.json`);
  if (!response.ok) throw new Error("Kunde inte hämta medlem!!!!");
  const data = await response.json();

  //!Om databasen är tom returneras en tom array.
  if (!data) return [];

  //!Omvandlar Firebase-objektet till en array av Member-instanser
  return Object.entries(data).map(([id, value]) =>
    Member.fromFirebase(id, value),
  );
}

//!skapar en ny medlem i firebase
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
  return result.name; //!det nya id:t som Firebase gav
}
