var BLiNK = require('BLiNK'),
    mqtt = require('mqtt');

var client = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', function () {
    client.subscribe('ticker');
    client.publish('ticker', '@0#0!@1#1!@2#2!@3#3!@4#4!@5#5!@6#6!@7#7!');
});

client.on('message', function (topic, message) {
    BLiNK.stringParser(message);
});