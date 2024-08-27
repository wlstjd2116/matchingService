import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function socket(req, res) {
  if (!res.socket.server.websocketServer) {
    return res.status(500).end();
  }

  const wss = res.socket.server.websocketServer;

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    wss.emit('connection', ws, req);
  }); 
});