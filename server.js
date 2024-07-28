const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const solana = require('./solana');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  socket.on('mensagem', (mensagem) => {
    console.log('Mensagem recebida: ' + mensagem);
    io.emit('mensagem', mensagem);
  });

  // Outros eventos relacionados ao jogo aqui
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
