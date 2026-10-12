import { createMember, fetchMembers } from "../database/MemberFirebaseRequest";
import { Member, type Category } from "../models/Member";

const memberForm = document.querySelector<HTMLFormElement>("#MemberForm");
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
const categorySelect =
  document.querySelector<HTMLSelectElement>("#memberCategory");
const errorText = document.querySelector<HTMLParagraphElement>("#member-error");
const memberList = document.querySelector<HTMLUListElement>("#member-list");

let members: Member[] = [];

function draw(): void {
  if (!memberList) return;
  memberList.innerHTML = "";
  members.forEach((m) => memberList!.appendChild(createMemberElement(m)));
}

function createMemberElement(member: Member): HTMLLIElement {
  const li = document.createElement("li");
  li.dataset.category = member.category;

  //! Om medlemmen inte är med i något projekt -> visa "Inga projekt"
  const projektText =
    member.projectIds.length > 0
      ? `<span class="projekt-lista">${member.projectIds.join(", ")}</span>`
      : `<span class="projekt-tom">Inga projekt</span>`;

  li.innerHTML = `
  <strong>${member.name}</strong> – ${member.category}<br>
  Pågående uppgifter: ${member.taskAmount}<br>
  Projekt: ${projektText}
`;
  return li;
}

export async function renderMembers(): Promise<void> {
  try {
    members = await fetchMembers();
    draw();
  } catch (error) {
    console.error(error);
    if (errorText) errorText.textContent = "Kunde inte hämta medlemmar.";
  }
}

export function initMemberForm(): void {
  if (!memberForm || !nameInput || !categorySelect) return;

  memberForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const category = categorySelect.value as Category;

    //     if (!name && !category) {}

    try {
      await createMember(new Member("", name, category));
      memberForm.reset();
      if (errorText) errorText.textContent = "";
      await renderMembers();
    } catch (err) {
      console.error(err);
      if (errorText) errorText.textContent = "Kunde inte spara medlemmen.";
    }
  });
}
