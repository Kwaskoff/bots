const WHO = "penis"
const PERMLINK = "my-post123"

const golos = require('golos-js')
const fs = require('fs')
golos.config.set('websocket', "ws://localhost:9090")
let limitcount = 2e3
let fromcount = limitcount
let count = 0
let transfers = []
const getStat = (f) => {

    golos.api.getAccountHistory(WHO, fromcount, limitcount, (err, result) => {
        if (err) {
            console.log(err)
        }
        for (name of result) {
            let block = name[1].block
            let deletedpost = name[1].op[0] === 'comment'

            if (deletedpost) {
                count++
                console.log(count)
                const KEY = name[1].op[1].permlink === PERMLINK;

                if (KEY) {
                    console.log(1)
                   let raw = JSON.stringify(name[1].op[1])

                    let out = `${block}
                    ${raw} 
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


            fs.appendFile("kostroma.txt", transfers, (err) => {
                if (err) return console.log(err)
                return console.log(transfers)
            })



        }

    });

}
getStat(fromcount)
