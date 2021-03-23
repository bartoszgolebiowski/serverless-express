const Yup = require("yup");

const getAllUsers = async (client) => {
  return client.user.findMany();
};

const userPostValidator = Yup.object({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  surname: Yup.string().nullable(),
});

const createUserValidator = (user) => {
  return userPostValidator.validateSync(user, {
    abortEarly: false,
    stripUnknown: true,
  });
};

const createUser = async (client, user) => {
  return client.user.create({
    data: { ...user },
  });
};

module.exports = {
  getAllUsers,
  createUserValidator,
  createUser,
};
