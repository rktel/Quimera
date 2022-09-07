import { Meteor } from 'meteor/meteor';
import { Commands } from '../collections/c_commands';

Meteor.publish('commands', function() {
    return Commands.find({});
});
