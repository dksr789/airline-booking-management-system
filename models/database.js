import { createConnection } from "mysql2";
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from "../utils/config.js";

class Database {
  constructor() {
    this.db = createConnection({
      host: "sql6.freesqldatabase.com",
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });
  }

  connect = () => {
    return new Promise((resolve, reject) => {
      this.db
        .promise()
        .connect()
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  init = async () => {
    console.log("Connecting to DB...");
    try {
      await this.connect();
      console.log("Connected to DB!");
    } catch (error) {
      console.error("Failed to connect to DB:", error);
    }
  };
}

const db = new Database();
export default db;
