const WebSocket = require('ws')
const WS = 'localhost:8091'
let ws = new WebSocket(WS)
const subOnTx = '{"id":1,"jsonrpc":"2.0","method":"call","params":["database_api","set_block_applied_callback",[0]]}';
const redis = require("redis")
const client = redis.createClient()
const pub = redis.createClient()
const redKey = "lastsnobgolos"
const RESNOB=(blocks)=>{
    for (let i = 0, len = blocks.length; i < len; i++) { 
        const timeOut = setTimeout(()=> {
            console.log('>> fix missed block  ',blocks[i] );
 ws.send('{"id":2,"jsonrpc":"2.0","method":"call","params":["database_api","get_block",['+blocks[i]+']]}'
 ,(e) => {if(e) return console.warn(e)});
         },300*i)
    }
    
}

const SNOB = (reload,num) => {
let lastheight = Number(num)
if(reload) {
    ws.terminate()
    ws = new WebSocket(WS)
}

ws.on('close', close = (e) => {
    if(e) return //console.log('Error on close ',e)
    console.log('CORRECT CLOSE')
    SNOB(false,lastheight);
});

ws.on('open', open = (e) => {
    if(e) return console.warn(e)
    ws.send(subOnTx,(e) => {if(e) return console.warn(e)});
})

ws.on('message', (raw) => {
    let data = JSON.parse(raw)
    if(!data.result)return console.warn(data)
    if(data.id===1) {
       
    const hex = data.result.previous.slice(0,8)
    const height = parseInt(hex,16)+1
    const delta = height-lastheight-1
    
    if(lastheight===height){        
        console.log(`RELOAD ------------- STUCK ${lastheight}`)
	    return SNOB(true,lastheight);
    }
    
    const lh = lastheight
    if(height>lh+1 && lh>15e6){        
        const missed = (height-1)-lh;
        let missedBlocks = []
        for (let i = 0, len = missed; i < len; i++) { 
           missedBlocks.push(lh+1+i) 
         }
         console.warn('Missed: ', missedBlocks)
         RESNOB(missedBlocks)
    }

        
    let txBlock = [["Blockinfo",{"block":height,"delta":delta,"time":data.result.timestamp}]]
    for(let tx of data.result.transactions){
        for(let txs of tx.operations){
            txBlock.push(txs)
        }
    }
    
    lastheight = height
    client.set(redKey,lastheight);
    const JSONops = JSON.stringify(txBlock)
    console.log(`
\x1b[36m${lastheight} --------------------------------- ${data.result.timestamp} --- missed ${delta} --- ${JSONops.length}\x1b[0m
`)
console.log(JSONops)
    return pub.publish("golosblocks", JSONops);
    }else
    if(data.id===2){
      
        const txs=data.result.transactions
        if(txs){
        const hex = data.result.previous.slice(0,8)
        const height = parseInt(hex,16)+1
        let prep = [["Blockinfo",{"block":height,"delta":-1,"time":data.result.timestamp}]]
        
            for(let tx of txs){
                prep.push(tx.operations[0])
            }
            const txm = JSON.stringify(prep)
           // console.log('>>>>>>>>>>>>>>',txm)
           return pub.publish("golosblocks", txm);
        }
    }else{
        console.log(raw)
    } 
})
}

const interval = setInterval(()=> {
client.get(redKey, (e, lastBlock) => {
    console.log('Reload. Last:', lastBlock)
    return SNOB(true,lastBlock);
});

},5e5)

client.get(redKey, (e, lastBlock) => {
    console.log('New start. Last:', lastBlock)
    return SNOB(false,lastBlock);
});
