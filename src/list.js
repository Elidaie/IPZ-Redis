const redis = require("redis");

const client = redis.createClient();

client.on("connect", function(){
    console.log("connected");
})

client.rpush("names", "Maria", "Jack", "Alice", "Jinny", redis.print);
client.llen("names", redis.print);
client.lrange("names", 0, -1, redis.print);
client.lrange("names", 1, 2, redis.print);
client.lpop("names", redis.print);
client.linsert("names", "before", "Jinny", "Patrick", redis.print);
client.lrange("names", 0, -1, redis.print);

client.flushall( function (err, res) {
    console.log(res);
});

client.quit();
