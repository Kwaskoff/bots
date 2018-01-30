
const golos = require("golos-js");

const GolosBots = ["vikx","vikxx","vikxxx","golos-api","say10","nativechain","github","multisig","dpos","ceo","wss","react","creater","react0r","pisunlorem","lorempisun","chalova","transfer","vox","vox-vpopuli","vox-porno","onanist","yoyow","dmarket","ssh","uia","token","false","amount","exchanger","open","reblog","chain-cf","crypto.democrat","twitch","tumblr","envato","keychain","ltd","channel","escort","decentral","deadpoll","board","prostitutki","stuff","console","abort","morg","gamers","icoalert","germangref","spermbank","tester","snapshot","unlock","from","coinloan","gmail","protonmail","dittrex","battlehub","private","zalupa","degradant","police","fsb","index.html","vest","gest","drugstore","penis","vagina","sexshop","dostavka","sud","blockpay","dappstore","abuse","issue","website","log","golospay","blockexplorer","sonm","lepra","dirty","upvoter","just-a-test","metrika","cryptobank","registrator","golosrobot","betarobot","minigolos","reputation","vests","clone","testfortest","datum","colos","rewardpool","realestates","v0id","whitepaper","cybercoitus","coitus","signals","signal","minnowbooster"]

    let X = 0
for(let to of GolosBots){

setTimeout(() =>{


     golos.broadcast.transferToVesting('АКТИВНЫЙ КЛЮЧ', 'vik', to, '10000.000 GOLOS', function(err, result) {
        console.log(err, result);
      });
	
},1e3*X)
X++
}

