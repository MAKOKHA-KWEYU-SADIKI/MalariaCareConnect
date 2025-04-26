CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'doctor');--> statement-breakpoint
CREATE TABLE "TableAdmin" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "TableAdmin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "authentication" (
	"auth_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password" varchar,
	"email" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "authentication_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "TableDoctors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "TableDoctors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "TableUsers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"phone" integer NOT NULL,
	"age" integer NOT NULL,
	"date_of_birth" date NOT NULL,
	"gender" boolean NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "TableUsers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "authentication" ADD CONSTRAINT "authentication_user_id_TableUsers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."TableUsers"("id") ON DELETE cascade ON UPDATE no action;