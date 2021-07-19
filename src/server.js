import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import usersRouter from "./services/users/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", usersRouter);

const server = createServer(app);
const io = new Server(server, { allowEIO3: true });

export { app };
export default server;
