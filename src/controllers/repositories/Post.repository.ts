import { QueryTypes } from "sequelize";
import { sequelize } from "src/database/sequelize-db";
import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserAuthInterface, UserModel } from "src/types/User";
import bcrypt from "bcryptjs";
import { PostModelInterface, UpdatePostPayloadInterface, createPostInterface } from "src/types/Post";

export default class PostRepositories {

    static async findOneColName(colName: string, colValue: string) {
        const query = `
                SELECT *
                FROM users
                WHERE ${colName} = ?
                LIMIT 1
                `;

        const queryResponse: Array<UserModel> = await sequelize.query(query, {
            replacements: [colValue],
            type: QueryTypes.SELECT,
        });
        if (!queryResponse.length) {
            return false;
        }
        return queryResponse[0];
    }

    static async create({ title, content, user_id }: createPostInterface) {
        const query = `
                        INSERT INTO posts (title, content, user_id,created_at, updated_at)
                        VALUES (?, ?, ?,?,?)
                    `;

        await sequelize.query(query, {
            replacements: [title, content, user_id, (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' '), (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ')],
            type: QueryTypes.INSERT,
        });
        const selectQuery = `
            SELECT *
            FROM posts
            WHERE id = LAST_INSERT_ID()
            `;
        const post = await sequelize.query(selectQuery, {
            type: QueryTypes.SELECT,
        });
        return post[0] as PostModelInterface;
    }

    static async update(payload: UpdatePostPayloadInterface, userId: string) {

        const fieldsToUpdate = Object.entries({ content: payload.content, title: payload.title }).filter(([field, value]) => value !== undefined);
        payload.updated_at = (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ');
        const setValues = fieldsToUpdate.map(([field, value]) => `${field} = ${sequelize.escape(value as any)}`).join(', ');
        const query = `UPDATE posts SET ${setValues} WHERE user_id=${userId} AND id=${payload.post_id}`;

        // Update the user's name and password
        await sequelize.query(
            query,
            {

                type: QueryTypes.UPDATE,
            }
        );

        // Fetch the updated user data
        const updatedPosted: Array<PostModelInterface> = await sequelize.query(
            'SELECT * FROM posts WHERE id = :post_id AND user_id =:userId',
            {
                replacements: { userId, post_id: payload.post_id },
                type: QueryTypes.SELECT,
            }
        );


        return updatedPosted[0];

    }

    static async delete(userId: string, postId: number) {
        const response = await sequelize.query(
            'DELETE FROM posts WHERE id = :postId AND user_id = :userId',
            {
                replacements: { userId, postId },
                type: QueryTypes.DELETE,
            }
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

        return await sequelize.query(
            query,
            {
                type: QueryTypes.SELECT,
            }
        );
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
  WHERE p.id = :id
`;

        const response = await sequelize.query(
            query,
            {
                type: QueryTypes.SELECT,
                replacements: { id },

            }
        );
        return response[0];
    }
}