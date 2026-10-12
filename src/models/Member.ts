export type Category = "frontend" | "backend" | "ux";

export class Member {
  private readonly _id: string;
  private _name: string;
  private _category: Category;
  private _taskAmount: number;
  private _projectIds: string[];

  constructor(
    id: string,
    name: string,
    category: Category,
    taskAmount: number = 0,
    projectIds: string[] = [],
  ) {
    // !Sparar värdena från parametrarna i klassens fält
    this._id = id;
    this._name = name;
    this._category = category;
    this._taskAmount = taskAmount;
    this._projectIds = projectIds;
  }
  //? getter gör att andra delar av appen kan LÄSA värdena utan att kunna ändra dem
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get category(): Category {
    return this._category;
  }

  get taskAmount(): number {
    return this._taskAmount;
  }

  get projectIds(): string[] {
    return this._projectIds;
  }

  //? sätts när beräkningen från uppgifter och projekt är klar
  //!setter gör att man kan ändra värdet utifrån
  set taskAmount(value: number) {
    this._taskAmount = value;
  }

  //! datan som ska skcikas till firebase
  toFirebaseObject() {
    return {
      name: this._name,
      category: this._category,
      taskAmount: this._taskAmount,
      projectIds: this._projectIds,
    };
  }

  // Skapa en Member från data som kommer från Firebase
  static fromFirebase(id: string, data: any): Member {
    return new Member(
      data.id ?? id,
      data.name ?? "",
      data.category ?? "frontend",
      data.taskAmount ?? 0,
      data.projectIds ?? [],
    );
  }
}
