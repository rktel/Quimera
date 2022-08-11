import { Meteor } from 'meteor/meteor';
import { Views } from '../imports/api/collections/c_views';
import '../imports/api/methods/m_views';

Meteor.startup(() => {
  // code to run on server at startup
  
  const views = Views.find({}).fetch();
  if (views.length > 1){
    console.log(' Views Collection');
    for (let index = 10000; index < 100000 ; index++) {
      Views.insert({view: index});     
    }
  }
});
