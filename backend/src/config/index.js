import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  pg: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  },
};

export default config;
