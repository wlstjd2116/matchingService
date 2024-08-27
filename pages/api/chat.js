import { Server } from 'ws';

export default async function handler(req, res) {
  if (!res.socket.server.websocketServer) {
    const wss = new Server({ noServer: true });

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(message);
          }
        });
      });
    });

    res.socket.server.websocketServer = wss;
  }

  res.end();
}