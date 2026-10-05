import type { Category } from "./Member";

export type Priority = 1 | 2 | 3;

export type Status = "new" | "ongoing" | "finished";

class Task {
  private _name: string;
  private _description: string;
  private _category: Category;
  private _status: Status;
  private _priority: Priority;
  private _deadline: Date;
  private _createdDate: Date;
  private _assignedMemberId?: string;
  private _finishedDate?: Date;

  constructor(
    name: string,
    description: string,
    category: Category,
    status: Status,
    priority: Priority,
    deadline: Date,
    createdDate: Date,
    assignedMemberID: string,
    finishedDate: Date,
  ) {
    this._name = name;
    this._description = description;
    this._category = category;
    this._status = status;
    this._priority = priority;
    this._deadline = deadline;
    this._createdDate = createdDate;
    this._assignedMemberId = assignedMemberID;
    this._finishedDate = finishedDate;
  }

  private get name(): string {
    return this._name;
  }

  private get description(): string {
    return this._description;
  }

  private get category(): Category {
    return this._category;
  }
  private get status(): Status {
    return this._status;
  }

  private get priority(): Priority {
    return this._priority;
  }

  private get deadline(): Date {
    return this._deadline;
  }

  private get createdDate(): Date {
    return this._createdDate;
  }

  private get assignedMemberID(): string | undefined {
    return this._assignedMemberId;
  }

  private get finishedDate(): Date | undefined {
    return this._finishedDate;
  }
}
