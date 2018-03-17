const golos = require('golos-js')
const fs = require('fs')
golos.config.set('websocket','wss://17.golos.cf' )
let signedTX = null
const unsignedTX = {
    'expiration': '2018-03-17T16:30:57',    
    'extensions': [],
    'operations': [
        ["transfer", { "from": "robot", "to": "vik", "amount": "0.001 GOLOS", "memo": "⚡ 1" }],
        ["transfer", { "from": "robot", "to": "vikx", "amount": "0.002 GOLOS", "memo": "⚡ 2" }],
        ["transfer", { "from": "robot", "to": "vikxx", "amount": "0.003 GOLOS", "memo": "⚡ 3" }]
        // СПИСОК ОПЕРАЦИЙ МОЖЕТ БЫТЬ ОЧЕНЬ БОЛЬШИМ...

],
    'ref_block_num': 32932,
    'ref_block_prefix':2156180128           
}

try {
    signedTX = golos.auth.signTransaction(unsignedTX,{"active":"5*******************КЛЮЧ************************"})
}
catch (error) {
    console.warn("Не удалось подписать транзакцию: " + error.message)
}
golos.api.broadcastTransactionSynchronous(signedTX, (err, result) => {
if(err) return console.log(err)
console.log(result.id)
})
