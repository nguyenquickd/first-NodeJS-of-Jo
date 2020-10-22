var mqtt = require('mqtt');
var settings = {
    mqttServerUrl : "localhost", 
    // host : '192.168.56.1',
    port : 18833,
    topic : "myTopic"
    }
var client  = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);
client.on('connect', function () {
setInterval(function() {
var message = "Hello mqtt" + new Date().getTime();
client.publish(settings.topic, message);
console.log('Sent ' + message + " to " + settings.topic);
}, 2000);
});