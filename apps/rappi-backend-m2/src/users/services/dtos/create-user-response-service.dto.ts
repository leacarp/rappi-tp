export class CreateUserResponseService {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _role: string;
  private readonly _name: string;
  private readonly _specificInfo?: string;

  constructor(
    id: string,
    email: string,
    role: string,
    name: string,
    specificInfo?: string
  ) {
    this._id = id;
    this._email = email;
    this._role = role;
    this._name = name;
    this._specificInfo = specificInfo;
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getRole(): string {
    return this._role;
  }

  getName(): string {
    return this._name;
  }

  getSpecificInfo(): string | undefined {
    return this._specificInfo;
  }
}