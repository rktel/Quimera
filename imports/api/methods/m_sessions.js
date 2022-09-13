import { Meteor } from 'meteor/meteor';
import { Sessions } from '../collections/c_sessions';

Meteor.methods({
    'sessions.upsert': function (dataObject) {
        const { imei, _session, createdTime, createdTimeFormat, protocolID } = dataObject;
        Sessions.upsert({ imei }, {
            $set: {
                _session, createdTime, createdTimeFormat, protocolID
            }
        })
    },
    'sessions.getSingle': async function (imei) {
        imei = Number(imei);
        const session = await Sessions.findOne({ imei });
        return session;
    }
    ,
    'sessions.getBySessionID': async function (id) {
        const session = await Sessions.findOne({ '_session.id': id });
        return session;
    }
});