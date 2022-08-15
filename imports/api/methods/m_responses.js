import {Meteor} from 'meteor/meteor';
import { Responses } from "../collections/c_responses";

Meteor.methods({
    'responses.insert': function(responsesObject){
        Responses.insert(responsesObject)
    }
})

