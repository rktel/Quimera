import { Meteor } from 'meteor/meteor';
import { fetch, Headers } from 'meteor/fetch';

//commandFormat(imei,command,JSON.stringify(_session))
const url = 'http://96.126.127.74:1880/galileosky';

Meteor.methods({
    'galileo.command': async function (_commandArray, _session) {

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
        console.log('data:', data);
    },
});