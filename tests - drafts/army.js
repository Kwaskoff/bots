const golos = require("golos-js");
golos.config.set('websocket','ws://localhost:9090');
require('events').EventEmitter.prototype._maxListeners = 9e7;
const GolosBots = [
["vikx",["5*************","5**************8"]],
["vikxx",["5************","5*****************88"]],
["vikxxx",["5**********88","5******************"]]
// Endless list...
]
let sz = 0
for(let qx of GolosBots){
let xvoter = qx[0]
let xkey = qx[1][0]
let wif = qx[1][1]
setTimeout(() =>{
	golos.broadcast.vote(xkey, xvoter, author, permlink, 1e4, (err, result) => {
			  if(err) return console.log(err)
			});
       
	
},1e3*sz)
sz++
}
