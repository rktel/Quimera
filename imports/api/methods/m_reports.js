import { Meteor } from 'meteor/meteor';
import { Reports } from '../collections/c_reports';

Meteor.methods({
    'reports.query': async function () {
        const reports = await Reports.find().fetch();
        return reports;
    },
    'reports.insert': function (report_array) {
        for (const key in report_array) {
            const report = Reports.insert(report_array[key]);
        }
    },
    'reports.getTodayReport': function () {
        let startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        const reports = Reports.find({}, { dateAndTime: { $gte: startToday } }).fetch();
        return reports;
    }
})