export class LoginRequestService {
  private readonly _email: string;
  private readonly _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }
}