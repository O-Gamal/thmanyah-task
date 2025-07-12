import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";

export const DRIZZLE_DB = "DRIZZLE_DB";

export const drizzleProvider = [
  {
    provide: DRIZZLE_DB,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const user = configService.get("DATABASE_USERNAME");
      const password = configService.get("DATABASE_PASSWORD");
      const host = configService.get("DATABASE_HOST");
      const database = configService.get("DATABASE_NAME");
      const port = configService.get("DATABASE_PORT");

      const pool = new Pool({
        host,
        port,
        user,
        password,
        database,
        ssl:
          process.env.NODE_ENV === "production"
            ? {
                rejectUnauthorized: false,
              }
            : false,
        max: 20, // Maximum number of clients in the pool
        min: 2, // Minimum number of idle clients to maintain
        idleTimeoutMillis: 300000, // How long a client is allowed to remain idle (5 minutes)
        connectionTimeoutMillis: 10000, // How long to wait for a connection (10 seconds)
        keepAlive: true, // Enables TCP keepalive
        keepAliveInitialDelayMillis: 30000, // Send keepalive after 30 seconds of inactivity
        statement_timeout: 60000, // Terminate any statement that takes more than 60 seconds
        query_timeout: 60000, // Terminate any query that takes more than 60 seconds
      });

      // Add error handler to the pool
      pool.on("error", (err) => {
        console.error("Unexpected error on idle client", err);
      });

      try {
        console.log("Connecting to database pool...");
        const client = await pool.connect();
        await client.query("SELECT NOW()");
        client.release();
        console.log("Database pool connected successfully");
      } catch (error) {
        console.error("Error connecting to database pool:", error);
        throw error;
      }

      return drizzle(pool);
    },
  },
];
