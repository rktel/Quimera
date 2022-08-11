import { Meteor } from 'meteor/meteor';
import { Reports } from '../collections/c_reports';

Meteor.methods({
    'reports.query': async function(){
        const reports = await Reports.find().fetch();
        return reports;
    },
    'reports.insert': function(report_array){
        for(const key in report_array){
            const report = Reports.insert(report_array[key]);
        }
    },
    'reports.getTodayReport': function(deviceIMEI){

    }
})