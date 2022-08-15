import { Meteor } from 'meteor/meteor';
import '../imports/api/methods/m_reports';
import '../imports/api/methods/m_sessions';
import '../imports/api/methods/m_commands';
import '../imports/api/methods/m_responses';

import './tcp_commands/galileosky';

Meteor.startup(() => {
  // code to run on server at startup
});
