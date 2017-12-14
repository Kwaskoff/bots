const BOTMASTER = "robot"

const GolosBots = [
["vikx",["5*************","5**************8"]],
["vikxx",["5************","5*****************88"]],
["vikxxx",["5**********88","5******************"]]
// Endless list...
]

const golos = require('golos-js')
require('events').EventEmitter.prototype._maxListeners = 9e7;
golos.config.set('websocket', "ws://localhost:9090")
let count = 0
for(let i of GolosBots){
let username = i[0]
let active = i[1][1]
setTimeout(() =>{
golos.api.getAccounts([username], (e, data)=>{
if (e) return console.warn(e)
const account = data[0];
const postingAuth = account.posting;
const memo = account.memo_key;
const weight = postingAuth.weight_threshold;
postingAuth.account_auths.push([BOTMASTER, weight]);
golos.broadcast.accountUpdate(active, username, 
undefined, undefined, postingAuth, memo, account.json_metadata, (err, result)=> {
   if(err)return console.log("ERROR",username)
    console.log(username,'ok')
});
})
},1e3*count)
count++
}
