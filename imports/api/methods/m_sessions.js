import { Meteor } from 'meteor/meteor';
import { Sessions } from '../collections/c_sessions';

Meteor.methods({
    'sessions.upsert': function(dataObject){
        const {imei, _session, serverTime, serverTimeFormat} = dataObject;
        Sessions.upsert({imei}, {
            $set:{
                _session, serverTime, serverTimeFormat
            }
        })
    }
});