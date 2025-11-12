export class RegisterCustomerRequestService {
  private readonly _email: string;
  private readonly _password: string;
  private readonly _name: string;
  private readonly _phone: string;

  constructor(email: string, password: string, name: string, phone: string) {
    this._email = email;
    this._password = password;
    this._name = name;
    this._phone = phone;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }

  getName(): string {
    return this._name;
  }

  getPhone(): string {
    return this._phone;
  }
}

