const golos = require("golos-js")

// Ugly way:
golos.api.getDynamicGlobalProperties((err, result) => {

    const BlockNum = (result.last_irreversible_block_num - 1) & 0xFFFF;

    golos.api.getBlockHeader(result.last_irreversible_block_num, function (e, res) {

        const BlockPrefix = new Buffer(res.previous, 'hex').readUInt32LE(4);

        console.log(BlockNum);
        console.log(BlockPrefix);
    });
});

// Better & simple way:

BlockNum = 0
BlockPrefix = 0
