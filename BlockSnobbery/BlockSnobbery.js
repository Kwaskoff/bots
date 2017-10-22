const WS = 'ws://localhost:9090'
const CHANNEL = "blockschannel"
const redKey = "lastblocknumber"

console.log(`🤘 BlockSnobbery started`)

const WebSocket = require('ws');
const ws = new WebSocket(WS);
const redis = require("redis")
const client = redis.createClient()
const pub = redis.createClient()
const END ="\x1b[0m"
const RED ="\x1b[31m" 
const GREEN ="\x1b[36m"

let height = 0
let next = 0
let nodeparam = process.argv.slice(2);
let getNOW = nodeparam[0] === "now"
let targetheight = (!isNaN(nodeparam[0])) ? nodeparam[0]: false
let fheight = 0
let timestamp = 0
if(targetheight) {fheight = Number(targetheight);  client.set(redKey,fheight); targetheight = false;}


const getOps = (sequentBlock, speed) => {
ws.send(JSON.stringify({ 
            id: speed,
            method: 'call', 
            params: ["database_api","get_ops_in_block",[sequentBlock,"false"]]
		}), (e) => {
			if(e) return console.warn(e)
		});
		
}	

let Tl = D => {
let txTimes = []
	for(tx of D) {
				 txTimes.push(Date.parse(tx.timestamp))
	 }
	return Math.max.apply(Math, txTimes);
}

ws.on('open', open = () => {
ws.send(JSON
.stringify({ 
            id: 1,
            method: 'call', 
            "params": ["database_api","set_block_applied_callback",[0],]
}), (e)=>{
			if(e)return console.warn(e)
});
	
const Send = (operations,ProcessedBlockNum,ProcessedOpTime) => {
				
				let ops = []
				for(let op of operations){
					ops.push(op.op)
				}

				let JSONops = JSON.stringify(ops)
				let opslength = ops.length
				let delta = height+1-ProcessedBlockNum
				let state = (ProcessedBlockNum > height)? "Realtime":"🏃 Processing missed blocks... "+delta+" Left"
				let golostime = Date.parse(timestamp)
				let ageLastOps =(golostime - ProcessedOpTime)/1000
				
				console.log(`🔘 ${GREEN}${ProcessedBlockNum} ${END} ${RED}⌛️${ageLastOps} ${END} [🔴 ${height+1}] ${state}  📓 ${ops.length} 📐 ${JSONops.length}`)
				
				client.set(redKey,ProcessedBlockNum);
				if(ProcessedBlockNum <= height)getOps(ProcessedBlockNum+1,3)
				return pub.publish(CHANNEL, JSONops);
}
	

ws.on('message', (raw) => {

let data = JSON.parse(raw)

if (data.method === "notice" && data.params){
	let hex = data.params[1][0].previous.slice(0,8)
	height = parseInt(hex,16)
	timestamp = data.params[1][0].timestamp
	if(getNOW || height < fheight) client.set(redKey,height);
	client.get(redKey, (err, num) => {
		let lastblock = Number(num)
		next = height-1
		if(lastblock) next = lastblock+1
		let delta = height - next 
		if(delta < 0) return getOps(next,2)
		else if(lastblock < height ) return getOps(next,3)
	});
}

else if (data.id === 2){
	let lastTime = Tl(data.result)
	Send(data.result,next,lastTime)
} 

else if (data.id === 3){
	client.get(redKey, (err, num) => {
	let lastblock = Number(num)
	if(lastblock > height) return 
	let lastTime = Tl(data.result)
	Send(data.result,lastblock+1,lastTime)
	})
} 
})

});
