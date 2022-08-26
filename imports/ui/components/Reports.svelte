<script>
    import {onMount} from 'svelte';
    import {DataTable} from "simple-datatables";

    var XLSX = require("xlsx");
    import { Meteor } from "meteor/meteor";
    import { fly } from 'svelte/transition';
    import Checkbox from "../elements/Checkbox.svelte";
    
    import {  s_user } from '../../api/stores';
    let user = undefined;
    s_user.subscribe(newValue => user = newValue);

    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];
    let brawData;
    
    const jtogglePanelLeft = (_)=>{
        const panelLeft = document.querySelector("#panelLeftReports");
        panelLeft.classList.toggle("basis-0");
    }
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
    $:{
        if(reports[0]){
            setTimeout(()=>{
                const table =document.querySelector("#table");
            const dataTable = new DataTable(table,{
                searchable: false
            });
            },1000)
        }
    }
    onMount((_)=>{
        // const dataTable = new DataTable("#table");
    })
    
</script>

<div class="tabPanelContainer">
    <div class="tabPanelSideLeft transition-[flex-basis] duration-300" id="panelLeftReports">

        <div class="p-3 flex flex-col gap-3">

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
                                <button class="btn btn-icon btn-light" on:click={jtogglePanelLeft}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="text-gray-700 h-4 w-5">
                                        <path 
                                        fill="currentColor"
                                        d="M32 64C49.67 64 64 78.33 64 96V416C64 433.7 49.67 448 32 448C14.33 448 0 433.7 0 416V96C0 78.33 14.33 64 32 64zM246.6 137.4C259.1 149.9 259.1 170.1 246.6 182.6L205.3 224H434.7L393.4 182.6C380.9 170.1 380.9 149.9 393.4 137.4C405.9 124.9 426.1 124.9 438.6 137.4L534.6 233.4C547.1 245.9 547.1 266.1 534.6 278.6L438.6 374.6C426.1 387.1 405.9 387.1 393.4 374.6C380.9 362.1 380.9 341.9 393.4 329.4L434.7 288H205.3L246.6 329.4C259.1 341.9 259.1 362.1 246.6 374.6C234.1 387.1 213.9 387.1 201.4 374.6L105.4 278.6C92.88 266.1 92.88 245.9 105.4 233.4L201.4 137.4C213.9 124.9 234.1 124.9 246.6 137.4V137.4zM640 416C640 433.7 625.7 448 608 448C590.3 448 576 433.7 576 416V96C576 78.33 590.3 64 608 64C625.7 64 640 78.33 640 96V416z"/>
                                    </svg>
                                </button>
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


