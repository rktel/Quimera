import { Meteor } from 'meteor/meteor';
import {fetch, Headers} from 'meteor/fetch';

//commandFormat(imei,command,JSON.stringify(_session))
const url = 'http://96.126.127.74:1880/galileosky';

Meteor.methods({
    'galileo.command': async function (imei, command, _session) {
        const response = await fetch(url,{
            method:'POST',
            headers: new Headers({
                'Content-Type':'application/json'
            }),
            body: JSON.stringify({
                buffer: Buffer.from([0x01,0x02,0x03]),
                name: 'Galileosky'
            })
        });
        const data = await response.json();
        console.log('data:',data);
    },

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