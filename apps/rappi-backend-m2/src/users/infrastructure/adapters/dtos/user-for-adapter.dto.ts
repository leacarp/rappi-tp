export class UserForAdapter {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _role: string;

  constructor(id: string, email: string, password: string, role: string) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }

  getRole(): string {
    return this._role;
  }
}

