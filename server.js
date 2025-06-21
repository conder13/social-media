//set up port on 3000
const io = require("socket.io")(3000, {
   cors: {
      origin: "*",
   },
});

const users = {};

//gives user a socket when loading page and sending message
io.on('connection', socket => {
   //socket.emit('chat-message', 'Hello World');
   socket.on('new-user', username => {
      users[socket.id] = username;
      console.log(username + " joined");
      socket.broadcast.emit('user-joined', username);
   })
   socket.on('send-chat-message', message => {
      console.log(message);
      socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] });
   })
   socket.on('changed-username', username => {
      console.log(users[socket.id] + " changed their name to" + username);
      socket.broadcast.emit('changed-name', (users[socket.id] + " changed their name to " + username));
      users[socket.id] = username;
   })
})