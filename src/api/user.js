const { createUser, createUserValidator, getAllUsers } = require("../db/user");

const createSingleUser = (prisma) => {
  return async (req, res) => {
    try {
      const user = req.body;
      createUserValidator(user);
      const persistedUser = await createUser(prisma, user);
      res.statusCode = 201;
      res.json({ user: persistedUser });
    } catch ({ errors, name, ...rest }) {
      res.statusCode = 400;
      res.json({ errors, name });
    }
  };
};

const getUsers = (prisma) => {
  return async (req, res) => {
    const users = await getAllUsers(prisma);
    res.statusCode = 200;
    res.json({ users });
  };
};

module.exports = {
  getUsers,
  createSingleUser,
};
