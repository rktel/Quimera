import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.methods({
    'commands.origin': function(imei, command){
        //console.log(imei, command);
        Meteor.call('sessions.getSingle',imei, (e,r)=>{
            console.log('r:',r);
            if(Date.now() - r.createdTime.getTime() > 330 * 1000){
                console.log("No se envia comando")
            }else {
                if(r.protocolID === 7){
                    Meteor.call('galileo.command',imei, command,r._session);
                 }
            }

        });
    },
    'commands.insert': async function (cmdObject) {
        const command = await Commands.insert(cmdObject);
        return !!command;
    }
});