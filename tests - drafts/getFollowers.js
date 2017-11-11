let username = "vik"

const golos = require('golos-js')
const fs = require('fs')
golos.config.set('websocket', "ws://loacalhost:9090")

let last = null
let NAMES = []
	const getfollowers = (lastname) => {
		golos.api.getFollowers(username, lastname, "blog", 1000, (errs, follower) => {
				if (errs) return console.warn(errs)
				console.log(follower)

				if (last === follower[follower.length - 1].follower) {
					fs.appendFile('./'+username+'-followers.txt', NAMES, (err)=> {  if (err) {return console.warn(err)}})
                    return console.log(`>>>>>`)
				}
				
				for (let z of follower) NAMES.push(z.follower)
				last = follower[follower.length - 1].follower
				getfollowers(last)
			 })
        }
getfollowers(last)
