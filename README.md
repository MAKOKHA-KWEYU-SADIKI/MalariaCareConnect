you can view my ppt via: https://docs.google.com/presentation/d/1H4A3kVxiGPZJrYJI4wHcLz9h2oHdHj6b/edit#slide=id.p1
Titlle: MalariaCareConnect(MCC)

MalariaCareConnect is a robust API designed to streamline the connection between the patients, doctors and the administration in the context of malaria care. The API incorporate mechanism to protect data and ensure authorize access though the use of bcrypt for hashing password and jwt for token generation which will grant permission within a given time frame.

system offer:

-registration and login
-search for a client
-view and update profile
-expose client via API
-CRUD operation from admin side

technologies used:

-Node.js
-Hono
-Drizzle-ORM
-TypeScript
-PostgreSQL with neone
-REST Client

Installation:

for drizzle:
-I use pnpm as my package manager
-pnpm init to generate package.json file
-pnpm add drizzle-orm//installing drizzle
-pnpm i drizzle-kit @types/pg
-pnpm add -D tsx typescript
-pnpm add dotenv// which allow storage and use of environmental variables
-pnpm add -D @types/node
-pnpm tsc init // generate drizzle.config.ts file for configuration of my application

 for Hono:
 -pnpm add hono
 -pnpm add bcrypt
 -pnpm add jsonwebtoken
 -pnpm add typsript
 -pnpm add zod
 -pnpm add -D @hono/node-server
 -pnpm add -D @hono/zod-validator
 -pnpm add -D @types/bcrypt
 -pnpm add -D @types/jsonwebtoken
 
 usage:
 
 when one log in that is if he/she exists in the system, a token is generated which grants him/her some preveleges based on the role. if admin,patient or a doctor
