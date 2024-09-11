import * as dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import { connect } from "./db/dbConfig.js";
const PORT = process.env.PORT || 5003;
const server = http.createServer(app);

connect(process.env.MONGODB_URI);

//

server.listen(PORT, () => {
  console.log(`Server is running on  ${PORT}`);
});
