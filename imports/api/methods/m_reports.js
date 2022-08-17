import { Meteor } from 'meteor/meteor';
import { Reports } from '../collections/c_reports';

Meteor.methods({
    'reports.insert': function (report_array) {
        let reportsKey = [];
        for (const key in report_array) {
            reportsKey.push(Reports.insert(report_array[key]));
        }
        return reportsKey;
    },
    'reports.getTodayReport': async function (imei) {
        imei = Number(imei);
        let startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        //console.log(startToday);
        const reports = await Reports.find({imei, dateAndTime: { $gte: startToday } }).fetch().reverse();
        return reports;
    },
    'reports.getYesterdayReport': async function (imei) {
        imei = Number(imei);
        let startYesterday = new Date();
        startYesterday.setDate(startYesterday.getDate() - 1);
        startYesterday.setHours(0, 0, 0, 0);
        let endYesterday = new Date();
        endYesterday.setDate(endYesterday.getDate() - 1);
        endYesterday.setHours(23, 59, 59, 999);
        //console.log(startYesterday, " & ", endYesterday);
        const reports = await Reports.find({imei, dateAndTime: { $gte: startYesterday, $lte: endYesterday } }).fetch().reverse();
        return reports;
    },
    'reports.getRangeReport': async function(imei, startDay,endDay){
        imei = Number(imei);
        startDay = new Date(startDay);
        startDay.setHours(0, 0, 0, 0);
        endDay = new Date(endDay);
        endDay.setHours(23, 59, 59, 999);
        //console.log(startDay,"&&",endDay);
        const reports = await Reports.find({imei, dateAndTime: { $gte: startDay, $lte: endDay } }).fetch().reverse();
        return reports;
    }
})

