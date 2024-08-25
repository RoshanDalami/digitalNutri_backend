import * as dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import { connect } from "./db/dbConfig.js";

const server = http.createServer(app);

connect(process.env.MONGODB_URI)

// 

server.listen(5003, () => {
  console.log(`Server is running on  5003 `);
});