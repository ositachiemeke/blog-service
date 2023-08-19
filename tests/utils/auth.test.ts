import supertest from "supertest";
import createServer from "../../src/utils/server";
import { Users } from "../../src/models/Users";

const app = createServer();

const AUTHORIZATION_HEADER = "x-reliance-authorization";
const AUTHORIZATION_VALUE = "secret1";

const usersDBMock = {
  count: 2,
  rows: [
    {
      id: "0168d265-6d0d-4d60-9f9c-db4b4ba5da68",
      name: "Delores Ortiz",
      email: "delores.ortiz@example.com"
    },
    {
      id: "32212ef0-94bf-4508-97c0-1397777508f4",
      name: "Angel Lane",
      email: "angel.lane@example.com"
    }
  ]
};

describe("auth", () => {
  describe("users route", () => {
    describe("without the authorization header", () => {
      it("should return a 403", async () => {
        Users.findAndCountAll = jest.fn().mockReturnValue(usersDBMock);
        const { body, statusCode } = await supertest(app).get("/v1/users");

        expect(statusCode).toBe(403);
        expect(body).toEqual({ error: "Missing or incorrect x-reliance-authorization header" });
      });
    });

    describe("and with the authorization header", () => {
      it("should return a 200", async () => {
        Users.findAndCountAll = jest.fn().mockReturnValue(usersDBMock);
        const { body, statusCode } = await supertest(app)
          .get("/v1/users")
          .set(AUTHORIZATION_HEADER, AUTHORIZATION_VALUE);

        expect(statusCode).toBe(200);
        expect(body).toEqual(usersDBMock);
      });
    });
  });
});
