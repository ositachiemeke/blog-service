import { QueryTypes } from "sequelize";
import { sequelize } from "../../../src/database/sequelize-db";
import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserAuthInterface, UserModel } from "../../../src/types/User";
import bcrypt from "bcryptjs";
import { PostModelInterface, UpdatePostPayloadInterface, createPostInterface } from "../../../src/types/Post";
import SQL from "../../utils/db";
import { RowDataPacket } from "mysql2";

export default class PostRepositories {


    static async create({ title, content, user_id }: createPostInterface) {
        const query = `
                        INSERT INTO posts (title, content, user_id,created_at, updated_at)
                        VALUES (?, ?, ?,?,?)
                    `;

        await SQL.execute(query, [title, content, user_id, (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' '), (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ')]);
        const selectQuery = `
            SELECT *
            FROM posts
            WHERE id = LAST_INSERT_ID()
            `;
        const post = await SQL.query(selectQuery);
        return post[0][0] as PostModelInterface;
    }

    static async update(payload: UpdatePostPayloadInterface, userId: string) {

        const fieldsToUpdate = Object.entries({ content: payload.content, title: payload.title }).filter(([field, value]) => value !== undefined);
        payload.updated_at = (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ');
        const setValues = fieldsToUpdate.map(([field, value]) => `${field} = ${sequelize.escape(value as any)}`).join(', ');
        const query = `UPDATE posts SET ${setValues} WHERE user_id=${userId} AND id=${payload.post_id}`;

        // Update the user's name and password
        await SQL.query(
            query
        );

        // Fetch the updated user data
        const updatedPosted: Array<RowDataPacket> = await SQL.execute(
            'SELECT * FROM posts WHERE id = ? AND user_id = ?', [payload.post_id, userId]
        );


        return updatedPosted[0][0];

    }

    static async delete(userId: string, postId: number) {
        const response = await SQL.execute(
            'DELETE FROM posts WHERE id = ? AND user_id = ?',[postId, userId]
        );
        return true;
    }

    static async getAllPost() {
        const query = `
  SELECT
    p.id AS id,
    p.content AS content,
    p.title as title,
    JSON_OBJECT('id', u.id, 'name', u.username) AS user
  FROM
    posts AS p
  LEFT JOIN
    users AS u ON p.user_id = u.id
`;

        const response: RowDataPacket[] =  await SQL.query(
            query,
            
        );
        return response[0];
    }
    static async getPostById(id: number) {
        const query = `
  SELECT
    p.id AS id,
    p.content AS content,
    p.title as title,
    JSON_OBJECT('id', u.id, 'name', u.username) AS user
  FROM
    posts AS p
  LEFT JOIN
    users AS u ON p.user_id = u.id
  WHERE p.id = ?
`;

        const response: RowDataPacket[] = await SQL.execute(
            query,
           [id]
        );
        return response[0][0];
    }
}