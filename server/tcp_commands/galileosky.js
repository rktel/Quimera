import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

//commandFormat(imei,command,JSON.stringify(_session))
const url = 'http://96.126.127.74:1880/galileosky';

Meteor.methods({
    'galileo.command': async function (_imei, _command, _session) {
        const now = new Date();
        const { command, randomNumber } = commandFormat(_imei, _command);
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                command: command,
                _session: _session,
                createdTime: now,
                createdTimeFormat: formatDate(now),
                imei: Number(_imei),
                commandText: _command,
                randomNumber: randomNumber
            })
        });
        const data = await response.json();
        console.log('data:', data);
    },
});
function formatDate(date) {
    if (date) {
        return (
            [
                pad2(date.getDate()),
                pad2(date.getMonth() + 1),
                date.getFullYear()
            ].join("/") + " " +
            [
                pad2(date.getHours()),
                pad2(date.getMinutes()),
                pad2(date.getSeconds())
            ].join(":")
        )
    } else {
        return undefined
    }
}
function pad2(num) {
    return num.toString().padStart(2, "0");
}
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
function commandFormat(_imei, _command) {
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
    const total = [...subTotalBuffer, ...CS];
    const command = Buffer.from(total);
    return {
        command,
        randomNumber: Number(now)
    };
}