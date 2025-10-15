import { UserBasicEntity } from "../../../domain/entities/user-basic";

export class UserBasicDto{
    constructor(private readonly _id: string, private readonly _name: string, private readonly _email : string) {}

    getId() : string{
        return this._id;
    }

    getName() : string{
        return this._name;
    }

    getEmail() : string{
        return this._email;
    }

    static fromEntity(user: UserBasicEntity): UserBasicDto {
        return new UserBasicDto(user.getId().toHexString(), user.getName(), user.getEmail());
    }
   
}