const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const appPort = process.env.APP_PORT || "3000";

const app = express();
const httpServer = createServer(app);

const io = require("socket.io")(httpServer);

app.get("/", (req, res) => {
    res
      .status(200)
      .send(
        "Baileys API using express."
      );
  });

io.on("connection", (socket) => {
    // IN - SERVER
    // OUT - SERVER
    socket.on("qr", (token, datas) => {
        socket.emit("qr-"+token, datas);
    });
    socket.on("logged", (token, datas) => {
        socket.emit("logged-"+token, datas);
    });
    socket.on("logout", (datas) => {
        socket.emit("logout", datas);
    });
    // IN - CLIENT

    // OUT - CLIENT
});

httpServer.listen(appPort, () => {
    console.log(`Example app listening at http://localhost:${appPort}`);
  });
  