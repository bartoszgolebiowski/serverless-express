const getAllUsersSample = [
  {
    id: 1,
    email: "test1@gmail.com",
    name: "name1",
    surname: "surname1",
  },
  {
    id: 2,
    email: "test2@gmail.com",
    name: "name2",
    surname: "surname2",
  },
];

const createuserBody1 = {
  email: "",
  name: "",
  surname: "",
};

const createuserBody2 = {
  email: "test@gmail.com",
  name: "name",
  surname: "surname",
};

const createuserBody3 = {
  email: "test@gmail.com",
  name: "name",
  surname: "surname",
  test: "test",
};

module.exports = {
  createuserBody1,
  createuserBody2,
  createuserBody3,
  getAllUsersSample,
};
