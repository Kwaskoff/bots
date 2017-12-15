// ROBOT

const newOwnerPubKey = ''; 
const recoveryAcc = 'robot'; 
const recover = ''; 
const newOwnerAuthority = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [
    [newOwnerPubKey, 1]
  ]
};
const extensions = [];
steem.broadcast.requestAccountRecovery(wif, recoveryAcc, recover, newOwnerAuthority, extensions, (err, result) => {
    console.log(err, result);
});

// USER

const account_to_recover = '';
const newOwnerPubKey = '';
const newOwnerPrivKey = '';
const oldOwnerPrivKey = '';
const oldOwnerPubKey = '';
golos.broadcast.send({
    extensions: [],
    operations: [[
        'recover_account',
        {
            account_to_recover,
            new_owner_authority: {weight_threshold: 1, account_auths: [], key_auths: [[newOwnerPubKey, 1]]},
            recent_owner_authority: {weight_threshold: 1, account_auths: [], key_auths: [[oldOwnerPubKey, 1]]}
        }
    ]]
}, [oldOwnerPrivKey, newOwnerPrivKey], (err, res) => {
  if(err) return console.log(err)
  console.log('OK',res)
});
