const redis = require("redis");

const client = redis.createClient();

client.on("connect", function(){
    console.log("connected");
})

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

client.flushall( function (err, res) {
    console.log(res);
});

client.quit();
