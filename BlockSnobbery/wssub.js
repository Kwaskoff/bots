const WebSocket = require('ws');
const ws = new WebSocket('wss://api.golos.cf');
const redis = require("redis")
const client = redis.createClient()
const pub = redis.createClient()

const Send = operations => {
let ops = []
for(let op of operations){
	ops.push(op.op)
}

let JSONops = JSON.stringify(ops)
console.log(JSONops)
return pub.publish("BlockOperations", JSONops);
}


ws.on('open', open = () => {
ws.send(JSON.stringify({ 
            id: 1,
            method: 'call', 
            "params": ["database_api","set_block_applied_callback",[0],]
        }));
ws.on('message', function incoming(raw) {
let data = JSON.parse(raw)
if (data.method === "notice" && data.params){
	
	let hex = data.params[1][0].previous.slice(0,8)
	let height = parseInt(hex,16)+1
	ws.send(JSON.stringify({ 
            id: 2,
            method: 'call', 
            params: ["database_api","get_ops_in_block",[height,"false"]]
       }));
	
}
else if (data.id === 2){
	
	Send(data.result)
	
} 
})
});
