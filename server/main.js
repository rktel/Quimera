import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/methods/m_reports';
import '../imports/api/methods/m_sessions';
import '../imports/api/methods/m_commands';
import '../imports/api/methods/m_responses';
import '../imports/api/methods/m_users';

import './tcp_commands/galileosky';


const SEBAS_USERNAME = "mazda";
const SEBAS_PASSWORD = "mazda";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEBAS_USERNAME)) {
    Accounts.createUser({
      username: SEBAS_USERNAME,
      password: SEBAS_PASSWORD,
    });
  }
});


