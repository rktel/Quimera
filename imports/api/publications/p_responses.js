import { Meteor } from 'meteor/meteor';
import { Responses } from '../collections/c_responses';

Meteor.publish('responses', function() {
    return Responses.find({});
});