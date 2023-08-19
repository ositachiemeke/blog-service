import supertest from "supertest";
import createServer from "../../src/utils/server";
import DB from "./../../src/models";

const app = createServer();

describe("health", () => {
  describe("health route", () => {
    describe("given the users does not exist", () => {
      it("should return a 200 with the down response", async () => {
        DB.raw.query = jest.fn().mockRejectedValue("some random value");
        const { body, statusCode } = await supertest(app).get("/health");

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual({
          status: "UP",
          /**
           * since the timestamp on the process and the running of the unit test are different
           * we can't use the process.uptime() method and instead we expect any string to be in property
           *
           * expect string as the toFixed(0) method returns a string
           */
          uptime: expect.any(String),
          checks: {
            db: "DOWN"
          }
        });
      });
    });

    describe("given the users do exist", () => {
      it("should return the list of users", async () => {
        DB.raw.query = jest.fn().mockReturnValue("some random value");
        const { body, statusCode } = await supertest(app).get("/health");

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual({
          status: "UP",
          /**
           * since the timestamp on the process and the running of the unit test are different
           * we can't use the process.uptime() method and instead we expect any number to be in property
           */
          uptime: expect.any(Number),
          checks: {
            db: "UP"
          }
        });
      });
    });
  });
});
