import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/methods/m_reports';
import '../imports/api/methods/m_sessions';
import '../imports/api/methods/m_commands';
import '../imports/api/methods/m_responses';

import './tcp_commands/galileosky';

const SEED_USERNAME = 'rktel';
const SEED_PASSWORD = 'mazziel';

const SEBAS_USERNAME = "sebas";
const SEBAS_PASSWORD = "gomez";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (!Accounts.findUserByUsername(SEBAS_USERNAME)) {
    Accounts.createUser({
      username: SEBAS_USERNAME,
      password: SEBAS_PASSWORD,
    });
  }
});

const user = Meteor.users.findOne({username: SEBAS_USERNAME})
const _id = user._id;

Meteor.users.update(_id, {$set :{
  profile: {
    accountType: 'super'
  }
}})