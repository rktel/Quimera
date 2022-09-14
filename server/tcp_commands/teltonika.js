import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

const url = 'http://96.126.127.74:1880/teltonika';

Meteor.methods({
    'teltonika.send': async function (_commandArray, _session) {
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
    'teltonika.build.command': function(_imei, _command){
        const now = Date.now().toString().slice(6, 10);

        const preamble = [0x00,0x00,0x00,0x00];
        const dataSize = Buffer.allocUnsafe(4);
        const codecID = [0x0C];
        const commandQuantity1 = [0x01];
        const type = [0x05];
        const commandSize = Buffer.allocUnsafe(4);
        const commandBuffer = Buffer.from(_command,'ascii');
        commandSize.writeUInt32BE(commandBuffer.length);
        dataSize.writeUInt32BE(commandBuffer.length + 8)
        const commandQuantity2 = [0x01];
        const CRC_16 = Buffer.allocUnsafe(4);
        const aux = CRC(Buffer.from([...codecID, ...commandQuantity1, ...type, ...commandSize, ...commandBuffer, ...commandQuantity2]));
        CRC_16[2] = aux[0];
        CRC_16[3] = aux[1];
        const command = [...preamble, ...dataSize, ...codecID, ...commandQuantity1, ...type, ...commandSize, ...commandBuffer, ...commandQuantity2, ...CRC_16];

        return {
            _command: command,
            _randomNumber: Number(now)
        };
    }
});

function CRC(buff) {
    let init = 0x0000;
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
    return Buffer.from([xor >>> 8,xor & 0xff]);
}
