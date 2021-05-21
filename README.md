# Redis

*Redis* (REmote DIctionary Server) — це сховище даних з відкритим кодом (ліцензія BSD), яке зберігає дані у вигляді "ключ-значення" (key-value). Redis зберігає всі дані в пам'яті, що дозволяє зробити доступ до даних максимально швидким в порівнянні з іншими базами даних. Завдяки цьому Redis відомий своєю винятковою високою продуктивністю навіть серед інших key-value сховищ. Написаний на ANSI C. 

У число можливостей Redis входить підтримка різноманітних структур даних, забезпечення високої доступності, робота з геопросторовими даними, створення скриптів Lua, підтримка транзакцій, постійне зберігання даних на диску і підтримка кластерів. 

Мови програмування, що мають бібліотеки для роботи з Redis: С, C++, C#, Clojure, Лисп, Erlang, Java, JavaScript, Haskell, Lua, Perl, PHP, Python, Ruby, Scala, Go, Tcl, Rust, Swift, Nim. 

## Особливості Redis 

- ***Швидкість***: Redis зберігає весь набір даних у оперативній пам’яті, тому він надзвичайно швидкий. Він завантажує до 110 000 SET / сек та 81 000 GET / сек. Є підтримка транзакцій, що дозволяють виконати за один крок групу команд, гарантуючи несуперечність і послідовність (команди від інших запитів не можуть вклинитися) виконання заданого набору команд, а в разі проблем дозволяючи відкотити зміни. 

- ***Персистентність***: Redis зберігає знімки баз даних на диску. Можливо налаштувати період збереження даних у залежності від кількості оновлених значень. Також можна використовувати режим дозапису. 

- ***Реплікація***: у Redis застосовується архітектура вузлів «ведучий-підлеглий» (master/slave) і підтримується асинхронна реплікація, при якій дані можуть копіюватися на кілька підлеглих серверів. Це забезпечує поліпшені характеристики читання (оскільки запити можуть бути розподілені між серверами) та прискорене відновлення в разі збою основного сервера. 

- ***Область застосування***: кешування даних, чати і системи обміну повідомлень, диспетчеризація будь-яких даних, моніторинг даних, робота з геопросторовими даними.

## Типи даних

Key – це завжди рядок, а як value можна використовувати будь-який з наступних типів даних.

-	**Рядки** (string) – текстові або двійкові дані розміром до 512 МБ.

-	**Списки** (list) – колекції рядків, впорядковані в порядку додавання.

-	**Множини** (set) – невпорядковані колекції рядків з можливістю перетину, об'єднання і порівняння з іншими типами множин.

-	**Впорядковані множини** (sorted set) – множини, елементи яких впорядковані за особливим параметром "score". Всі елементи, як і в звичайній множині, є унікальними; за score впорядковані за зростанням; значення score може повторюватися в різних елементах.

-	**Хеш-таблиці** (hash) – структури даних для зберігання пар ключ-значення.

## Установка Redis

Redis працює в більшості систем POSIX, таких як Linux, BSD, Mac OS X, Solaris тощо. Офіційної підтримки Windows наразі немає. 

#### Ubuntu

Redis входить в стандартні репозиторії Ubuntu 20.04. Для його установки виконайте наступні команди від імені користувача root або користувача з привілеями sudo: 
```
sudo apt update
sudo apt install redis-server
```
Після завершення установки служба Redis запуститься автоматично. Щоб перевірити стан служби, введіть наступну команду: 

`sudo systemctl status redis-server`

Ви повинні побачити щось на зразок цього: 
```
● redis-server.service - Advanced key-value store
     Loaded: loaded (/lib/systemd/system/redis-server.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2020-06-06 20:03:08 UTC; 10s ago
...
```

#### Windows

