const golos = require("golos-js")
golos.api.getDynamicGlobalProperties((err, result) => {
  const refHeadNum = (result.last_irreversible_block_num - 1) & 0xFFFF;
  steem.api.getBlockHeader(refHeadNum, function(e, res) {
       const refId = new Buffer(res.previous, 'hex').readUInt32LE(4);
       console.log(refHeadNum);
       console.log(refId);
     });
});
