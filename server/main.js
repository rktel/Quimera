import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/methods/m_reports';
import '../imports/api/methods/m_sessions';
import '../imports/api/methods/m_commands';
import '../imports/api/methods/m_responses';
import '../imports/api/methods/m_users';

import './tcp_commands/galileosky';
import './tcp_commands/teltonika';
import './tcp_commands/queclink';

import '../imports/api/publications/p_commands';
import '../imports/api/publications/p_responses';
import './udp'

const SEBAS_USERNAME = "rktel";
const SEBAS_PASSWORD = "smht";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEBAS_USERNAME)) {
    Accounts.createUser({
      username: SEBAS_USERNAME,
      password: SEBAS_PASSWORD,
    });
  }
});

/*
const user = Meteor.users.findOne({username: SEBAS_USERNAME})
const _id = user._id;

Meteor.users.update(_id, {$set :{
   profile: {
    accountType: 'administrator',
    firstname: 'Ricardo',
    lastname: 'Hernández',
    fullname: 'Ricardo Hernández'
  }
 }})
 
*/