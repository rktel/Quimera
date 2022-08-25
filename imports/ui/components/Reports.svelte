<div class="tabPanelContainer">
    <div class="tabPanelSideLeft">

        <div class="p-3 flex flex-col gap-3">

            <div class="flex flex-col">
                <label for="dateReportSelect" class="inline-block mb-2 text-gray-700"
                    >Intervalo</label>

                    <select name="dateReportSelect" id="dateReportSelect" bind:value={dateReportSelected} class="form-select">
                        <option value={0}>Hoy</option>
                        <option value={1}>Ayer</option>
                        <option value={2}>Fecha</option>
                    </select>
            </div>
            {#if dateReportSelected === 2}
                <div class="flex flex-col">
                    <label for="date-start" class="inline-block mb-2 text-gray-700"
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
                    <label for="date-end" class="inline-block mb-2 text-gray-700"
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
                <label for="imei" class="inline-block mb-2 text-gray-700"
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
                <label class="inline-block mb-2 text-gray-700" for="brawData"> 
                    Visualizar raw data
                </label>
                <div class="flex justify-center">
                    <Checkbox bind:value={brawData}></Checkbox>
                </div>
            </div>
            <div class="flex flex-col pt-2">
                <button class="btn btn-light">
                    DESCARGAR
                </button>
                <p class="text-gray-600 text-xs text-center mt-1">Se incluiran todos los campos + raw data</p>
            </div>
            {/if}
        </div>

    </div>
    <div class="tabPanelSideRight">
        <div class="p-3 flex flex-col gap-3">
            {#if reports[0]}
            <div class="flex flex-col">

                    <table class="min-w-full text-center">
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
<script>
    import { Meteor } from "meteor/meteor";
    import Checkbox from "../elements/Checkbox.svelte";

    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];
    let brawData;

    const jgetReports = (_) => {

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
    };
</script>

