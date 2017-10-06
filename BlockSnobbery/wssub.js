// set_block_applied_callback

const WebSocket = require('ws');
const ws = new WebSocket('wss://api.golos.cf');

ws.on('open', function open() {
  ws.send(JSON.stringify({ 
            id: 1,
            method: 'call', 
            "params": ["database_api","set_block_applied_callback",[10141870]]
        }));
});

ws.on('message', function incoming(data) {
  console.log(data);
});
