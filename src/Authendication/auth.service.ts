import bcrypt from "bcrypt";
import { db}  from "../drizzle/db"; // Importing the database instance
import { TableUser, TableAuthendication } from "../drizzle/schema"; 
import { userSchema, authSchema, loginSchema } from "../users/validator"; 
import { eq } from "drizzle-orm"; 
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; 
const expiresIn = Number(process.env.EXPIRESIN); 
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
                password: hashedPassword,
                email: user.email
            })
            .execute();
        return 'User registered successfully'; 
    } catch (error) {
        await db.delete(TableUser).where(eq(TableUser.id, userId)).execute();
        throw new Error('Registration failed. Please try again.'); 
    }
}
export const loginUser = async (email: string, password: string) => {
    loginSchema.parse({ email, password }); 
    const users = await db.select().from(TableUser).where(eq(TableUser.email, email)).execute();
    if (users.length === 0) {
        throw new Error('User not found! Try Again'); 
    }
    const user = users[0];
    // Fetching the user's hashed password from the Authentication table
    const auths = await db.select().from(TableAuthendication).where(eq(TableAuthendication.user_id, user.id)).execute();

    if (auths.length === 0) {
        throw new Error('Invalid credentials! Try again'); // Throwing an error if the authentication details are not found
    }

    const auth = auths[0];

    
    if (!auth.password) {
        throw new Error('Invalid credentials! Try again'); // Throwing an error if the password is null
    }
    const isPasswordValid = await bcrypt.compare(password, auth.password);

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secret!,
        { expiresIn }
    );

    return { token, user }; // Returning the token and user details
};

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