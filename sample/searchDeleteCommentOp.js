const WHO = "penis"

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
            let needOp = name[1].op[0] === 'delete_comment'

            if (needOp) {
                count++
                console.log(count)
                const KEY = true // Или условие для поиска конкретных данных

                if (KEY) {
                    console.log(1)
                   let raw = JSON.stringify(name[1].op[1])

                    let out = `${block}
                    ${raw} 
`// Нужно брать permlink и искать уже по операции создания поста с таким permlink и тогда получим все его редакции и текст.
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


            fs.appendFile(WHO+"deleted.txt", transfers, (err) => {
                if (err) return console.log(err)
                return console.log(transfers)
            })



        }

    });

}
getStat(fromcount)
