console.log("heello");

const mqtt = require('mqtt');
const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost:1883';


const client = mqtt.connect(MQTT_URL);

client.on('connect', function () {
    client.subscribe('presence')
    client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})


client.on('error', err => {
   console.log(err.message);
});