import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.methods({
    'commands.insert': function(imei, command){
        Meteor.call('sessions.getSingle',imei, (e,r)=>{
            console.log(r);
        });
    }
});