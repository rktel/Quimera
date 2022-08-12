import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.methods({
    'commands.insert': function(imei, command){
        console.log(imei, command);
        Meteor.call('sessions.getSingle',imei, (e,r)=>{
            console.log(r);
            if(r.protocolID === 7){
                Meteor.call('galileo.command',imei, command,r._session);
            }
        });
    }
});