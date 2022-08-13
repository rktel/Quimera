import { Meteor } from 'meteor/meteor';

const net = require('net');
const ipServer = '96.126.127.74';
const portServer = 2017;

const client = new net.Socket();

Meteor.methods({
    'galileo.command': function (imei, command, _session) {
        client.connect(portServer, ipServer, function() {
            console.log('Connected');
            client.write(commandFormat(imei,command,JSON.stringify(_session)));
            client.destroy();
        });
        client.on('close', function() {
            console.log('Connection closed');
        });
    }
});

function commandFormat(imei, command, _session){
    const head = 0x23
    const tagLengthImei = imei.length
    const tagLengthCommand = command.length
    const tagLengthSession = _session.length
    const total = [
        head, 
        tagLengthImei, ...Buffer.from(imei),
        tagLengthCommand, ...Buffer.from(command),
        tagLengthSession, ...Buffer.from(_session)
    ]
    return Buffer.from(total)
}