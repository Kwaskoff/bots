const golos = require('golos-js')
const fs = require('fs')
golos.config.set('websocket','wss://ws.golos.io');
let l = 2000
let f = l
let count = 0
let transfers =[]
const getStat = (f) => {
    
golos.api.getAccountHistory('penis', f, l, (err, result)=> {
if (err){console.log(err)}
for (name of result){
let block = name[1].block
let isTransfer = name[1].op[0] === 'transfer'

if(isTransfer){

            let findmemo = name[1].op[1]['memo'].includes("Искомое мемо")
			if (block > 0 && findmemo){
			
			let from = name[1].op[1]['from']
			let to = name[1].op[1]['to']
			let memo = name[1].op[1]['memo']
			let amount = name[1].op[1]['amount']
			
		 let out = `${from} to ${to} ${amount}: ${memo}`
			transfers.push(out)
			console.log(out)
             }
			}
		}
	 
let last = result[result.length - 1][0]
if(last === f){
		
	f = f + l
	getStat(f)

	}
	else if	(last < f) {
	
		
		fs.appendFile('transfers.txt', transfers, (err)=> {
		  if (err) {
			console.log(err)
		  } else {
			
		  }
		  })
			 
			
		  
	} 

});

}
getStat(f)
