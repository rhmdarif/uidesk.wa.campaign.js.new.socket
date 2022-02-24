const express = require("express");
const { createServer } = require("http");
const appPort = process.env.APP_PORT || "3000";

const app = express();
const httpServer = createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["https://omnichannel.uidesk.id", "http://103.66.46.141:3000"]
  }
});

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
        console.log("qr", token, datas);
        io.emit("qr-"+token, datas);
    });
    socket.on("logged", (token, datas) => {
        console.log("logged", token, datas);
        io.emit("logged-"+token, datas);
    });
    socket.on("logout", (datas) => {
        console.log("logout", datas);
        io.emit("logout", datas);
    });
    // IN - CLIENT
    socket.on("conversation", (token, datas) => {
      console.log("conversation", token, datas);
      io.emit("conversation-"+token, datas);
  });

    // OUT - CLIENT
});

 
// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// httpServer.listen(appPort, () => {
//     console.log(`Example app listening at http://localhost:${appPort}`);
//   });
  