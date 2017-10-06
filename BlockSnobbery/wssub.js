const WebSocket = require('ws');
const ws = new WebSocket('wss://api.golos.cf');

ws.on('open', function open() {
  ws.send(JSON.stringify({ 
            id: 1,
            method: 'call', 
            "params": ["database_api","set_block_applied_callback",[0]]
        }));
});

ws.on('message', function incoming(raw) {
	let data = JSON.parse(raw)
	if (!data.params) return
	let hex = data.params[1][0].previous.slice(0,8)
	console.log(parseInt(hex,16))

})


