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
        console.log(startToday);
        const reports = Reports.find({}, { dateAndTime: { $gte: startToday }, sort:{serverTime: -1} }).fetch();
        return reports;
    },
    'reports.getYesterdayReport': function () {
        let startYesterday = new Date();
        startYesterday.setDate(startYesterday.getDate()-1);
        startYesterday.setHours(0,0,0,0);
        let endYesterday = new Date();
        endYesterday.setDate(endYesterday.getDate()-1);
        endYesterday.setHours(23,59,59,999);
        console.log(startYesterday," & " ,endYesterday);
        //const reports = Reports.find({}, { dateAndTime: { $gte: startToday }, sort:{serverTime: -1} }).fetch();
        //return reports;
    }
})