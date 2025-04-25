import { serial,integer,varchar,timestamp } from "drizzle-orm/pg-core";
import { pgEnum,pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { date } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";

export const TableUsers= pgTable("TableUsers", {
    id:serial("id").primaryKey(),
    location:varchar("location", { length: 255 }).notNull(),
    phone:varchar("phone", { length: 255 }).notNull(),  
    age:integer("age").notNull(),
    date_of_birth:date("date_of_birth").notNull(),
    gender:boolean("gender").notNull(),
    email:varchar("email", { length: 255 }).notNull().unique(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})
export const TableAdmin=pgTable("TableAdmin",{
    id:serial("id").primaryKey(),   
    name:varchar("name", { length: 255 }).notNull(),
    email:varchar("email", { length: 255 }).notNull().unique(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow(),
})

export const TableDoctor=pgTable("TableDoctors",{
    id:serial("id").primaryKey(),
    name:varchar("name", { length: 255 }).notNull(),    
    email:varchar("email", { length: 255 }).notNull().unique(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow(),
})
export const TableAuthentication = pgTable("authentication", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => TableUsers.id,{onDelete:"cascade"}),
    password: varchar("password"),
    email: varchar("email", { length: 255 }).unique(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});
export const RoleEnum = pgEnum("role", ["user", "admin", "doctor"]); // middleware

export const AuthonUser=relations(TableAuthentication,({one})=>({
    user:one(TableUsers,{
        fields:[TableAuthentication.user_id],
        references:[TableUsers.id]
    })
}))

export type TSUsers=typeof TableUsers.$inferSelect;
export type TIUsers=typeof TableUsers.$inferInsert;

export type TSAdmin=typeof TableAdmin.$inferSelect;
export type TIAdmin=typeof TableAdmin.$inferInsert;

export type TSDoctor=typeof TableDoctor.$inferSelect;
export type TIDoctor=typeof TableDoctor.$inferInsert;

export type TSAuthentication=typeof TableAuthentication.$inferSelect;
export type TIAuthentication=typeof TableAuthentication.$inferInsert;

