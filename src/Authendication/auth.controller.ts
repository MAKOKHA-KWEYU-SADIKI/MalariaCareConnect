

import { Context } from "hono"; // Importing the Context type from the Hono library
import { loginUser,registerUser } from "./auth.service"; // Importing the registerUser and loginUser functions from the auth.service module

// Controller function to handle user registration
export const register = async (c: Context) => {
    try {
        const user = await c.req.json(); // Parsing the request body to get user details
        const message = await registerUser(user); // Calling the registerUser service function to register the user
        return c.json({ msg: message }, 201); // Returning a success response with the registration message
    } catch (error: any) {
        return c.json({ error: error.message }, 400); // Returning an error response if an exception occurs
    }
}

// Controller function to handle user login
export const login = async (c: Context) => {
    try {
        const { email, password } = await c.req.json(); // Parsing the request body to get email and password
        const { token, user } = await loginUser(email, password); // Calling the loginUser service function to authenticate the user
        return c.json({ token, user }, 200); // Returning a success response with the JWT token and user details
    } catch (error: any) {
        return c.json({ error: error.message }, 400); // Returning an error response if an exception occurs
    }
}