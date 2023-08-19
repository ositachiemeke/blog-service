import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserLoginPayloadInterface, UserModel } from "src/types/User";
import bcrypt from "bcryptjs";
import LOG from "./../../library/Logging";
import DB from "./../../models/index";
import { v4 as uuidv4 } from "uuid";
import { Jwt, sign } from "jsonwebtoken";
import { QueryTypes } from 'sequelize';
import { sequelize } from "src/database/sequelize-db";
import UserRepositories from "../repositories/User.repository";

export default class UserFactory {

    static async createUser(body: CreateUserPayloadInterface) {
        try {
            body.password = await bcrypt.hash(body.password, 8);
            return await UserRepositories.create(body);
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }
    }

    static async isEmailUnique(email: string) {
        const response = await UserRepositories.findOneColName("email", email);
        return response;
    }

    static async isUsernameUnique(username: string) {
        const response = await UserRepositories.findOneColName("username", username);
        return response;
    }

    static async login({ email, username, password }: UserLoginPayloadInterface) {

        let colname = email && "email" || "username";
        let colValue = email || username;

        const user = await UserRepositories.findOneColName(colname, colValue || "")
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

    static async updateUser(payload: UpdateUserPayloadInterface, userId: string) {
        try {
            return UserRepositories.update(payload, userId)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }

    }

    static async deleteUser( userId: string) {
        try {
            return UserRepositories.delete( userId)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }

    }
}