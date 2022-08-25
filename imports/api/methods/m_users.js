import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.users.deny({ update: () => true });

Meteor.methods({
    'users.create': function (userObj) {
        const { username, password } = userObj;
        if (!Accounts.findUserByUsername(username)) {
            const _id = Accounts.createUser({
                username: username,
                password: password,
            });
            Meteor.users.update(_id, {
                $set: {
                    profile: {
                        accountType: 'super'
                    }
                }
            })
        }
    },
    'users.remove':function(_id){
        Meteor.users.remove(_id);
    },
    'users.getAll': function () {
        return Meteor.users.find({'profile.accountType': 'super'}).fetch();
    },
    'users.reports.set.imei': function ( imei) {
        console.log("this.userId:",this.userId);
        // imei = Number(imei);
        // Meteor.users.update(_id,{
        //     $set:{
        //         reports:{
        //             imei: imei
        //         }
        //     }
        // })
    },
   
})