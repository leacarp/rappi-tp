import { Types } from "mongoose";

export class UserOfAdapter {
    private readonly _id: Types.ObjectId;
    private readonly _name: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _role: string;

    constructor(id: Types.ObjectId, name: string, email: string, password: string, role: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    getId(): Types.ObjectId {
        return this._id;
    }

    getName(): string {
        return this._name;
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