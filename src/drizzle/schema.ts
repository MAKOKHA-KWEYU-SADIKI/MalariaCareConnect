import { serial,integer,varchar,timestamp } from "drizzle-orm/pg-core";
import { pgEnum,pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { date } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";


export const roleEnum = pgEnum("role", ["user", "admin", "doctor"]); // middleware
export const TableUser= pgTable("TableUsers", {
    id:serial("id").primaryKey(),
    name:varchar("name", { length: 255 }).notNull(),
    location:varchar("location", { length: 255 }).notNull(),
    phone:integer("phone").notNull(),  
    age:integer("age").notNull(),
    date_of_birth:date("date_of_birth").notNull(),
    gender:boolean("gender").notNull(),
    email:varchar("email", { length: 255 }).notNull().unique(),
    role:roleEnum("role").default("user").notNull(),
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
export const TableAuthendication = pgTable("authentication", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => TableUser.id,{onDelete:"cascade"}),
    password: varchar("password"),
    email: varchar("email", { length: 255 }).unique(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const AuthonUser=relations(TableAuthendication,({one})=>({
    user:one(TableUser,{
        fields:[TableAuthendication.user_id],
        references:[TableUser.id]
    })
}))

export type TSUsers=typeof TableUser.$inferSelect;
export type TIUsers=typeof TableUser.$inferInsert;

export type TSAdmin=typeof TableAdmin.$inferSelect;
export type TIAdmin=typeof TableAdmin.$inferInsert;

export type TSDoctor=typeof TableDoctor.$inferSelect;
export type TIDoctor=typeof TableDoctor.$inferInsert;

export type TSAuthentication=typeof TableAuthendication.$inferSelect;
export type TIAuthentication=typeof TableAuthendication.$inferInsert;

