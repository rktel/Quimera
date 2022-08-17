import { Meteor } from 'meteor/meteor';
import { Responses } from "../collections/c_responses";

Meteor.methods({
    'responses.insert': async function (responsesObject) {
        const response = await Responses.insert(responsesObject);
        return !!response;
    }
})

