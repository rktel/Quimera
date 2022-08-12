import { Meteor } from 'meteor/meteor';
import { Sessions } from '../collections/c_sessions';

Meteor.methods({
    'sessions.upsert': function(dataObject){
        const {imei,_session,serverTime} = dataObject;
        Sessions.upsert(imei, {
            $set:{
                _session,serverTime
            }
        })
    }
});