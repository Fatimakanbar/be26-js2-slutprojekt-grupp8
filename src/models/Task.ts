import type { Category } from "./Member";

export type Priority = 1 | 2 | 3;

export type Status = "new" | "ongoing" | "finished";

export class Task {
  private _id?: string;
  private _name: string;
  private _description: string;
  private _category: Category;
  private _status: Status;
  private _priority: Priority;
  private _deadline: string;
  private _createdDate: string;
  private _assignedMemberId?: string;
  private _finishedDate?: string;

  constructor(
    name: string,
    description: string,
    category: Category,
    status: Status,
    priority: Priority,
    deadline: string,
    createdDate: string,
    assignedMemberId?: string,
    finishedDate?: string,
    id?: string,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._category = category;
    this._status = status;
    this._priority = priority;
    this._deadline = deadline;
    this._createdDate = createdDate;
    this._assignedMemberId = assignedMemberId;
    this._finishedDate = finishedDate;
  }

  get id(): string | undefined{
    return this._id;
   }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get category(): Category {
    return this._category;
  }
  get status(): Status {
    return this._status;
  }

  get priority(): Priority {
    return this._priority;
  }

  get deadline(): string {
    return this._deadline;
  }

  get createdDate(): string{
    return this._createdDate;
  }

  get assignedMemberID(): string | undefined {
    return this._assignedMemberId;
  }

  get finishedDate(): string| undefined {
    return this._finishedDate;
  }
}
