export class Project {
  private _id?: string;
  private _name: string;
  private _description: string;
  private _deadline: string;
  private _memberIDs?: string[];
  private _taskIDs?: string[];

  constructor(
    name: string,
    description: string,
    deadline: string,
    memberIDs: string[],
    taskIDs: string[],
    id?: string,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._deadline = deadline;
    this._memberIDs = memberIDs;
    this._taskIDs = taskIDs;
    this._id = id;
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }

  get deadline(): string {
    return this._deadline;
  }

  get memberIDs(): string[] | undefined {
    return this._memberIDs;
  }

  get taskIDs(): string[] | undefined {
    return this._taskIDs;
  }
}
