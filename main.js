var BLiNK = require('BLiNK'),
    mqtt = require('mqtt');

var client = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', function () {
    client.subscribe('ticker');
});

client.on('message', function (topic, message) {
    BLiNK.stringParser(message);
    console.log(message.toString());
});