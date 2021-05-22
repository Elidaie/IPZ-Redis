const redis = require("redis");

const client = redis.createClient();

client.on("connect", function(){
    console.log("connected");
})

client.zadd("names", "23", "Emma", "14", "Nicole", "45", "Emily", "29", "Sam", "52", "James", redis.print);

client.zcard("names", redis.print);

client.zrank("names", "Nicole", redis.print);
client.zscore("names", "Nicole", redis.print);

client.zincrby("names", 10, "Emma", redis.print);

client.zrange("names", 1, 3, redis.print);

client.flushall( function (err, res) {
    console.log(res);
});

client.quit();
