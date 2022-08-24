import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/methods/m_reports';
import '../imports/api/methods/m_sessions';
import '../imports/api/methods/m_commands';
import '../imports/api/methods/m_responses';

import './tcp_commands/galileosky';

const SEED_USERNAME = 'rktel';
const SEED_PASSWORD = 'mazziel';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

const user = Meteor.user
console.log(user);