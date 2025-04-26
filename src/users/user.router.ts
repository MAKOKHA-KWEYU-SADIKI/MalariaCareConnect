import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller";
import { usersSchema } from "./validator";
import { adminRoleAuth } from "../middleware/middleWare";
import dotenv from "dotenv";

dotenv.config();

export const userRouter = new Hono();

//Get all users
userRouter.get("/users", listUsers);

//Get a single user
userRouter.get("/user/:id", getUser);

//Create a user
userRouter.post(
  "/user",
  zValidator("json", usersSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createUser
);

//Update a user
userRouter.put("/user/:id", updateUser);

//Delete a user
userRouter.delete("/user/:id", deleteUser);
