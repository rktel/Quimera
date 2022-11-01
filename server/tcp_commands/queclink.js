import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

const url = 'http://172.105.149.34:20000/queclink';

Meteor.methods({
    'queclink.send': async function (_commandArray, _session) {
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
    'queclink.build.command': function(_imei, _command){
        const now = Date.now().toString().slice(6, 10);

        const command = [_command];

        return {
            _command: command,
            _randomNumber: Number(now)
        };
    }
});
