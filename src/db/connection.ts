import { drizzle } from "drizzle-orm/planetscale-serverless";
import { cities } from "./schema";
import { connect } from "@planetscale/database";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(connection);

const allCities = await db.select().from(cities);

console.log(allCities);
