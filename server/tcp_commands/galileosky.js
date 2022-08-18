import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

const url = 'http://96.126.127.74:1880/galileosky';

Meteor.methods({
    'galileosky.send': async function (_commandArray, _session) {
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                _commandArray: _commandArray,
                _session: _session,
            })
        });
        const data = await response.json();
        // console.log('data:', data); Comando enviado
    },
    'galileosky.build.command': function(_imei, _command){
        const now = Date.now().toString().slice(6, 10);
        const head = 0x01;
        const tagImei = 0x03;
        const imei = Buffer.from(_imei.toString());
        const tagDeviceNumber = 0x04;
        const deviceNumber = [0x00, 0x00];
        const tagE0 = 0xE0;
        const E0 = Buffer.allocUnsafe(4);
        E0.writeUInt32LE(now, 0);
        const tagE1 = 0xE1;
        const textLengthE1 = _command.length;
        const textE1 = Buffer.from(_command);
        const payloadLength = [
            tagImei, ...imei, tagDeviceNumber, ...deviceNumber, tagE0, ...E0, tagE1, textLengthE1, ...textE1
        ].length;
        const packetLength = Buffer.allocUnsafe(2);
        packetLength.writeUInt16LE(payloadLength, 0);
        const subTotal = [
            head, ...packetLength, tagImei, ...imei, tagDeviceNumber, ...deviceNumber, tagE0, ...E0, tagE1, textLengthE1, ...textE1
        ]
        const subTotalBuffer = Buffer.from(subTotal);
        const CS = CRC(subTotalBuffer);
        const command = [...subTotalBuffer, ...CS];
        return {
            _command: command,
            _randomNumber: Number(now)
        };
    }
});

function CRC(buff) {
    let init = 0xffff;
    const pol = 0xA001;
    let xor;
    for (i = 0; i < buff.length; i++) {
        let counter = 0;
        xor = init ^ buff[i];
        while (counter <= 7) {
            let auxor = xor;
            xor = xor >>> 1;
            if (auxor & 0b1) {
                xor = xor ^ pol;
            }
            counter++;
        }
        init = xor;
    }
    return Buffer.from([xor & 0xff, xor >>> 8]);
}
