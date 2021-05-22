const redis = require("redis");

const client = redis.createClient();

client.on("connect", function(){
    console.log("connected");
})

client.sadd("міста", "Київ", "Мадрид", "Рим", "Лондон", "Париж", redis.print);
client.sort("міста", 'limit', 1, 3, 'alpha', redis.print);
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

client.flushall( function (err, res) {
    console.log(res);
});

client.quit();
