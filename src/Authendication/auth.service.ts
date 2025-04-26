// import {TableAuthentication, TableUsers, TIUsers  } from "../drizzle/schema";
// import {db} from "../drizzle/db"
// import { sql } from "drizzle-orm";
 
 
// export const createAuthUserService = async (user:  TIUsers & { password: string }): Promise<string | null> => {
//     try {
//         // Insert into Users table
//         const createdUser = await db.insert(TableUsers).values({
//           name: user.name,
//           location: user.location,
//           email: user.email,
//           phone: user.phone,
//           age: user.age,
//           gender: user.gender,
//           date_of_birth: user.date_of_birth,
    
//         }).returning({ id: TableUsers.id });
 
//         // Ensure the user was created and the id is retrieved
//         if (!createdUser || !createdUser[0] || !createdUser[0].id) {
//             throw new Error("Failed to create user in users table");
//         }
 
//         const userId = createdUser[0].id;
 
//         // Insert into Auth table
//         await db.insert(TableAuthentication).values({
//             user_id: userId,
//             password: user.password,
//             // role: user.role === 'user' || user.role === 'admin' || user.role === 'doctor' ? user.role : 'user',
//             email: user.email
//         });
 
//         return "User created successfully";
//     } catch (error) {
//         console.error("Error creating user in the database:", error);
//         return null;
//     }
// };
 
 
// export const userLoginService = async (user: TIAuthentication) => {
//     const { email,password } = user;
//     return await db.query.Authentication.findFirst({
//         columns: {
//             email: true,
//             role: true,
//             password: true
//         }, where: sql` ${Authentication.email} = ${email}`,
//         with: {
//             user: {
//                 columns: {
//                     full_name: true,
//                     contact_phone: true,
//                    address: true,
//                     id: true
//                 }
//             }
//         }
//     })
// }
 

import bcrypt from "bcrypt";
import { db}  from "../drizzle/db"; // Importing the database instance
import { TableUser, TableAuthendication } from "../drizzle/schema"; // Importing the Users and Authentication table schemas
import { userSchema, authSchema, loginSchema } from "../users/validator"; // Importing the validation schemas
import { eq } from "drizzle-orm"; 
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; // Getting the secret key for JWT from environment variables
const expiresIn = process.env.EXPIRESIN; 
export const registerUser = async (user: any) => {
    userSchema.parse(user); // Validating the user object against the user schema
    authSchema.parse(user);
    const existingUser = await db.select().from(TableUser).where(eq(TableUser.email, user.email)).execute();

    if (existingUser.length > 0) {
        throw new Error("User already exists"); // Throwing an error if the user already exists
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await db.insert(TableUser)
        .values({
            name:user.name,
            email:user.email,
            location:user.location,
            phone:user.phone,
            age:user.age,
            date_of_birth:user.date_of_birth,
            gender:user.gender
        })
        .returning({ id: TableUser.id })
        .execute();

    const userId = newUser[0].id;

    try {
        await db.insert(TableAuthendication)
            .values({
                user_id: userId,
                password: hashedPassword
            })
            .execute();
        return 'User registered successfully'; // Returning success message
    } catch (error) {
        // Rollback: Deleting the user from the Users table if the second insert fails
        await db.delete(TableUser).where(eq(TableUser.id, userId)).execute();
        throw new Error('Registration failed. Please try again.'); // Throwing an error if the registration fails
    }
}

// Service function to login a user
export const loginUser = async (email: string, password: string) => {
    loginSchema.parse({ email, password }); // Validating the login data against the login schema

    // Fetching the user by email from the Users table
    const users = await db.select().from(TableUser).where(eq(TableUser.email, email)).execute();

    if (users.length === 0) {
        throw new Error('User not found! Try Again'); // Throwing an error if the user is not found
    }

    const user = users[0];

    // Fetching the user's hashed password from the Authentication table
    const auths = await db.select().from(TableAuthendication).where(eq(TableAuthendication.user_id, user.id)).execute();

    if (auths.length === 0) {
        throw new Error('Invalid credentials! Try again'); // Throwing an error if the authentication details are not found
    }

    const auth = auths[0];

    // Validating the provided password against the stored hashed password
    // if (!auth.password) {
    //     throw new Error('Invalid credentials! Try again');
    // }
    
    if (!auth.password) {
        throw new Error('Invalid credentials! Try again'); // Throwing an error if the password is null
    }
    const isPasswordValid = await bcrypt.compare(password, auth.password);
//  if (!isPasswordValid) {
//         throw new Error('Invalid credentials! Try again'); // Throwing an error if the passwords don't match
//     }
   

    // Creating a JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secret!,
        { expiresIn }
    );

    return { token, user }; // Returning the token and user details
};

// Service function to verify a JWT token
export const verifyToken = (token: string) => {
    try {
        if (!secret) {
            throw new Error('Secret is undefined'); // Throwing an error if the secret is undefined
        }
        return jwt.verify(token, secret); // Verifying the token with the secret
    } catch (error) {
        throw new Error('Invalid token'); // Throwing an error if the token is invalid
    }
};