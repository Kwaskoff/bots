// Реакция на ключевое слово
if(db.Septidea){
	if(opType === 'comment' && opData.parent_author !== ""){
		for(let ss of JSON.parse(db.Septidea)){
			let xx = ss.users.split(",")
			let zz = opData.body.includes(ss.keyword)
			let yy = xx.includes(opData.author)
			let author = opData.parent_author
			let permlink = opData.parent_permlink
			
if(yy && zz){
	golos.api.getActiveVotes(author,permlink,(err, result) => {
if (err || result === null) return console.warn(` ОШИБКА golos.api.getActiveVotes`)
	if (!result.map(x => x.voter).includes(db.login)) {
			let voteDelay = ss.delay
			let VOTEPOWER = ss.vote*100
			setTimeout(() => {
			golos.broadcast.vote(db.key, db.login, author, permlink, VOTEPOWER, (err, result) => { 
			if(err) return console.warn(err)
console.warn(`${db.login} (${s.keyword}) >>> @${author}/${permlink}`)


							
})
					},voteDelay*1000*60);
} else {
                    console.warn(`ДУБЛЬ: ${dbq.login} >> ${author} == ${permlink}`)
				 }
});
}			
}
		
}
}
// Конец реакции на ключевое слово
