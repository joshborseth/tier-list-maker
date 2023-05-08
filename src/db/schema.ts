import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const entry = mysqlTable("entry", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 50 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 1024 }).notNull(),
});
