const NAME = 'vp-liganovi4kov'
const OP = 'author_reward'
const filename = 'rewards'
const golos = require('golos-js')
const fs = require('fs')
golos.config.set('websocket','ws://localhost:9090');
let l = 2000
let f = l
let count = 0
let log =[]
const getStat = (f) => {
golos.api.getAccountHistory('vp-liganovi4kov', f, l, (err, result)=> {
if (err){console.log(err)}
for (i of result){
let block = i[1].block
let SeekingTx = i[1].op[0] === OP
if(SeekingTx){
let tx = i[1].op[1]
let time = i[1].timestamp
let out = `${tx["author"]}/${tx["permlink"]}
Блок ${block} Дата ${time}
Выплата в GBG ${tx["sbd_payout"]}. Выплата в GOLOS ${tx["steem_payout"]}. Выплата в СГ ${tx["vesting_payout"]}

`
console.log(out)
log.push(out)
}
		}
let last = result[result.length - 1][0]
if(last === f){
	f = f + l
	getStat(f)
}
	else if	(last < f) {
        fs.writeFile(NAME+'_'+filename+'.txt', log, (err)=> {
          if (err) return console.log(err)
          console.log(`Done`)
        })
	} 

});

}
getStat(f)


