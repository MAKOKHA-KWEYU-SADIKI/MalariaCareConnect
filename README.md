🦟 MalariaCareConnect (MCC)
MalariaCareConnect (MCC) is a modern healthcare management system that enables organizations to efficiently register, enroll, and monitor clients across multiple health programs (e.g., Malaria, TB, HIV).
Built with security, scalability, and simplicity in mind.

🚀 Features
Create Health Programs – Manage different healthcare initiatives like Malaria, TB, HIV, etc.

Client Registration – Securely register new clients into the system.

Program Enrollment – Enroll clients in one or more health programs.

Client Search – Easily find clients by name, email, or other identifiers.

Client Profiles – View detailed client information and enrollment history.

API Access – Securely expose client profiles to external systems.

Full CRUD Operations – Create, Read, Update, Delete via authorized API endpoints.

Security Measures – Password hashing, JWT authentication, role-based access control.

🛠️ Technologies Used

Technology	Description
Node.js	Backend server environment
Hono	Lightweight web framework
TypeScript	Strong typing for better code
PostgreSQL	Relational database
Neon	Serverless PostgreSQL hosting
Drizzle ORM	Database interaction (typesafe)
JWT	Authentication token generation
Bcrypt	Password hashing and security
Dotenv	Environment variable management
📂 Project Structure
bash
Copy
Edit
├── src/
│   ├── Authendication/
│   │   └── auth.router.ts
│   ├── users/
│   │   └── user.router.ts
│   │   └── validator.ts
│   ├── drizzle/
│   │   ├── db.ts
│   │   └── migrations/
│   ├── middleware/
│   │   └── middleWare.ts
│   ├── index.ts
├── .env
├── package.json
└── README.md
🔒 Security
All passwords are hashed with bcrypt before saving to the database.

Endpoints are protected with JWT authentication.

Role-based authorization ensures only permitted users can perform sensitive operations.

Environment secrets are safely loaded using dotenv.

⚙️ Installation & Setup
bash
Copy
Edit
# 1. Clone the project
git clone https://github.com/your-username/MalariaCareConnect.git

# 2. Navigate to the project directory
cd MalariaCareConnect

# 3. Install dependencies
pnpm install

# 4. Create a .env file
# Example .env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EXPIRESIN=1h
PORT=8000

# 5. Run migrations (if any)
# (Assuming drizzle migrations setup)

# 6. Start the development server
pnpm dev
🛡️ API Authentication
All protected routes require a valid JWT Token to access.
You must include the token in the Authorization header like:

bash
Copy
Edit
Authorization: Bearer <your_token_here>
📈 Future Enhancements
Add client notifications via SMS/Email.

Create an Admin Dashboard for easier client management.

Integrate Machine Learning for client health risk predictions.

Expand API to support external third-party apps.

✨ Screenshots / Demo
(Add API responses, Postman screenshots, or Swagger docs here if available.)

🧑‍💻 Author
Sadiki Makokha (Abdirahman Sadque)
Passionate about creating tech-driven health solutions.
