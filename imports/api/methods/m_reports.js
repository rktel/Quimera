import { Meteor } from 'meteor/meteor';
import { Reports } from '../collections/c_reports';

const fetch = require('node-fetch');

Meteor.methods({
    async getReport(query_=0,imei_, startDay_= 0, endDay_=0){
        imei_ = Number(imei_);
        console.log(query_)
        switch (query_) {
            case 0: // today
                startDay_ = new Date();
                endDay_ = new Date();

                startDay_.setHours(0, 0, 0, 0);
                startDay_.setHours(startDay_.getHours() + 5);

                endDay_.setHours(23, 59, 59, 999);
               // endDay_.setHours(endDay_.getHours() - 5);
                break;
            case 1: // yesterday
                startDay_ = new Date();
                startDay_.setDate(startDay_.getDate() - 1);

                endDay_ = new Date();
                endDay_.setDate(endDay_.getDate() - 1);

                startDay_.setHours(0, 0, 0, 0);
                startDay_.setHours(startDay_.getHours() + 5);

                endDay_.setHours(23, 59, 59, 999);
                endDay_.setHours(endDay_.getHours() + 5);
                break;
            case 2: // range
                startDay_ = new Date(startDay_);
                endDay_ = new Date(endDay_);
                
                startDay_.setHours(0, 0, 0, 0);
                startDay_.setHours(startDay_.getHours() + 5);

                endDay_.setHours(23, 59, 59, 999);
                endDay_.setHours(endDay_.getHours() + 5);
                break;
            default:
                break;
        }
        // console.log(startDay_, endDay_);

        const {protocolID} = Meteor.call('sessions.getSingle',imei_);
        let headers, project;

        if(protocolID === 7){
            headers = galileoskyHeaders;
            project = galileoskyProject;
        }

        const reports = await Reports.rawCollection().
            aggregate([
                { 
                    $match: { imei: imei_, dateAndTime: { $gte: startDay_, $lte: endDay_ } } 
                },
                {
                    $project: project
                },
                {
                    $sort: { dateAndTime : -1 }
                }
            ]).toArray();

        if(!reports[0]){
            return false;
        }
        return {
            headers,
            reports
        }
    },
    'reports.insert': function (report_array) {
        let reportFlag = null;
        for (const key in report_array) {
            const id = Reports.insert(report_array[key]);
            const element = report_array[key];
            const lat = element.latitude;
            const lon = element.longitude;
            if(lat && lon){
                //getAddress(id,lat,lon);
            }
            reportFlag = !!id
        }
        return reportFlag;
    },
    'reports.setAddress':function(_id, address){
        Reports.update(_id,{$set: {address: address}});
    },
    'reports.getTodayReport': async function (imei) {
        imei = Number(imei);
        let startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        //console.log(startToday);
        const reports = await Reports.find({imei, dateAndTime: { $gte: startToday } },reportFields).fetch().reverse();
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
        const reports = await Reports.find({imei, dateAndTime: { $gte: startYesterday, $lte: endYesterday } },reportFields).fetch().reverse();
        return reports;
    },
    'reports.getRangeReport': async function(imei, startDay,endDay){
        imei = Number(imei);
        startDay = new Date(startDay);
        startDay.setHours(0, 0, 0, 0);
        endDay = new Date(endDay);
        endDay.setHours(23, 59, 59, 999);
        //console.log(startDay,"&&",endDay);
        const reports = await Reports.find({imei, dateAndTime: { $gte: startDay, $lte: endDay } },reportFields).fetch().reverse();
        return reports;
    }
})

function getAddress(id,lat,lon){
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    fetch(url)
        .then(resp => resp.json())
        .then(function(data){
            Meteor.call('reports.setAddress',id, data.display_name);
        })
        .catch(function(e){
            console.log('Error en getAddress:', e);
        })
}

const galileoskyProject = {
    _id:0,
    "Fecha Servidor": "$serverTimeFormat",
    "Fecha AVL": "$dateAndTimeFormat",
    "IMEI": "$imei",
    "Mensaje Tipo":"$msgType",
    "Record":"$numberOfRecord",
    "Latitud":"$latitude",
    "Longitud":"$longitude",
    "Altitud":"$altitude",
    "Satelites":"$satellites",
    "Velocidad":"$speed",
    "Rumbo":"$direction",
    "HDOP":"$hdop",
    "Fix GNSS":"$coordinatesCorrectness",
    "Voltaje Entrada 0": "$inputVoltage0",
    "Kilometraje": "$odometer",
    "Raw data": "$raw" 
}

const galileoskyHeaders = [
    { label:"Fecha Servidor", state: true},
    { label:"Fecha AVL", state: true},
    { label:"IMEI", state: true},
    { label:"Mensaje Tipo", state: true},
    { label:"Record", state: true},
    { label:"Latitud", state: true},
    { label:"Longitud", state: true},
    { label:"Altitud", state: true},
    { label:"Satelites", state: true},
    { label:"Velocidad", state: true},
    { label:"Rumbo", state: true},
    { label:"HDOP", state: true},
    { label:"Fix GNSS", state: true},
    { label:"Voltaje Entrada 0", state: true},
    { label:"Kilometraje", state: true},
    { label:"Raw data",state: true},
]