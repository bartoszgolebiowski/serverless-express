const { PrismaClient } = require("@prisma/client");
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const { getUsers, createSingleUser } = require("./src/api/user");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get("/api/v1/user", getUsers(prisma));
app.post("/api/v1/user", createSingleUser(prisma));

module.exports.handler = serverless(app);
