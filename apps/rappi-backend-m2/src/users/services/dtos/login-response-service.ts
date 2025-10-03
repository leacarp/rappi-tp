export class LoginResponseService {
  private readonly _userId: string;
  private readonly _email: string;
  private readonly _role: string;
  private readonly _token?: string;

  constructor(userId: string, email: string, role: string, token?: string) {
    this._userId = userId;
    this._email = email;
    this._role = role;
    this._token = token;
  }

  getUserId(): string {
    return this._userId;
  }

  getEmail(): string {
    return this._email;
  }

  getRole(): string {
    return this._role;
  }

  getToken(): string | undefined {
    return this._token;
  }
}
