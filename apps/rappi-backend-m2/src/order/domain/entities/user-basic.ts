import { Types } from "mongoose";

export class UserBasicEntity{
    private readonly _id : Types.ObjectId;
    private readonly _name : string;
    private readonly _email : string;

    constructor(id: Types.ObjectId, name: string, email: string){
        this._id = id;
        this._name = name;
        this._email = email;
    }

    getId() : Types.ObjectId{
        return this._id;
    }

    getName() : string{
        return this._name;
    }

    getEmail() : string{
        return this._email;
    }

    
}