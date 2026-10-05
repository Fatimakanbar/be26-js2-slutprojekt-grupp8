export const DATABASE_URL =
  "https://be26-js2-scrumboard-grupp8-default-rtdb.europe-west1.firebasedatabase.app";

export function urlBuilder(path: string): string {
  return `${DATABASE_URL}/${path}.json`;
}
