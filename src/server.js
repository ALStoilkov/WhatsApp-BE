import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import usersRouter from "./services/users/index.js";
import roomsRouter from "./services/rooms/index.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, { allowEIO3: true });

app.use("/user", usersRouter);
app.use("/room", roomsRouter);

export { app };
export default server;
