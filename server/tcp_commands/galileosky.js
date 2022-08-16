import { Meteor } from 'meteor/meteor';

const net = require('net');
const ipServer = '96.126.127.74';
const portServer = 2017;



Meteor.methods({
    'galileo.command': function (imei, command, _session) {
        const client = new net.Socket();
        client.connect(portServer, ipServer, function() {
            client.write(commandFormat(imei,command,JSON.stringify(_session)));
            client.destroy();
        });

    },
    'Galileosky': function(){
       // console.log('Galileosky method called')
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