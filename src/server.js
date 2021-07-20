import cors from "cors"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import usersRouter from "./services/users/index.js"
import roomsRouter from "./services/rooms/index.js"
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from "./errorHandlers.js"

const app = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server, { allowEIO3: true })

let onlineUsers = []

// Add "event listeners" on your socket when it's connecting
io.on("connection", (socket) => {
  console.log(socket.id)

  console.log(socket.rooms)

  // socket.on("join-room", (room) => {
  //     socket.join(room)
  //     console.log(socket.rooms)
  // })

  //   socket.on("setUsername", ({ username, room }) => {
  //     onlineUsers.push({ username: username, id: socket.id, room })

  //     //.emit - echoing back to itself
  //     socket.emit("loggedin")

  //     //.broadcast.emit - emitting to everyone else
  //     socket.broadcast.emit("newConnection")

  //     socket.join(room)

  //     console.log(socket.rooms)

  //     //io.sockets.emit - emitting to everybody in the known world
  //     //io.sockets.emit("newConnection")
  //   })

  socket.on("disconnect", () => {
    console.log("Disconnecting...")
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id)
  })

  socket.on("sendMessage", ({ message, room }) => {
    // await RoomModel.findOneAndUpdate(
    //   { name: room },
    //   {
    //     $push: { chatHistory: message },
    //   }
    // )

    socket.to(room).emit("message", message)
  })
})

app.use("/users", usersRouter)
app.use("/rooms", roomsRouter)

app.use(badRequestErrorHandler)
app.use(notFoundErrorHandler)
app.use(forbiddenErrorHandler)
app.use(catchAllErrorHandler)

export { app }
export default server