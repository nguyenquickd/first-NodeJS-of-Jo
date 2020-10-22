var mosca = require('mosca');
var settings = {
  'port': 1880,
  // host: "127.0.0.1",
};

console.log("Done setting")

var server = new mosca.Server(settings);

var authenticate = function(client, username, password, callback) {
  var authorized = (username === 'qui' && password.toString() === 'deptrai');
  if (authorized) client.user = username;
  callback(null, authorized);
}

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function(client, topic, payload, callback) {
  callback(null, client.user == topic.split('/')[1]);
}

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function(client, topic, callback) {
  callback(null, client.user == topic.split('/')[1]);
}


// fired client is connected
server.on('clientConnected', function (client) {
  console.log('Client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Message Received ', packet.payload.toString('utf-8'));
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
  console.log('Mosca MQTT server is up and running at ' + settings.port);
}