Як вже згадувалося, Redis офіційно не підтримується на Windows, але можливо встановити версію 3.2.100 або деякі більш старіші версії з [Github репозиторію](https://github.com/microsoftarchive/redis/releases). Для цього потрібно скачати архів `Redis-x64-3.2.100.zip`. Розпакуйте його в зручну для вас папку та запустіть файл `redis-server.exe`. Якщо ви хочете працювати з Redis через командний рядок, запустіть також файл `redis-cli.exe`.

## Початок роботи з Redis в Node.js

*node_redis* – Redis клієнт для node.js. Встановіть пакет через npm `npm install redis`. Підключіть до свого проекту:
``` javascript
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});
```
`redis.createClient()` використовує 127.0.0.1 та 6379 як ім'я хосту та порт за замовчуванням.

Кожна Redis комманда є функцією об'єкта *client*. Всі функції приймають в якості аргументів або масив *args* і необов'язкову функцію *callback*, яке довільне число аргументів, останнім з яких є необов'язкова функція callback. Для відображення повернутих значень під час тестування прикладів ми будемо використовувати зручну callback функцію `redis.print()` для зменшення коду.

### Основні команди

Деякі загальні команди, які застосовуються для будь-якого типу даних:

- `del` key [key...] – видаляє задані key, повертає їх кількість.

- `exists` key [key...] – перевіряє наявність заданих key, повертає кількість існуючих key або 0, якщо таких немає.

- `expire` key sec – видаляє заданий key через заданий час sec.

- `ttl` key – повертає кількість секунд до видалення key або -2, якщо час вийшов.

- `persist` key – прибирає відлік часу до видалення key.

- `setex` key sec value – створює пару key-value на заданий час.

- `rename` key newkey – перейменовує key.

Команда `flushall` видаляє всі ключі з усіх баз даних, команда `quit` перериває з’єднання із сервером.

#### Рядки

1. `set` key value – встановлює пару key-value.
2. `get` key – повертає value заданого key.
3. `mset` key1 value1 key2 value2 ... – встановлює декілька пар key-value.
4. `mget` key1 key2 ...  – повертає value1 value2 ... 
5. `append` key value – додає value до рядка key.
6. `getset` key newvalue – змінює значення key на newvalue й повертає попереднє.

Застосуємо функції, наведені вище:

```javascript
client.set("key", "value", redis.print);
client.exists("key", redis.print);
client.get("key", redis.print);

client.expire("key", 15, redis.print);
client.ttl("key", redis.print);
//client.setex("key", 15, "value");
client.persist("key", redis.print);

client.mset("key1", "val1", "key2", "val2", "key3", "val3", redis.print);
client.mget("key1", "key3", redis.print);

client.rename("key1", "key10", redis.print);

client.append("key2", "22", redis.print);
client.get("key2", redis.print);

client.getset("key3", "VAL3", redis.print);
client.del("key3", redis.print);

client.flushall( function (err, res) {
    console.log(res);
});

client.quit();
```

Ось, що повертається у відповідь:

```
Reply: OK
Reply: 1
Reply: value

Reply: 1
Reply: 15
Reply: 1

Reply: OK
Reply: val1,val3

Reply: OK

Reply: 6
Reply: val222

Reply: val3
Reply: 1

OK
```

#### Списки

1. `rpush` key elem [elem...] – додає елементи в список справа до заданого key та створює його, якщо необхідно; повертає кількість доданих елементів (також існує команда `lpush`).
2. `llen` key – повертає кількість елементів в списку за заданим key.
3. `lrange` key start stop – повертає елементи списку по зрізу за заданим key.
4. `lpop` key [count] – видаляє та повертає перший (або задану кількість) елемент(ів) списку за заданим key (також існує команда `rpop`).
5. `linsert` key BEFORE|AFTER pivot elem – вставляє елемент в список за заданим key після або перед елементом *pivot*.

```javascript
client.rpush("names", "Maria", "Jack", "Alice", "Jinny", redis.print);
client.llen("names", redis.print);
client.lrange("names", 0, -1, redis.print);
client.lrange("names", 1, 2, redis.print);
client.lpop("names", redis.print);
client.linsert("names", "before", "Jinny", "Patrick", redis.print);
client.lrange("names", 0, -1, redis.print);
```

Відповідь:
```
Reply: 4
Reply: 4
Reply: Maria,Jack,Alice,Jinny
Reply: Jack,Alice
Reply: Maria
Reply: 4
Reply: Jack,Alice,Patrick,Jinny
```

#### Множини

1. `sadd` key member [member ...] – додає елементи до множини за заданим key, повертає кількість доданих елементів.
2. `sismember`key member – перевіряє чи існує такий елемент в заданій множині.
3. `smembers` key – повертає всі елементи множини.
4. `scard` key – повертає кількість елементів множини.
5. `smove` src dest member – переміщує елемент з однієї множини в іншу.
6. `srem` key member [member ...] – видаляє задані елементи з множини, повертає кількість видалених елементів.
7. `spop` key [count] – видаляє та повертає випадковий елемент (або задану кількість елементів) з множини.
8. `sunion` key [key ...] – повертає елементи результату операції об'єднання двох множин (також існують інші команди операцій над множинами).

```javascript
client.sadd("міста", "Київ", "Мадрид", "Рим", "Лондон", "Париж", redis.print);
client.sismember("міста", "Рим", redis.print);

client.smembers("міста", redis.print);
client.scard("міста", redis.print);

client.smove("міста", "столиці", "Київ", redis.print);
client.smembers("столиці", redis.print);

client.srem("міста", "Рим", "Париж", redis.print);
client.smembers("міста", redis.print);

client.spop("міста", redis.print);

client.sadd("set1", "1", "5", "3", "8", "10", redis.print);
client.sadd("set2", "3", "12", "10", "1", "9", redis.print);
client.sunion("set1", "set2", redis.print);
client.sdiff("set1", "set2", redis.print);
```

Відповідь:
```
Reply: 5
Reply: 1

Reply: Лондон,Мадрид,Київ,Рим,Париж
Reply: 5

Reply: 1
Reply: Київ

Reply: 2
Reply: Мадрид,Лондон

Reply: Мадрид

Reply: 5
Reply: 5
Reply: 1,3,5,8,9,10,12
Reply: 5,8
```

#### Впорядковані множини

1. `zadd` key score member [score member] – додає задані елементи з певним score до множини.
2. `zcard` key – повертає кількість елементів множини.
3. `zrank` key member – повертає індекс заданого елемента (індексація з 0).
4. `zscore` key member – повертає score заданого елемента.
5. `zincrby` key inc member – збільшує score заданого елемента на задане значення.
6. `zrange` key min max – повертає елементи множини по зрізу за заданим key (зріз може проводитися за індексацією, score, алфавітним порядком).

Також підтримує різні операції над множинами.

```javascript
client.zadd("names", "23", "Emma", "14", "Nicole", "45", "Emily", "29", "Sam", "52", "James", redis.print);
client.zcard("names", redis.print);
client.zrank("names", "Nicole", redis.print);
client.zscore("names", "Nicole", redis.print);
client.zincrby("names", 10, "Emma", redis.print);
client.zrange("names", 1, 3, redis.print);
```

Відповідь:
```
Reply: 5
Reply: 5
Reply: 0
Reply: 14
Reply: 33
Reply: Sam,Emma,Emily
```

#### Хеш-таблиці

1. `hset` key field value [field value ...] – додає/оновлює пару поле-значення за заданим key (теж саме що і `hmset`).
3. `hget` key field – повертає значення поля.
4. `hmget` key field [field ...] – повертає значення полів.
5. `hgetall` key – повертає всі пари поле-значення за заданим key.
6. `hkeys` key – повертає всі поля за заданим key.
7. `hvals` key – повертає всі значення за заданим key.
8. `hincrby` key field inc – збільшує значення заданого поля за заданим key на певне значення.
9. `hdel` key field [field ...] – видаляє задані поля за заданим key, повертає їх кількість.
10. `hlen` key – повертає кількість полів за заданим key.

```javascript
client.hset("person", "name", "David", redis.print);
client.hmset("person", "surname", "Smith", "age", "29", "height", "178", redis.print);
client.hget("person", "age", redis.print);
client.hmget("person", "name", "height", redis.print);

client.hgetall('person', function(err, reply) {
  console.log(reply);
});

client.hkeys("person", redis.print);

client.hvals("person", redis.print);

client.hincrby("person", "age", 3, redis.print);
client.hdel("person", "name", "surname", redis.print);
client.hlen("person", redis.print);
```

Відповідь:
```
Reply: 1
Reply: OK
Reply: 29
Reply: David,178

{ name: 'David', surname: 'Smith', age: '29', height: '178' }

Reply: name,surname,age,height

Reply: David,Smith,29,178

Reply: 32
Reply: 2
Reply: 2
```






















