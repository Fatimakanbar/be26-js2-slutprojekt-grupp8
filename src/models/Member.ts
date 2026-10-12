export type Category = "frontend" | "backend" | "ux";

export class Member {
  private _id?: string; //tas bort senare, behöver för att jobba med tasks, DB
  private _name: string;
  private _category: Category;
  private _taskAmount?: number;
  private _projectIds?: string[];

  constructor(
    name: string,
    category: Category,
    taskAmount?: number,
    projectIds?: string[],
    id?: string, //tas bort senare, behöver för att jobba med tasks, DB
  ) {
    this._id = id; //tas bort senare, behöver för att jobba med tasks, DB
    this._name = name;
    this._category = category;
    this._taskAmount = taskAmount;
    this._projectIds = projectIds;
  }
  get id(): string | undefined { //tas birt senare, behöver för att jobba med tasks, DB
    return this._id;
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
