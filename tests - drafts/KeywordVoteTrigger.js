const redis = require("redis");
const client = redis.createClient();

let SeptParams = false	
const PARAMS = 	[
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot,test", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы", users:"vik,v0id,robot", vote:100, delay:20},
	{keyword:"!Тест_голосования_группы_50", users:"vik,v0id,robot,test", vote:50, delay:30}
]

let test = "test"
let word = "!Тест_голосования_группы_50"


client.hmset('vik-token',"Septidea",JSON.stringify(PARAMS))

client.hgetall('vik-token', function(err, db) {
	if(err) return console.warn(err)
	if(db.Septidea){
		
		for(let params of JSON.parse(db.Septidea)){
		
			let x = params.users.split(",")
			let z = params.keyword === word
			let y = x.includes(test)
			
				console.log(x,z,y)
		
		}
	} else {
		console.warn(db.Septidea)
	}
});
