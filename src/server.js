import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import usersRouter from './services/users/index.js';
import roomsRouter from './services/rooms/index.js';
import {
  badRequestErrorHandler,
  catchAllErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
} from './errorHandlers.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, { allowEIO3: true });

io.on('connection', (socket) => {
  console.log('someone connected', socket.id);
});
io.on('sendMessage', ({ room, message }) => {
  await RoomModel.findOneAndUpdate(
    { _id: room },
    {
      $push: { chatHistory: message },
    }
  );

  socket.to(room).emit('message', message);
});

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

app.use(
  badRequestErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler
);

export { app };
export default server;
