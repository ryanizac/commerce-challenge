import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = express();

server.use(cors());
server.use(express.json());

server.use("/*", (req, res) => {
  return res.send("hello from express ;)");
});

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:3000/`);
});
