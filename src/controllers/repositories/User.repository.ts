import { QueryTypes } from "sequelize";
import { sequelize } from "src/database/sequelize-db";
import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserAuthInterface, UserModel } from "src/types/User";
import bcrypt from "bcryptjs";

export default class UserRepositories {

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

    static async create({ username, email, password, name }: CreateUserPayloadInterface) {
        const query = `
                        INSERT INTO users (username, email, password,name,created_at, updated_at)
                        VALUES (?, ?, ?)
                    `;

        await sequelize.query(query, {
            replacements: [username, email, password, name, (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' '), (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ')],
            type: QueryTypes.INSERT,
        });
        const selectQuery = `
            SELECT *
            FROM users
            WHERE id = LAST_INSERT_ID()
            `;
        const [user] = await sequelize.query(selectQuery, {
            type: QueryTypes.SELECT,
        });
        return [user];
    }

    static async update({ password, name }: UpdateUserPayloadInterface, userId: string) {
        // Update the user's name and password
        await sequelize.query(
            `
  UPDATE users
  SET name = :name, password = :hashedPassword, updated_at= :updated_at
  WHERE id = :userId
  `,
            {
                replacements: {
                    userId,
                    name,
                    updated_at: (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' '),
                    hashedPassword: await bcrypt.hash(password, 8),
                },
                type: QueryTypes.UPDATE,
            }
        );

        // Fetch the updated user data
        const updatedUser: Array<UserAuthInterface> = await sequelize.query(
            'SELECT * FROM users WHERE id = :userId',
            {
                replacements: { userId },
                type: QueryTypes.SELECT,
            }
        );

        if (updatedUser && updatedUser.length > 0) {
            // Omit password from the returned data
            updatedUser[0].password = undefined;
        }

        return updatedUser[0];

    }

    static async delete(userId: string) {
        await sequelize.query(
            'DELETE FROM users WHERE id = :userId',
            {
                replacements: { userId },
                type: QueryTypes.DELETE,
            }
        );

        return true;
    }
}