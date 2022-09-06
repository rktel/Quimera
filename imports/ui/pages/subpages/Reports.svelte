<script>
    import { Meteor } from "meteor/meteor";
    const XLSX = require("xlsx");
    import {s_user} from '../../../api/stores';

    let user = undefined;
    s_user.subscribe(newValue => user = newValue);
    let bLeftPanel = true;
    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];
    let headers = [];

    const fToggleLeft = () => bLeftPanel = !bLeftPanel;
    const fCreateExcel = (_) => {
        const data = document.querySelector("#report-table");

        var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

        XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' });

        XLSX.writeFile(file, imei + '.xlsx');
    }
    const jGetReport = () => {
        if(Number(imei)){
            Meteor.call('users.reports.set.imei',imei);
            Meteor.call('getReport',dateReportSelected, imei,startDay,endDay, (error, result)=>{
                if(!error){
                    headers = result.headers;
                    reports = result.reports;
                }
            })
        }
    }
    const jgetReports = (_) => {
        if(Number(imei)){
            
            Meteor.call('users.reports.set.imei', imei);
        switch (dateReportSelected) {
            case 0:
                Meteor.call("reports.getTodayReport", imei, (e, r) => {
                    reports = r;
                    tableHeaders = Object.keys(r[0]);
                    for (const key in tableHeaders) {
                            headersToSee.push({
                                label: tableHeaders[key],
                                state: true
                            })
                    }
                    console.log(headersToSee);
                    console.log(reports);
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
<!-- CONTAINER -->
<div class="dark:bg-dark-700 bg-dark-50 h-[calc(100%_-_40px)] flex">
    <!-- LEFT -->   
    {#if bLeftPanel}
        <div class="grid grid-rows-[50px,1fr] shadow-lg basis-[300px]">

            <!-- BAR -->
            <div class="flex justify-end px-4 items-center"> 

            </div>
            <!-- BAR_END -->
            <!-- OPTIONS -->
            <div class="flex flex-col p-10 gap-6">
                <div>
                    <h1 class="text-dark-700 dark:text-dark-100 font-bold text-sm">SELECCIONE OPCIONES</h1>
                </div>
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="dateReportSelect" class="text-dark-700 dark:text-dark-300 text-xs">Fecha:</label>
                    <select name="dateReportSelect" id="dateReportSelect" bind:value={dateReportSelected} class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500 bg-white">
                        <option value={0}>Hoy</option>
                        <option value={1}>Ayer</option>
                        <option value={2}>Intervalo</option>
                    </select> 
                </div>
                {#if dateReportSelected === 2}
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="date-start" class="text-dark-700 dark:text-dark-300 text-xs"
                        >Inicio:</label>

                        <input
                        class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500"
                        type="date"
                        name="date-start"
                        id="date-start"
                        bind:value={startDay}
                    />
                </div>    
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="date-end" class="text-dark-700 dark:text-dark-300 text-xs"
                        >Fin:</label>

                        <input
                        class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500"
                        type="date"
                        name="date-end"
                        id="date-end"
                        bind:value={endDay}
                    />
                </div>               
                {/if}
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="imei" class="text-dark-700 dark:text-dark-300 text-xs"
                        >IMEI:</label>
                        <input
                        class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500"
                        type="text"
                        name="imei"
                        id="imei"
                        bind:value={imei}
                    />
                </div>
                <div>
                    <button disabled={!imei} on:click={jGetReport} class="bg-alfa-600 shadow uppercase font-bold  text-white text-xs rounded w-full h-9" > consultar</button>
                </div>
                {#if reports[0]}
                <div class="flex">
                    <button class="bg-beta-600 shadow uppercase font-bold  text-white text-xs rounded w-full h-9" on:click={fCreateExcel}>
                        descargar
                    </button>
                    <!-- <p class="text-gray-600 text-xs text-center mt-1">Se incluiran todos los campos {brawData?"+ raw data":""}</p> -->
                </div>
                {/if}
            </div>
            <!-- OPTIONS_END -->

        </div>
    {/if}
    <!-- LEFT_END -->

    <!-- RIGHT -->
    <div class="overflow-hidden flex-1 p-5 h-full">
        {#if headers[0]}
            <!-- BAR ACTION -->
            <div class="h-[30px] flex bg-dark-300 dark:bg-black dark:border-dark-800  border-dark-50 border-b">
                <!-- toggle all left panels -->
                <button class="h-[30px] px-2" on:click={fToggleLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-dark-500 dark:fill-dark-200" viewBox="0 0 512 512"><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                </button>
              <!-- toggle all left panels_end -->

                <!-- select columns -->
                <!-- select columns_end -->

                <!-- pagination -->
                <!-- pagination_end -->
            </div>
            <!-- BAR ACTION_END -->

            <!-- TABLE CONTAINER -->
            <div class="overflow-auto h-[calc(100%_-_30px)]">
                <table class="text-xs">
                    <thead class="bg-dark-200 dark:bg-dark-900 text-left sticky top-0">
                        <tr class="font-medium text-dark-700 dark:text-white h-10">
                            {#each headers as header}
                                <th class="pl-5 whitespace-nowrap">{header.label}</th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each reports as report,i}
                        <tr class="text-dark-600 dark:text-dark-200 dark:bg-dark-800 h-9 border-b border-dark-200 dark:border-dark-600 {i%2?'bg-dark-100 dark:bg-dark-900':''}">
                            {#each headers as header }
                                <td class="pl-5 whitespace-nowrap {header.label ==='Raw data'? 'pr-5':''}">{report[header.label] === undefined ? "": report[header.label] }</td>
                            {/each}
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <!-- TABLE CONTAINER_END -->
        {/if}
    </div>
    <!-- RIGHT_END -->
</div>
<!-- CONTAINER_END -->