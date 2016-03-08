var redis = require("redis"); // 1
var client = redis.createClient(6379, '127.0.0.1', {no_ready_check: true}); // 2
//var client = redis.createClient(6379, '127.0.0.1'); // 2
client.get(11111, redis.print); // 3
client.quit(); // 4
