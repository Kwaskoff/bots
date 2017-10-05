const redis = require("redis")
const client = redis.createClient()
const sub = redis.createClient() 
sub.on("message", (channel, message) => {
      
      // RealTime Golos/Steem Blockchain Operations is here!
      console.log(message)
   
 });

 sub.subscribe("golosblocks");
