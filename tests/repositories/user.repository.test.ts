import { QueryTypes } from 'sequelize';
import {UserAuthInterface, UserModel} from "../../src/types/User";
import UserRepo from "../../src/controllers/repositories/User.repository";
import { describe, it } from '@jest/globals';


jest.mock('sequelize', () => ({
  QueryTypes: {
    SELECT: 'SELECT',
  },
}));

describe('findOneColName function', () => {
  it('should return the user when found', async () => {
    const mockQueryResponse: Array<UserAuthInterface> = [
      {
        id: "1",
        username: 'testuser',
        name: "test user",
        email: "email@gmail.com",
        password:"password"
      },
    ];

    const mockQuery = jest.fn().mockResolvedValue(mockQueryResponse);
    const mockSequelize = {
      query: mockQuery,
    };

    const colName = 'username';
    const colValue = 'testuser';

    const  userRepo = new UserRepo(mockSequelize)

    const result = await userRepo.findOneColName(colName, colValue);

    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), {
      replacements: [colValue],
      type: QueryTypes.SELECT,
    });

    expect(result).toEqual(mockQueryResponse[0]);
  });

  it('should return false when user is not found', async () => {
    const mockQueryResponse: Array<UserModel> = [];

    const mockQuery = jest.fn().mockResolvedValue(mockQueryResponse);
    const mockSequelize = {
      query: mockQuery,
    };

    const colName = 'username';
    const colValue = 'nonexistentuser';
    const  userRepo = new UserRepo(mockSequelize)


    const result = await userRepo.findOneColName(colName, colValue);

    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), {
      replacements: [colValue],
      type: QueryTypes.SELECT,
    });

    expect(result).toBe(false);
  });
});
