import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<string>;
  username: string;
  name: string;
  email: string;
  password: string;
}


export interface UserAuthInterface {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;

}

export interface UserLoginPayloadInterface {
  username?: string;
  email?: string;
  password: string;
}

export interface UpdateUserPayloadInterface {
  name: string;
  password: string;
}

export interface CreateUserPayloadInterface extends UserAuthInterface {
  password: string;

}