const { Server } = require("socket.io");
const appPort = process.env.APP_PORT || "3000";

const io = new Server({ /* options */ });

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

io.listen(appPort);