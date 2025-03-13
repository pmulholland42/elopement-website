import pgp, { IDatabase } from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";
const pg = pgp();

let db: IDatabase<{}, IClient> | null = null;

export const getDatabaseConnection = () => {
  if (db) {
    return db;
  } else {
    db = pg({
      host: "postgres", // Use the Docker service name as the hostname
      port: 5432,
      database: "mydatabase",
      user: "myuser",
      password: "mypassword",
      max: 10, // Connection pool size
      idleTimeoutMillis: 30000, // 30 seconds before timeout
    });
    return db;
  }
};
