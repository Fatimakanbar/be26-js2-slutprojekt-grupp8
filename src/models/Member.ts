export type Category = "frontend" | "backend" | "ux";

export class Member {
  private _name: string;
  private _category: Category;
  private _taskAmount?: number;
  private _projectIds?: string[];

  constructor(
    name: string,
    category: Category,
    taskAmount?: number,
    projectIds?: string[],
  ) {
    this._name = name;
    this._category = category;
    this._taskAmount = taskAmount;
    this._projectIds = projectIds;
  }
  get name(): string {
    return this._name;
  }
  get category(): Category {
    return this._category;
  }

  get taskAmount(): number | undefined {
    return this?._taskAmount;
  }

  get projectIds(): string[] | undefined {
    return this?._projectIds;
  }
}
