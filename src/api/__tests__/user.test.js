const { createRequest, createResponse } = require("node-mocks-http");
const { getUsers, createSingleUser } = require("../user");
const {
  createuserBody1,
  createuserBody2,
  createuserBody3,
  getAllUsersSample,
} = require("../../../test/samples/db/user");

const prisma = {
  user: {
    findMany: () => Promise.resolve(getAllUsersSample),
    create: () => Promise.resolve({ ...createuserBody1, id: 1 }),
  },
};

describe("/apiv1//user", () => {
  describe("GET", () => {
    it("get all users", async () => {
      const req = createRequest({
        method: "GET",
      });
      const res = createResponse();

      await getUsers(prisma)(req, res);

      const json = res._getJSONData();
      expect(json.users).toStrictEqual(getAllUsersSample);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("POST", () => {
    const createResponseBody = (createuserBody) => ({
      user: {
        ...createuserBody,
        id: 1,
      },
    });

    it("create user, empty post", async () => {
      const res = createResponse();
      const req = createRequest({
        method: "POST",
        body: createuserBody1,
      });

      await createSingleUser(prisma)(req, res);
      const json = res._getJSONData();
      expect(json).toStrictEqual({
        errors: ["email is a required field", "name is a required field"],
        name: "ValidationError",
      });
      expect(res.statusCode).toBe(400);
    });

    it("create user, correct body", async () => {
      prisma.user.create = () => ({ ...createuserBody2, id: 1 });
      const res = createResponse();
      const req = createRequest({
        method: "POST",
        body: createuserBody2,
      });

      await createSingleUser(prisma)(req, res);
      const json = res._getJSONData();
      expect(json).toStrictEqual(createResponseBody(createuserBody2));
      expect(res.statusCode).toBe(201);
    });

    it("create user, additional field", async () => {
      prisma.user.create = () => ({ ...createuserBody3, id: 1 });
      const res = createResponse();
      const req = createRequest({
        method: "POST",
        body: createuserBody3,
      });

      await createSingleUser(prisma)(req, res);
      const json = res._getJSONData();
      expect(json).toStrictEqual(createResponseBody(createuserBody3));
      expect(res.statusCode).toBe(201);
    });
  });
});
