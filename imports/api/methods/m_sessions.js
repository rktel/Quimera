import { Meteor } from 'meteor/meteor';
import { Sessions } from '../collections/c_sessions';

Meteor.methods({
    'sessions.upsert': function(dataObject){
        const {imei, _session, serverTime, serverTimeFormat, protocolID} = dataObject;
        Sessions.upsert({imei}, {
            $set:{
                _session, serverTime, serverTimeFormat, protocolID
            }
        })
    },
    'sessions.getSingle': async function(imei){
        imei = Number(imei);
        const session = await Sessions.findOne({imei});
        return session;
    }
});