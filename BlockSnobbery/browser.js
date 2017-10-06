var socket = new WebSocket('wss://api.golos.cf')

socket.onopen = function(event) {

socket.send(JSON.stringify({ 
            id: 1,
            method: 'call', 
            "params": ["database_api","set_block_applied_callback",[0],]
}));

socket.onmessage = function(raw) {

var data = JSON.parse(raw.data)
if (data.method === "notice" && data.params){
	
	var hex = data.params[1][0].previous.slice(0,8)
	var height = parseInt(hex,16)+1
	socket.send(JSON.stringify({ 
            id: 2,
            method: 'call', 
            params: ["database_api","get_ops_in_block",[height,"false"]]
       }));
	
}
else if (data.id === 2){
	
	console.log(data.result)
	
} 
}
}
