import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const cities = mysqlTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});
