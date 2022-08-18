import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.methods({
    'commands.origin': function ($imei, $command) {

        Meteor.call('sessions.getSingle', $imei, (error1, sessionResult) => {

            if (Date.now() - sessionResult.createdTime.getTime() > 330 * 1000) {
                console.log("No se envia comando");

            } else {

                if (sessionResult.protocolID === 7) {
                   
                    Meteor.call('galileosky.build.command', $imei, $command, (error2, buildedCommand) => {
                        const now = new Date();
                        const { _command, _randomNumber } = buildedCommand;
                        const _cmdObject = {
                            createdTime: now,
                            createdTimeFormat: formatDate(now),
                            imei: Number($imei),
                            commandText: $command,
                            randomNumber: _randomNumber
                        };
                        Meteor.call('commands.insert', _cmdObject, (e, r) => {
                            if (r) {
                                // comando guardado
                                Meteor.call('galileosky.send', _command, sessionResult._session);
                            }
                        });
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
    function pad2(num) {
        return num.toString().padStart(2, "0");
    }

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
