import { createMember, fetchMembers } from "../database/memberFirebaseRequest";
import { Member, type Category } from "../models/member";
import { getAllTasks } from "../database/taskFirebaseRequest";
import { getProjects } from "../database/ProjectFirebaseRequest";

const memberForm = document.querySelector<HTMLFormElement>("#MemberForm");
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
const categorySelect =
  document.querySelector<HTMLSelectElement>("#memberCategory");
const errorText = document.querySelector<HTMLParagraphElement>("#member-error");
const memberList = document.querySelector<HTMLUListElement>("#member-list");

const addMemberBtn = document.querySelector<HTMLButtonElement>("#addMemberBtn");
const memberFormContainer = document.querySelector<HTMLDivElement>(
  "#memberFormContainer",
);
const cancelMemberBtn =
  document.querySelector<HTMLButtonElement>("#cancelMemberBtn");

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

//*Räkna ut taskAmount och projectIds
async function enrichMembers(members: Member[]): Promise<Member[]> {
  const [tasks, projects] = await Promise.all([getAllTasks(), getProjects()]);

  return members.map((member) => {
    //*Pågående uppgifter
    const ongoing = tasks.filter(
      (t) => t.assignedMemberId === member.id && t.status === "ongoing",
    ).length;

    const projectNames = projects
      .filter((p) => p.memberIDs?.includes(member.id ?? ""))
      .map((p) => p.name);

    return new Member(
      member.id,
      member.name,
      member.category,
      ongoing, // ← antal pågående uppgifter
      projectNames, // ← projektnamn
    );
  });
}

export async function renderMembers(): Promise<void> {
  try {
    const rawMembers = await fetchMembers();
    members = await enrichMembers(rawMembers);
    draw();
  } catch (error) {
    console.error(error);
    if (errorText) errorText.textContent = "Kunde inte hämta medlemmar.";
  }
}

export function initMemberForm(): void {
  if (!memberForm || !nameInput || !categorySelect) return;
  if (!addMemberBtn || !memberFormContainer || !cancelMemberBtn) return;

  addMemberBtn.addEventListener("click", () => {
    memberFormContainer.hidden = false;
    addMemberBtn.hidden = true;

    nameInput.focus(); // sätt markören i namn-fältet
  });

  // Stäng formuläret när man klickar "Avbryt"
  cancelMemberBtn.addEventListener("click", () => {
    memberFormContainer.hidden = true;
    addMemberBtn.hidden = false;
    memberForm.reset();
    if (errorText) errorText.textContent = "";
  });

  memberForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const category = categorySelect.value as Category;

    if (!name) {
      if (errorText) errorText.textContent = "Du måste ange ett namn.";
      return;
    }

    try {
      await createMember(new Member("", name, category));
      memberForm.reset();
      if (errorText) errorText.textContent = "kunde inte skapa medlem";

      memberFormContainer.hidden = true;
      addMemberBtn.hidden = false;

      await renderMembers();
    } catch (err) {
      console.error(err);
      if (errorText) errorText.textContent = "Kunde inte spara medlemmen.";
    }
  });
}
