const golos = require("golos-js")

golos.api.getDynamicGlobalProperties((err, result) => {

  const BlockNum = (result.last_irreversible_block_num - 1) & 0xFFFF;
    
  golos.api.getBlockHeader(refHeadNum, function (e, res) {
        
    const BlockPrefix = new Buffer(res.previous, 'hex').readUInt32LE(4);
        
    console.log(BlockNum);
    console.log(BlockPrefix);
    
  });
  
});
