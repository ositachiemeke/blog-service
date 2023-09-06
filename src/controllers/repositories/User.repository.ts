import { QueryTypes } from "sequelize";
import { CreateUserPayloadInterface, UpdateUserPayloadInterface, UserAuthInterface, UserModel } from "../../../src/types/User";
import bcrypt from "bcryptjs";
import SQL from "../../utils/db";
import { RowDataPacket } from "mysql2";

export default class UserRepositories {
    sequelize: any;
    

    constructor(sequelize: any){
        this.sequelize= sequelize;
    }

    async findOneColName(colName: string, colValue: string) {
        const query = `
                SELECT *
                FROM users
                WHERE ${colName} = ?
                LIMIT 1
                `;
        const queryResponse = await SQL.execute<RowDataPacket[]>(query, [colValue]);
       
        if (!queryResponse[0].length) {
            return false;
        }
        return queryResponse[0][0] as UserModel;
    }

     async create({ username, email, password, name }: CreateUserPayloadInterface) {
        const query = `
                        INSERT INTO users (username, email, password,name,created_at, updated_at)
                        VALUES (?, ?, ?,?,?,?)
                    `;
       await SQL.execute<RowDataPacket[]>(query, [username, email, password, name, (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' '), (new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' ')],
        );

        const selectQuery = `
            SELECT *
            FROM users
            WHERE id = LAST_INSERT_ID()
            `;
        const user: RowDataPacket[] = await SQL.query(selectQuery);
        return user[0][0];
    }

     async update({ password, name }: UpdateUserPayloadInterface, userId: string) {
        const query = `
        UPDATE users
        SET name = ?, password = ?, updated_at = ?
        WHERE id = ?
        `;
        
        // Update the user's name and password
        await SQL.execute(query, [name, await bcrypt.hash(password, 8),(new Date(Date.now())).toISOString().slice(0, 19).replace('T', ' '), userId
        ])
       

        // Fetch the updated user data
        const updatedUser: Array<RowDataPacket> = await SQL.execute(
            'SELECT * FROM users WHERE id = ?',[userId]
        );

        if (updatedUser[0] && updatedUser.length > 0) {
            // Omit password from the returned data
            updatedUser[0][0].password = undefined;
        }

        return updatedUser[0][0];

    }

     async delete(userId: string) {
        await SQL.execute(
            'DELETE FROM users WHERE id = ?',
           [userId]
        );

        return true;
    }
}