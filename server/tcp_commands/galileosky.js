import { Meteor } from 'meteor/meteor';

const net = require('net');
const ipServer = '96.126.127.74';
const portServer = 2017;

const client = new net.Socket();

Meteor.methods({
    'galileo.command': function (imei, command, _session) {
        client.connect(portServer, ipServer, function() {
            console.log('Connected');
            client.write(imei+','+command+','+JSON.stringify(_session));
            client.destroy();
        });
        client.on('close', function() {
            console.log('Connection closed');
        });
    }
});
