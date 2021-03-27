export const activeUser = {}

export const socketController = ({ socket, io }) => {
    console.log("New client connected");

    const user = socket.handshake.query.user
    activeUser[user] = socket.id;
    socket.on('send', ({ to, newMsg }) => {
        io.to(activeUser[to]).emit('receive', { from: user, newMsg });
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        delete activeUser[user]
    });
}