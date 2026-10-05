class Project {
  private _name: string;
  private _description: string;
  private _deadline: Date;
  private _memberIDs?: string[];
  private _taskIDs?: string[];

  constructor(
    name: string,
    description: string,
    deadline: Date,
    memberIDs: string[],
    taskIDs: string[],
  ) {
    this._name = name;
    this._description = description;
    this._deadline = deadline;
    this._memberIDs = memberIDs;
    this._taskIDs = taskIDs;
  }

  private get name(): string {
    return this.name;
  }
  private get description(): string {
    return this.description;
  }

  private get deadline(): Date {
    return this.deadline;
  }

  private get memberIDs(): string[] | undefined {
    return this.memberIDs;
  }

  private get taskIDs(): string[] | undefined {
    return this.taskIDs;
  }
}
