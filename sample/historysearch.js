// GO to golos.cf and run this in browser console
// Скрипт можно запустить в консоли браузера на golos.cf
// Скрипт поможет найти все посты с тегом TAG в аккаунте ACC без учета редакций и комментариев

var ACC = "vp-liganovi4kov" // Аккаунт в котором ищем операции
var TAG = "anketa-ln" // Искомый тег


var limitcount = 2e3
var fromcount = limitcount
var seq = 1
function getStat(f){
golos.api.getAccountHistory(ACC, fromcount, limitcount, function(err, result){
        if (err) return console.log(err)
        for (var name of result) {
            
		// СМОТРИМ ВСЕ ОПЕРАЦИИ КОММЕНТ
		if (name[1].op[0] === 'comment') {
              
// ИСКЛЮЧАЕМ КОММЕНТАРИИ, УЧИТЫВАЕМ ТОЛЬКО ПОСТЫ С ИСКОМЫМ ТЕГОМ
  if (name[1].op[1].parent_author === "" && JSON.parse(name[1].op[1].json_metadata).tags.includes(TAG)) {
                 golos.api.getContent(name[1].op[1].author,name[1].op[1].permlink, 0, function(e,l){
                    if(e)return console.log(e) 
                   
			 // ПРОВЕРКА НА ОПЕРАЦИЮ ТОЛЬКО СОЗДАНИЯ ПОСТА, ИСКЛЮЧАЯ ЕГО РЕДАКТИРОВАНИЕ
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
