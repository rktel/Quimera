import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.methods({
    'commands.origin': function(imei, command){
        Meteor.call('galileo.command',imei, command,'PeppaPig');
        //console.log(imei, command);
        Meteor.call('sessions.getSingle',imei, (e,r)=>{
            console.log(r);
            if(Date.now() - r.serverTime.getTime() > 300 * 1000){
                console.log("No se envia comando")
            }else {
                if(r.protocolID === 7){
                    Meteor.call('galileo.command',imei, command,r._session);
                 }
            }

        });
    },
    'commands.insert': function (cmdObject) {
        // const user
        Commands.insert(cmdObject);
    }
});