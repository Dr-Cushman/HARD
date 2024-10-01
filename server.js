const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Array to store all connected WebSocket clients
let clients = [];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle WebSocket connections
wss.on('connection', (ws) => {
  clients.push(ws);
  ws.send('ring');
  console.log('New WebSocket client connected');

  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
    console.log('WebSocket client disconnected');
  });
});

// Function to broadcast message to all connected clients
const broadcast = (message) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// Route to trigger the ring button
app.get('/ringLeon', (req, res) => {
  console.log('Ring triggered!');
  // Broadcast to all WebSocket clients
  broadcast('ring');
  res.send('Ringing @Leon, please wait... He might be too stoned or too deaf to hear it.');
});

// Serve the app on port 3000
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:3000');
});