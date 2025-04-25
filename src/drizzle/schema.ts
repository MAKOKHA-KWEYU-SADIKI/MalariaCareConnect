import { serial,integer,varchar,timestamp } from "drizzle-orm/pg-core";
import { pgEnum,pgTable } from "drizzle-orm/pg-core";
import { relations,One,Many } from "drizzle-orm";

export const TableUsers= pgTable("TableUsers", {
    id:serial("id").primaryKey(),
    name:varchar("name", { length: 255 }).notNull(),  
    location:varchar("location", { length: 255 }).notNull(),
    phone:varchar("phone", { length: 255 }).notNull(),  
    email:varchar("email", { length: 255 }).notNull().unique(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow(),
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
   // role: pgEnum("role", ["user", "admin", "doctor"]).default("user"), // middleware
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const AuthonUser=relations(TableAuthentication,({one})=>({
    user:one(TableUsers,{
        fields:[TableAuthentication.user_id],
        references:[TableUsers.id]
    })
}))
