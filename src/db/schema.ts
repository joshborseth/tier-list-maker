import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const entry = mysqlTable("entry", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 1024 }),
  imageUrl: varchar("imageUrl", { length: 1024 }),
});
