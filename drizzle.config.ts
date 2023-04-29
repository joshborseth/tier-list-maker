import type { Config } from "drizzle-kit";
export default {
  schema: "./src/db/schema.ts",
  connectionString:
    'mysql://9i4eob465l1mcik1z309:pscale_pw_NcktlsTlPC7VWLQPtEGlNM3Dili49sVU1Ia8brVghii@aws.connect.psdb.cloud/free-dl-music?ssl={"rejectUnauthorized":true}',
} satisfies Config;
