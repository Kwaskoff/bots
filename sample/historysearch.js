// RUN IN BROWSER CONSOLE

const ACC = "vp-liganovi4kov"

golos.config.set('websocket', "wss://ws.golos.io")
let limitcount = 2e3
let fromcount = limitcount

let seq = 1

const getStat = (f) => {

    golos.api.getAccountHistory(ACC, fromcount, limitcount, (err, result) => {
        if (err) {
            console.log(err)
        }
        for (name of result) {
            let block = name[1].block
            let TYPE = name[1].op[0] === 'comment'

            if (TYPE) {
              
                
                const KEY = name[1].op[1].parent_author === "" && JSON.parse(name[1].op[1].json_metadata).tags.includes('anketa-ln')

                if (KEY) {
                 
                 golos.api.getContent(name[1].op[1].author,name[1].op[1].permlink, 0, (e,l)=>{
                    if(e)return console.log(e) 
                    if(l.created===l.last_update){
                            console.log(seq,l.permlink,l.created)
                           seq++
                    }
                 })
                   
                }
            }
        }

        let last = result[result.length - 1][0]
        if (last === f) {

            fromcount = fromcount + limitcount
            getStat(fromcount)

        } else if (last < fromcount) {


        console.log('DONE')



        }

    });

}
getStat(fromcount)
