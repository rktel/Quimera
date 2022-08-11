import { Meteor } from 'meteor/meteor';
import { Views } from '../collections/c_views';

Meteor.methods({
    'views.query': async function(){
        const views = await Views.find({}).fetch();
        return views;
    }
})