<script>
    var XLSX = require("xlsx");
    import { Meteor } from "meteor/meteor";
    import Checkbox from "../elements/Checkbox.svelte";
    
    import {  s_user } from '../../api/stores';
    let user = undefined;
    s_user.subscribe(newValue => user = newValue);

    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];
    let brawData;
    
   
    const jcreateExcel = (_) => {
        const data = document.querySelector("#table");

        var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

        XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' });

        XLSX.writeFile(file, imei + '.xlsx');
    }
    const jgetReports = (_) => {
        if(Number(imei)){
            Meteor.call('users.reports.set.imei', imei);
        switch (dateReportSelected) {
            case 0:
                Meteor.call("reports.getTodayReport", imei, (e, r) => {
                    reports = r;
                });
                break;
            case 1:
                Meteor.call("reports.getYesterdayReport", imei, (e, r) => {
                    reports = r;
                });
                break;
            case 2:
                Meteor.call(
                    "reports.getRangeReport",
                    imei,
                    startDay,
                    endDay,
                    (e, r) => {
                        reports = r;
                    }
                );
                break;
            default:
                break;
        }
        }
    };
    
    if(user && user.profile && user.profile.reports){
        imei = user.profile.reports.imei
    }


    
</script>

<div class="tabPanelContainer">
    <div class="tabPanelSideLeft">

        <div class="p-3 flex flex-col gap-3">
            <div class="absolute bottom-4 left-4">
                <button class="rounded-full btn-light"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="text-white w-8 h-8">
                        <path d="M503.1 273.6l-112 104c-6.984 6.484-17.17 8.219-25.92 4.406s-14.41-12.45-14.41-22v-56l-192 .001V360c0 9.547-5.656 18.19-14.41 22c-8.75 3.812-18.94 2.078-25.92-4.406l-112-104c-9.781-9.094-9.781-26.09 0-35.19l112-104c6.984-6.484 17.17-8.219 25.92-4.406C154 133.8 159.7 142.5 159.7 152v55.1l192-.001v-56c0-9.547 5.656-18.19 14.41-22s18.94-2.078 25.92 4.406l112 104C513.8 247.5 513.8 264.5 503.1 273.6z"/>
                    </svg>
                </button>
            </div>
            <div class="flex flex-col">
                <label for="dateReportSelect" class="inputLabel"
                    >Intervalo</label>

                    <select name="dateReportSelect" id="dateReportSelect" bind:value={dateReportSelected} class="form-select">
                        <option value={0}>Hoy</option>
                        <option value={1}>Ayer</option>
                        <option value={2}>Fecha</option>
                    </select>
            </div>
            {#if dateReportSelected === 2}
                <div class="flex flex-col">
                    <label for="date-start" class="inputLabel"
                        >Fecha inicio</label>

                        <input
                        class="form-input"
                        type="date"
                        name="date-start"
                        id="date-start"
                        bind:value={startDay}
                    />
                </div>    
                <div class="flex flex-col">
                    <label for="date-end" class="inputLabel"
                        >Fecha fin</label>

                        <input
                        class="form-input"
                        type="date"
                        name="date-end"
                        id="date-end"
                        bind:value={endDay}
                    />
                </div>               
            {/if}
            <div class="flex flex-col">
                <label for="imei" class="inputLabel"
                    >IMEI</label>
                    <input
                    class="form-input"
                    type="text"
                    name="imei"
                    id="imei"
                    bind:value={imei}
                />
            </div>
            <div class="flex flex-col pt-2">
                <button class="btn btn-light" disabled={!imei} on:click={jgetReports}>
                    CONSULTAR
                </button>
            </div>
            {#if reports[0]}
            <div class="flex flex-col">
                <label class="inputLabel" for="brawData"> 
                    Visualizar raw data
                </label>
                <div class="flex justify-center">
                    <Checkbox bind:value={brawData}></Checkbox>
                </div>
            </div>
            <div class="flex flex-col pt-2">
                <button class="btn btn-light" on:click={jcreateExcel}>
                    DESCARGAR
                </button>
                <p class="text-gray-600 text-xs text-center mt-1">Se incluiran todos los campos {brawData?"+ raw data":""}</p>
            </div>
            {/if}
        </div>

    </div>
    <div class="tabPanelSideRight">

        <div class="p-3 flex flex-col gap-3">
            {#if reports[0]}
            <div class="flex flex-col">

                    <table class="min-w-full text-center" id="table">
                        <thead>
                        <tr>
                            <th class="tableHeadItem">
                            #
                            </th>
                            <th class="tableHeadItem">
                            Record
                            </th>
                            <th class="tableHeadItem">
                            ServerTime
                            </th>
                            <th class="tableHeadItem">
                            GPSTime
                            </th>
                            <th class="tableHeadItem">
                            Coordenadas
                            </th>
                            <th class="tableHeadItem">
                            Satelites
                            </th>
                            <th class="tableHeadItem">
                                FixGPS
                            </th>
                            <th class="tableHeadItem">
                                HDOP
                            </th>
                            <th class="tableHeadItem">
                                Velocidad
                            </th>
                            <th class="tableHeadItem">
                                Kilometraje     
                            </th>
                            <th class="tableHeadItem">
                                VoltajeIn_0 
                            </th>
                            {#if brawData}
                            <th class="tableHeadItem text-left">
                                Raw data 
                            </th>
                            {/if}
                        </tr>
                        </thead>
                        <tbody>
                            {#each reports as report, i }
                            <tr class="bg-white border-b">
                                <td class="tableBodyItem">
                                    {i+1}
                                </td>
                                <td class="tableBodyItem">
                                {report.numberOfRecord}
                                </td>
                                <td class="tableBodyItem">
                                    {report.serverTimeFormat}
                                </td>
                                <td class="tableBodyItem">
                                    {report.dateAndTimeFormat}
                                </td>
                                <td class="tableBodyItem">
                                    {report.latitude}, {report.longitude}
                                </td>
                                <td class="tableBodyItem">
                                    {report.satellites}
                                </td>
                                <td class="tableBodyItem">
                                    {report.coordinatesCorrectness}
                                </td>
                                <td class="tableBodyItem">
                                    {report.hdop}
                                </td>
                                <td class="tableBodyItem">
                                    {report.speed}
                                </td>
                                <td class="tableBodyItem">
                                    {report.odometer}
                                </td>
                                <td class="tableBodyItem">
                                    {report.inputVoltage0}
                                </td>
                                {#if brawData}
                                <th class="tableBodyItem text-left">
                                    {report.raw}
                                </th>
                                {/if}
                            </tr>                                
                            {/each}
                       </tbody>
                    </table>
            </div>
        {/if}
        </div>
    </div>
</div>


