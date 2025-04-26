import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TIUsers, TSUsers, TableUser } from "../drizzle/schema";

// Get a list of users, optionally limiting the results
export const usersService = async (limit?: number): Promise<TSUsers[] | null> => {
  if (limit) {
    return await db.query.TableUser.findMany({
      limit: limit,
    });
  }
  return await db.query.TableUser.findMany();
};

// Get a user by ID
export const getuserservice = async (id: number): Promise<TIUsers | undefined> => {
  return await db.query.TableUser.findFirst({
    where: eq(TableUser.id, id),
  });
};

// Create a new user
export const createuserservice = async (user: TIUsers) => {
  await db.insert(TableUser).values(user);
  return "User created successfully";
};

// Update an existing user by ID
export const updateuserservice = async (id: number, user: TIUsers) => {
  await db.update(TableUser).set(user).where(eq(TableUser.id, id));
  return "User updated successfully";
};

// Delete a user by ID
export const deleteuserservice = async (id: number) => {
  await db.delete(TableUser).where(eq(TableUser.id, id));
  return "User deleted successfully";
};