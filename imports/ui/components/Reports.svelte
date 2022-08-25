<style>
    .label {
            display: flex;

            /* Rounded border */
            border-radius: 9999px;

            /* Size */
            height: 22px;
            width: 54px;

            /* OFF status */
            background-color: rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.3);

            /* ON status */
            background-color: #357edd;
            border: 1px solid #357edd;
            /* Push the circle to the right */
            justify-content: flex-end;
        }

        .label__input {
            /* Hide the input */
            display: none;
        }

        .label__circle {
            /* Rounded border */
            border-radius: 9999px;

            /* Size */
            width: 32px;

            background-color: #fff;

            /* OFF status */
            border: 1px solid rgba(0, 0, 0, 0.3);
    }
</style>
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
            <div class="flex flex-col">
                {rawData}
                <label class="checkboxLabel" class:checkboxOn={rawData}>
                    <input  class="checkboxInput"
                    name="raw-data"
                    id="raw-data"
                    type=checkbox bind:checked={rawData}
                    />
                
                    <!-- Circle -->
                    <div class="checkboxCircle" class:checkboxCircleOff={!rawData}></div>
                </label>

            </div>


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

    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];
    let rawData = false;
    const jgetReports = (_) => {
        console.log("accion de consulta");
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

