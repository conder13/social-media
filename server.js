//set up port on 3000
const io = require("socket.io")(3000, {
   cors: {
      origin: "*",
   },
});
//gives user a socket when loading page and sending message
io.on('connection', socket => {
   console.log("new user");
   socket.emit('chat-message', 'Hello World');
})