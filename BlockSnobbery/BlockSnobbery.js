const graphene = require("golos-js") 
//rename "golos-js" to "steem" for steemit blockchain (needs "npm install steem" comant in script dir.)

graphene.config.set('websocket','wss://api.golos.cf'); 
// or wss://steemd.steemit.com for steem blockchain. Also allowed "localhost:port" sheme

// You can set start block for bygone process
// client.hmset("GolosLastBlock", "num","10000123")

//For fast sync les 5ms 
//require('events').EventEmitter.prototype._maxListeners = 7000000;


// Just console colors
let green = "\x1b[36m" 
let red = "\x1b[31m"    


const redis = require("redis")
const client = redis.createClient()
const sub = redis.createClient() 
const pub = redis.createClient()


let lastblock = 0
let deltaDelay = 0
let timeA = 0
let doublecheck = true

// Getting node start param
let nodeparam = process.argv.slice(2);
let getNOW = nodeparam[0] === "now"
let checkpoint = (!isNaN(nodeparam[0])) ? nodeparam[0]: false

if(checkpoint) {lastblock = Number(checkpoint); client.hmset("GolosLastBlock", "num",checkpoint);checkpoint = false;}



console.log(`\x1b[32m 
						
🤘 BlockSnobbery.js GOLOS/STEEM blockchain redis-streamer. 
No block will be missed!\x1b[0m


	| Start from the specified block:
	|  > node blocksnobbery.js 1234565
	|
	| Start with the newest block:
	|  > node blocksnobbery.js now                                          
	|                                                                                              
	| Start with the Last remembered block:                          
	|  > node blocksnobbery.js                                                  
			
©️ golos.io/@vik 
			
			
			
`)


const getLastBlock = () => {

// Server time on begin of step
let t = new Date();
let time= t.toISOString();
timeA = Date.parse(time)



graphene.api.getDynamicGlobalProperties((err, n) => {
if (err) {
	setTimeout(() => getLastBlock(),1e4);
	return console.warn("👿 NO CONNECTION! Repeat after 10s ...")
}

let x = n.head_block_number // -1 for getting full list ops // last_irreversible_block_num


if(getNOW) {getNOW = false; lastblock = x-1; client.hmset("GolosLastBlock", "num",x-1)}


// This is the normal increase in block height
if         (x === lastblock+1)																		return readblock(x,green,              `[${x-lastblock} Sequence ✔]`)
	
// The last block is old. It is required to quickly process all blocks to the current block height
else if (x !== lastblock+1 && lastblock > 0 && x > lastblock) 	return readblock(lastblock+1,green,    `[${x-lastblock} Overtake 🏃]\x1b[0m`)	
	
// If the last block and the resulting one are equal, there is no growth. 
else if (x === lastblock) 																		return readblock(x+1,red,              `[${x-lastblock} OverSlow ♻️]`)	
	
// If the last block does not equal the next one
else if (x > lastblock+1 && lastblock > 0)  										return readblock(lastblock+1,red,    `[${x-lastblock} OverMiss ♻️]`)	
	
//If the height of the resulting block is less than the last processed block
else if (x < lastblock) 																			return readblock(lastblock+1,red,`[${x-lastblock} OverFast ♻️]`)

// in case script crashing , continue from the last processed block
client.hgetall("GolosLastBlock",(err, redisblock) => {
     if(err)	return readblock(x,green,`☢️ START \x1b[0m`)
		 
	 return readblock(Number(redisblock.num)+1,red,`[☢️ Reload ...]\x1b[0m`)
})

})


}


const sendDataToRedis = (x,B,style,cause) => {
	
	
	 let o = B.length
	 lastblock = x
	 client.hmset("GolosLastBlock", "num",x)
	
						
			let t = new Date();
			 let time= t.toISOString();
			 let servtime = Date.parse(time)
			 
	if(!B[0]) return graphene.api.getBlock(x, (err, check) => { 
					if(!err && check) {
						
					deltaDelay = servtime - timeA
						if(cause.includes('Overtake 🏃')){
								setTimeout(() => getLastBlock(),50); 
							return console.log(`   ${x}   ------ 0   [📋 No ops... ]                                  🔴 High Speed 50ms`)
						} else {
							
							
							if(doublecheck){
							lastblock = x-1
							client.hmset("GolosLastBlock", "num",lastblock)
							doublecheck = false
							}else{
								lastblock = x
								client.hmset("GolosLastBlock", "num",lastblock)
								doublecheck = true
							}
							setTimeout(() => getLastBlock(),3e3-deltaDelay)
							
							
							return console.log(`   ${(doublecheck)?"🔴 Real empty  block":"Check block "+x}  ------ 0   [📋 No ops... ]                                  🔴 Interval ~== 3s       Doublecheck block`)
						}
						
					
					
					}else{
						graphene.api.getDynamicGlobalProperties((err, n) => {
						let b = n.head_block_number // -1 required for getting full list ops // last_irreversible_block_num
						lastblock = b
						client.hmset("GolosLastBlock", "num",lastblock)
					
					if(lastblock > b+1) {
							
						} else {
						
						}
						
						
							deltaDelay = servtime - timeA
							setTimeout(() => getLastBlock(),3e3-deltaDelay)
						
						return console.log(`\x1b[37m   ********   <<------   [🛠 Outrunning]    🚑 Return to sequence 1B       🔴 Return to the current    ${x}  \x1b[0m`)
						})
						
						
					}
					
			})
			
			doublecheck = true
			let txTimes = []
			 
			for(tx of B) {
				 txTimes.push(Date.parse(tx.timestamp))
			 }
			let lastTime = Math.max.apply(Math, txTimes);
			
		
			 
			
			let timestamp =new Date(lastTime).toISOString();
			  let delta = servtime - lastTime 
			 let delay = delta / 1e3
			let interlog = "Interval === 3s"
		
						// Servertime in the end of step
						
						
		deltaDelay = servtime - timeA
		if(delta > 3e3) {
				
				deltaDelay = 0
				if(cause.includes('Overtake 🏃')){
					interlog = "Check fast 40ms"
						   setTimeout(() => getLastBlock(),40);
				}else{
					interlog = "Check last   1s"
						   setTimeout(() => getLastBlock(),1e3);
				}
	
		} else {
			
			interlog = (deltaDelay)?"Interval ~ < 3s":"Interval === 3s";
			
			setTimeout(() => getLastBlock(),3e3 - deltaDelay);
		}
		
		
		
	
	// CONSOLE LOG
	
	let nicecount = (o > 9)?"📝 Operations streamed: "+o:"📄 Operations streamed: 0"+o
let log = `   ${x}   ------->   ${cause}    ⌛️ Age of last TX ${delay.toFixed(3)}s       🔴 ${interlog} ✂️ ${deltaDelay}ms   ${nicecount}  \x1b[0m`
	let color = (style === green)? green:red
	console.log(color+log)
	
	// Get & filter all operations from block
	if(B[0].op){
		let ops = []
		for(let tx of B){
				ops.push(tx.operations)
		}
			let JSONblock = JSON.stringify(ops)
			
			// Publish block into REDIS stream:
			return pub.publish("golosblocks", JSONblock);
		
		} 								
}



const readblock = (x,style,cause) => {

	graphene.api.getOpsInBlock(x, false, (err2, rawBLOCK) => { 
	
	if(err2) { console.log(`Error in "getOpsInBlock"`); return setTimeout(() => getLastBlock(),3e3)}
		
		sendDataToRedis(x,rawBLOCK,style,cause)	
		})
}

getLastBlock()
