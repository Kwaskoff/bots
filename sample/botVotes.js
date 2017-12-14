let url = ""

const GolosBots = [
"vikx",
"vikxx",
// Endless list...
"vikxxx"
]
const wif = "5*****************************"; // POSTING KEY OF SIGNER ACCOUNT 
const golos = require('golos-js')
golos.config.set('websocket', "ws://localhost:9090")
const now = new Date().getTime()+3e6;
const expire = new Date(now).toISOString().split('.')[0]
let votes = []
const w = url.split("@", 2)
const s = w[1].split("/", 2)
const author = s[0]
const permlink = s[1]
console.log(author,permlink)

for(let botname of GolosBots){

votes.push(["vote",
{
"voter":botname,
"author":author,
"weight":10000,
"permlink":permlink
}])

}

const unsignedTX = {
    'expiration': expire,    
    'extensions': [],
    'operations': votes,
    'ref_block_num': 60419,
    'ref_block_prefix': 2937707173               
   }

let signedTX = null

try {
    signedTX = golos.auth.signTransaction(unsignedTX,{"posting":wif})
}

catch (error) {
    console.warn("Не удалось подписать транзакцию: " + error.message)
}

golos.api.broadcastTransactionSynchronous(signedTX, (err, result) => {
    if(err) return console.warn(err)
    let trxid = result.id
    if(!trxid) return console.log('Ошибка',result)
    console.log("Транзакция отправлена: golosd.com/tx/"+trxid)
});
