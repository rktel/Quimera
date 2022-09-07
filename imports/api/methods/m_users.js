import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { formatDate } from '../../tools';

Meteor.users.deny({ update: () => true });

Meteor.methods({
    'users.create': function (userObj) {
        const { username, password, firstname, lastname } = userObj;
        const now = new Date();
        if (!Accounts.findUserByUsername(username)) {
            const _id = Accounts.createUser({
                username: username,
                password: password,
            });
            Meteor.users.update(_id, {
                $set: {
                    profile: {
                        accountType: 'supervisor',
                        firstname: capitalize(firstname),
                        lastname: capitalize(lastname),
                        fullname: capitalize(firstname) + " " + capitalize(lastname),
                        createdAt: now,
                        createdAtFormat: formatDate(now)
                    }
                }
            })
        }
    },
    'users.remove':function(_id){
        Meteor.users.remove(_id);
    },
    'users.getAll': function () {
        return Meteor.users.find({'profile.accountType': 'supervisor'}).fetch();
    },
    'users.reports.set.imei': function (imei) {
        if(this.userId){
            imei = Number(imei);
            Meteor.users.update({_id: this.userId},{
                $set:{
                    "profile.reports.imei": imei
                }
            })
        }
    },
    'users.messages.set.imei': function (imei) {
        if(this.userId){
            imei = Number(imei);
            Meteor.users.update({_id: this.userId},{
                $set:{
                    "profile.messages.imei": imei
                }
            })
        }
    },
   
})

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
