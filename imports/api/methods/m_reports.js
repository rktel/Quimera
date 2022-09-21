import { Meteor } from 'meteor/meteor';
import { Reports } from '../collections/c_reports';

const fetch = require('node-fetch');

Meteor.methods({
    async getReport(query_=0,imei_, startDay_, endDay_){
        imei_ = Number(imei_);

        switch (query_) {
            case 0: // today
                startDay_.setHours(startDay_.getHours() - 5)
                startDay_.setHours(0, 0, 0, 0);
                startDay_.setHours(startDay_.getHours() + 5)

                endDay_.setHours(endDay_.getHours() - 5)
                endDay_.setHours(23, 59, 59, 999);
                endDay_.setHours(endDay_.getHours() + 5)

                break;
            case 1: // yesterday
                startDay_.setHours(startDay_.getHours() - 29)
                startDay_.setHours(0, 0, 0, 0);
                startDay_.setHours(startDay_.getHours() + 5)

                endDay_.setHours(endDay_.getHours() - 29)
                endDay_.setHours(23, 59, 59, 999);
                endDay_.setHours(endDay_.getHours() + 5)

                break;
            case 2: // range

                startDay_.setHours(startDay_.getHours() + 5)


                endDay_.setHours(23, 59, 59, 999);
                endDay_.setHours(endDay_.getHours() + 5)
                break;
            default:
                break;
        }
        // console.log(startDay_, endDay_);

        // const { protocolID } = Meteor.call('sessions.getSingle',imei_);

        const reports = await Reports.rawCollection().
            aggregate([
                { 
                    $match: { imei: imei_, serverTime: { $gte: startDay_, $lte: endDay_ } } 
                },
                {
                    $sort: { serverTime : -1 }
                },
                {
                    $project: {_id: 0, ack: 0, serverTime: 0, timestamp: 0}
                },

            ]).toArray();

        if(!reports[0]){
            return false;
        }else{
            return {
                headers : headersRefactor(Object.keys(reports[0])),
                reports
            }
            
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

function headersRefactor(_headers) {
    let headers = [];

    for(index in _headers){
      let type = 1;
      if(_headers[index] === 'latitude' ||
        _headers[index] === 'longitude' ||
         _headers[index] === 'altitude' ||
         _headers[index] === 'satellites' ||
         _headers[index] === 'speed' ||
         _headers[index] === 'angle' ||
         _headers[index] === 'odometer' 
        ){
        type = 0;
      }
      let header = {
        label: _headers[index],
        state: true,
        type,
      }
      headers.push(header)
    }
    return headers
}

/*
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
*/

/*
const teltonikaProject = {
    _id:0,
    "Fecha Servidor": "$serverTimeFormat",
    "Fecha AVL": "$timestamp",
    "IMEI": "$imei",
    "Mensaje Tipo":"$msgType",

    "Latitud":"$latitude",
    "Longitud":"$longitude",
    "Altitud":"$altitude",
    "Satelites":"$satellites",
    "Velocidad":"$speed",
    "Rumbo":"$angle",

    "Raw data": "$raw" 
}

const teltonikaHeaders = [
    { label:"Fecha Servidor", state: true, type:1},
    { label:"Fecha AVL", state: true, type:1},
    { label:"IMEI", state: true, type:0},
    { label:"Mensaje Tipo", state: true, type:1},

    { label:"Latitud", state: true,type:0},
    { label:"Longitud", state: true,type:0},
    { label:"Altitud", state: true,type:0},
    { label:"Satelites", state: true,type:0},
    { label:"Velocidad", state: true,type:0},
    { label:"Rumbo", state: true,type:0},

    { label:"Raw data",state: true,type:1},
]


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
    { label:"Fecha Servidor", state: true, type:1},
    { label:"Fecha AVL", state: true, type:1},
    { label:"IMEI", state: true, type:0},
    { label:"Mensaje Tipo", state: true, type:1},
    { label:"Record", state: true, type:0},
    { label:"Latitud", state: true,type:0},
    { label:"Longitud", state: true,type:0},
    { label:"Altitud", state: true,type:0},
    { label:"Satelites", state: true,type:0},
    { label:"Velocidad", state: true,type:0},
    { label:"Rumbo", state: true,type:0},
    { label:"HDOP", state: true,type:0},
    { label:"Fix GNSS", state: true,type:0},
    { label:"Voltaje Entrada 0", state: true,type:0},
    { label:"Kilometraje", state: true,type:0},
    { label:"Raw data",state: true,type:1},
]
*/

