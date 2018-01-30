# 📡 Список телеграм ботов для голоса

![ДЕГРАДАНТ](https://gateway.ipfs.io/ipfs/QmeQ3w9RSUkA2uaPNzC15kU3amh5cD1dU1P5FUpn3X9WRH)

#### 💯 Для автоматического голосования:

**[golosrobot](https://t.me/golosrobot ) [upvoterbot](https://t.me/upvoterbot) [upvote100bot ](https://t.me/upvote100bot) [upvbot](https://t.me/upvbot) [uppbot](https://t.me/uppbot) [up2bot](https://t.me/up2bot) [xvotebot](https://t.me/xvotebot) [votexbot](https://t.me/votexbot) [solocuratorbot](https://t.me/solocuratorbot) [strecozabot](https://t.me/strecozabot) [autoupvotebot](https://t.me/autoupvotebot) [mapvotebot](https://t.me/mapvotebot) [g0fuckbot](https://t.me/g0fuckbot) [upvotemebot](https://t.me/upvotemebot) [hottabot](https://t.me/hottabot) [goldvoicebot](https://t.me/goldvoicebot) [topocbot](https://t.me/topocbot ) [betarobot](https://t.me/betarobot)**

**Steemit версии**
[@steemrobot](https://t.me/steemrobot)
[@steem_robot](https://t.me/steem_robot)  
[@steemzbot](https://t.me/steemzbot)
[@steemxbot](https://t.me/steemxbot)

**Все вышеперечисленные боты идентичны друг другу по функционалу, а их количество обусловленно вашим желанием использовать несколько аккаунтов.**
#### Полезные боты
[WitnessMonitor](https://t.me/WitnessMonitor) - пропущенные блоки делегатов, уведомления через mention
https://t.me/goloschain - лента постов
https://t.me/degraderbot - Деградант и помощник, бот добавленный во многие группы, с большим списком скрытых команд для удобства пользователей. [Подробнее в отдельной статье.](https://golos.io/ru--boty/@vik/degradant-ili-pomoshchnik-gid-po-komandam-bota-dlya-golosa-v-chate-tmechain-cf-11-29)

#### [@golos_robot](https://t.me/golos_robot)
Мой последний бот. Предназначен для кросспостинга, в том числе отложенного в чейны голоса и steemit. Подробнее в посте [**🔥 Новый бот для быстрого или отложенного размещения постов сразу в несколько блокчейнов + IPFS + имитация приложений**](https://golos.io/ru--golos/@vik/instrukcii-k-golosrobot-reaktivnyi-sposob-razmeshat-v-golos-steemit-decentralizovannye-media-foto-audiozapisi-videosoobsheniya)




### [Ход работы](https://github.com/vikxx/bots/projects/1)
### [Задачи](https://github.com/vikxx/bots/issues/new)
### [Предложить функционал или сообщить об ошибке (issue)](https://github.com/vikxx/bots/issues/new)
### [Обратная связь в телеграм: @chain_cf](https://t.me/chain_cf)
### [Блог](https://golos.io/@vik)





#### Режим голосования за ВСЕ публикуемые посты
![](https://images.golos.io/DQmRPaobY5wYxiC3bzTT7KKpiSEP62TEnRcNxCV3DNQkX4V/image.png)

В этом режиме вы можете голосовать за все посты на голосе. Для экономии сил вы можете указать отдельную настройку веса голоса, указать запрещенные теги и черный список авторов.

#### Режим голосования за все посты с определенным тегом
![](https://images.golos.io/DQmaHTVgWUacfQbBS4sVj5DZGc8m1CRvST1jCmPy84Mq5nU/image.png)

В этом режиме вы можете голосовать автоматически за посты в которых есть определенный тег. 
Теги указываются в разделе тегов. Что бы не голосовать за пользователей, которые злоупотребляют тегами вы можете настроить черный список авторов.

#### Комментарии к вашим постам и ответ на них
![](https://images.golos.io/DQmahQBM1Y3vt2Xqy4gLVaugrYYCYKVZqq8uyfuuu1UkjvK/image.png)
По умолчанию вы получаете комментарии в ваш адрес в телеграм и можете отвечать на них из бота.
Что бы отключить вывод комментариев - воспользуйтесь выключателем в `/menu`

#### Призывы китов и Индивидуальные настройки фаворитов
![](https://images.golos.io/DQmVBJtk9o79MUGB74YBbD1BVUua4Xw9gj3L41jzR49sf1i/image.png)

В разделе дополнительных настроек можно найти кнопки `📡 Призывы` и `📋 Инд. настройки` 

##### Индивидульные настройки фаворитов
Вы можете указать индивидуальные настройки для каждого своего фаворита, для каждого автора свою отсрочку и силу.
Для этого нужно прислать настройки в формате вида:

```
[
 {"author":"vik", "vote":100, "delay":0},
 {"author":"robot", "vote":50, "delay":10},
 {"author":"netfriend", "vote":100, "delay":20},
 {"author":"nefer", "vote":100, "delay":30},
 {"author":"penis", "vote":-1, "delay":0}
]
```

В примере кода выше можно увидеть  5 строк с 3-мя параметрами
Каждая из строк описывает отдельного автора собственными параметрами
author - логин пользователя
vote - сила голоса от -100 до 100 (значение с минусом будет ФЛАГОМ, а не голосом!)
delay - Отсрочка  в минутах


##### Призывы 
Вы можете настроить голосование на основании наличия ключевых слов в комментарии поста.
Эта опция может быть использованна группами кураторов с общей идеей, в том числе группами в которых есть пользователи с большой долей Силы Голоса. Вы можете задать специальные ключевые слова, которые будут использовать кураторы вашей группы и голосовать по их призвыву в комментриях поста.
Для этого нужно прислать настройки в четком формате:

```
[
 {"keyword":"Проголосуй 100%", "users":"vik,robot", "vote":100, "delay":0},
 {"keyword":"Голос через полчаса :)", "users":"vik,robot", "vote":100, "delay":30},
 {"keyword":"Подай процент этому бомжу!", "users":"vik,robot", "vote":1, "delay":0}
]
```

В настройках выше можно увидеть 4 параметра

Ключевое слово keyword
Слово на которое будет реагировать бот. Предполагается, что такие слова будут сообщать организаторы конкурсов и программ поддержки и предлагать кураторов, которые будут читать посты и оставлять комментарий с призывом ботов к лучшим постам.

Cписок разрешенных пользователей users
Белый список логинов пользователей через запятую - если ключевое слово напишут они - бот будет голосовать. Если кто-то другой - бот не будет реагировать.

Силу голоса vote
Сила голоса для конкретного ключевого слова. Можно указать большое количество ключевых слов и для каждого слова свои индивидуальные настройки силы, отсрочки и белого списка юзеров.

Отсрочка delay

#### Дополнительные настройки силы
![](https://images.golos.io/DQmcw1SQaNqbbjxUCJS3aeADibBCudTJ6NMk2tBW6zXc8Un/image.png)

4 глобальные настройки:
* При голосе за фаворита
* При повторе голоса за куратором
* При голосовании за избранный тег
* При голосовании за все посты
Кроме глобальных настроек вы можете указать индивидуальные настройки силы для каждого фаворита и куратора в призывах.

#### Расширенные данные /me
Теперь /me выводит гораздо больше информации о вашем аккаунте
![](https://images.golos.io/DQmcoPuX91TTrTqDfkcJ9hAacUfbR422NbdNguF5mP8qgng/image.png)


* Опция голосования за посты с определенными тегами, с отдельной настройкой силы.
* Индивидуальные настройки силы и отсрочки для каждого фаворита
* Голосование на основании наличия ключевых слов в комментариях поста, с возможностью назначить разрешенный список комментаторов, индивидуальную отсрочку и силу на каждое ключевое слово.

#### Сервисные обновления

* ☑️ Обновлена архитектура сессий пользователей бота, отказоустойчивый алгоритм 
* ☑️ Кеширование инстансов
* ☑️ Новый обработчик блоков на основе собственной разработки [BlockSnobbery](https://github.com/vikxx/BlockSnobbery)
* ☑️ Улучшена обработка невалидных данных от пользователей
* ☑️ Возможность добавлять в черный список логины "по одному" вместо списка
* ☑️ Новый принцип обновлений 
* ☑️ Форсированная обработка пропущенных блоков в случае простоя
* ☑️ Исправлена последовательность отображения СГ при отложенном голосовании

***









#### Бот для чтения ленты мапалы:
https://t.me/mapalabot old


#### Бот для sept  (кошелек для массовых платежей) 
https://t.me/septcurbot

#### Кошелек для массовых выплат бонусов подписчикам
https://t.me/folloyaltybot

## Ссылки на мои сервисы

[📌 Чат для вопросов и поддержки моих ботов, сервисов или голоса в целом](https://t.me/chain_cf)
[📌 Канал с обновлениями и важными сообщениями для ботоводов](https://t.me/viknews)
[📌 Чат для получения апвотов от моих аккаунтов](https://golos.io/ru--golos/@degradant/2018-1-22t19-56-23)
[📌 Пример поста размещенного через бот golos_robot](https://golos.io/ru--golos/@degradant/2018-1-23t15-48-00)
[📌 Инструмент для поиска операций связанных с аккаунтом](https://golos.io/ru--golos/@vik/obnovlenie-golos-cf-history-novye-vozmozhnosti-dlya-poiska-i-analiza-istorii-akkauntov)
[📌 Мультисиги для голоса. Мультиподписные кошельки, владельцы или авторы](https://golos.io/ru--golos/@vik/multisigi-na-golose-12-09)
[📌 Создание аккаунтов на GOLOS/STEEMIT без смс верификации](https://golos.io/ru--golos/@vik/mgnovennaya-registraciya-akkauntov-na-golos-i-steem-bez-verifikacii-i-ogranichenii)
[📌 Большой список ботов для автоголосования в медиаблокчейнах](https://golos.io/ru--golos/@vik/obnovlenie-botov-uchteno-mnozhestvo-pozhelanii-dobavleny-novye-opcii-golosovaniya-nachalo-razrabotki-yazykovykh-paketov-ru-en-sn)
[📌 Социальный бот - Деградант](https://golos.io/ru--boty/@vik/degradant-ili-pomoshchnik-gid-po-komandam-bota-dlya-golosa-v-chate-tmechain-cf-11-29)
[📌 Паблик нода api.golos.cf](https://golos.io/ru--golos/@vik/publichnyi-api-dlya-golosa-dopolnitelnye-nody-i-nastroika-nginx-upstream-load-balancer-balansirovka-nagruzki)
[📌 Постинг через telegra.ph и продвижение постов на steemit среди пользователей ботов](https://golos.io/ru--golos/@vik/socialnoe-vzaimodejstvie---avtomaticheskoe-prodvizhenie-vashego-posta-sredi-polzovatelej-botov-11-12)
[ 📌 Новый чат для простого способа получить голоса от моих аккаунтов](https://t.me/cryptoporn)
