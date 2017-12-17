const CREDITOR = "penis"
const DIRECTION = "to" // or "from"
const DEBTOR = "vagina"

const golos = require('golos-js')
const fs = require('fs')
golos.config.set('websocket', "ws://localhost:9090")
let limitcount = 2e3
let fromcount = limitcount
let count = 0
let transfers = []
const getStat = (f) => {

    golos.api.getAccountHistory(CREDITOR, fromcount, limitcount, (err, result) => {
        if (err) {
            console.log(err)
        }
        for (name of result) {
            let block = name[1].block
            let isTransfer = name[1].op[0] === 'transfer'

            if (isTransfer) {
                count++
                console.log(count)
                let findEachOther = name[1].op[1][DIRECTION] === DEBTOR

                if (findEachOther) {
                    console.log(1)
                    let from = name[1].op[1]['from']
                    let to = name[1].op[1]['to']
                    let memo = name[1].op[1]['memo']
                    let amount = name[1].op[1]['amount']

                    let out = `${from} to ${to} ${amount} BLOCK: ${block} MEMO: ${memo}
`
                    transfers.push(out)
                    console.log(out)
                }
            }
        }

        let last = result[result.length - 1][0]
        if (last === f) {

            fromcount = fromcount + limitcount
            getStat(fromcount)

        } else if (last < fromcount) {


            fs.appendFile(CREDITOR + "-" + DIRECTION + "-" + DEBTOR + ".txt", transfers, (err) => {
                if (err) return console.log(err)
                return console.log(transfers)
            })



        }

    });

}
getStat(fromcount)
