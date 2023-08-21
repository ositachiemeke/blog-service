import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserLoginPayloadInterface, UserModel } from "../../../src/types/User";
import bcrypt from "bcryptjs";
import LOG from "./../../library/Logging";
import { Jwt, sign } from "jsonwebtoken";
import { sequelize } from "../../../src/database/sequelize-db";
import UserRepositories from "../repositories/User.repository";

export default class UserFactory {
    userRepositories: UserRepositories;

   constructor(){
     this.userRepositories = new UserRepositories(sequelize);
   }

     async createUser(body: CreateUserPayloadInterface) {
        try {
            body.password = await bcrypt.hash(body.password, 8);
            return await this.userRepositories.create(body);
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }
    }

     async isEmailUnique(email: string) {
        const response = await this.userRepositories.findOneColName("email", email);
        return response;
    }

    async isUsernameUnique(username: string) {
        const response = await this.userRepositories.findOneColName("username", username);
        return response;
    }

    async login({ email, username, password }: UserLoginPayloadInterface) {

        let colname = email && "email" || "username";
        let colValue = email || username;

        const user = await this.userRepositories.findOneColName(colname, colValue || "")
        if (!user) {
            return false;
        }
        const filterUserObj = {
            ...user,
            password: undefined
        }

        const isMatch = await bcrypt.compare(password, user.password);
        const secretKey = process.env.SECRET_JWT;

        if (!isMatch || !secretKey) {
            return false;
        }

        const token = sign(filterUserObj, secretKey, {
            expiresIn: "1h"
        });
        return { user: filterUserObj, token }
    }

     async updateUser(payload: UpdateUserPayloadInterface, userId: string) {
        try {
            return this.userRepositories.update(payload, userId)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }

    }

     async deleteUser( userId: string) {
        try {
            return this.userRepositories.delete( userId)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }

    }
}