import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserLoginPayloadInterface, UserModel } from "src/types/User";
import bcrypt from "bcryptjs";
import LOG from "../../library/Logging";
import DB from "../../models/index";
import { v4 as uuidv4 } from "uuid";
import { Jwt, sign } from "jsonwebtoken";
import { QueryTypes } from 'sequelize';
import { sequelize } from "src/database/sequelize-db";
import UserRepositories from "../repositories/User.repository";
import { UpdatePostPayloadInterface, createPostInterface } from "src/types/Post";
import PostRepositories from "../repositories/Post.repository";

export default class PostFactory {

    static async create(body: createPostInterface) {
        try {

            return await PostRepositories.create(body);
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem creating post, was everything unique that needed to be");
        }
    }


    static async update(payload: UpdatePostPayloadInterface, userId: string) {
        try {
            return PostRepositories.update(payload, userId)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem inserting user, was everything unique that needed to be");
        }

    }

    static async delete(userId: string, postId: number) {
        try {
            return PostRepositories.delete(userId, postId)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem deleting post");
        }

    }

    static async getAll() {
        try {
            return PostRepositories.getAllPost()
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem deleting post");
        }
    }


    static async getPostById(id: number) {
        try {
            return PostRepositories.getPostById(id)
        } catch (err) {
            if (err instanceof Error) LOG.error(err.name);
            throw Error("Problem deleting post");
        }
    }
}