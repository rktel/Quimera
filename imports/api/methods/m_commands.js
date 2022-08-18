import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.methods({
    'commands.origin': function ($imei, $command) {
        //console.log(imei, command);

        Meteor.call('sessions.getSingle', $imei, (error, result) => {

            console.log('result:', result);

            if (Date.now() - result.createdTime.getTime() > 330 * 1000) {
                console.log("No se envia comando");

            } else {

                if (result.protocolID === 7) {
                    const now = new Date();
                    const {_command,_randomNumber} = galileoskyCommandFormat($imei, $command);
                    const _cmdObject = {
                        command: _command,
                        _session: result._session,
                        createdTime: now,
                        createdTimeFormat: formatDate(now),
                        imei: Number($imei),
                        commandText: $command,
                        randomNumber: _randomNumber
                    };

                    Meteor.call('commands.insert', _cmdObject, (e, r) => {
                        if (r) {
                            Meteor.call('galileo.command',_command, result._session);
                        }
                    });
                }

            }

        });
    },
    'commands.insert': async function (cmdObject) {
        const command = await Commands.insert(cmdObject);
        return !!command;
    }
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
function galileoskyCommandFormat(_imei, _command) {
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
        command,
        randomNumber: Number(now)
    };
}