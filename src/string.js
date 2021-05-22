const redis = require("redis");

const client = redis.createClient();

/*port    : 6379,
host      : '120.0.0.1'*/

client.on("connect", function(){
    console.log("connected");
})

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
