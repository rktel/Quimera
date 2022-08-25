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
                    >Imei a consultar</label>
                    <input
                    class="form-input"
                    type="text"
                    name="imei"
                    id="imei"
                    bind:value={imei}
                />
            </div>
            <div class="flex flex-col">
                <button class="btn btn-light" disabled={!imei} on:click={jgetReports}>
                    CONSULTAR
                </button>
            </div>

        </div>

    </div>
    <div class="tabPanelSideRight">

        {#if reports[0]}
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                    <table class="min-w-full text-center">
                        <thead class="border-b bg-white">
                        <tr>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                            #
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                            Record
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                            ServerTime
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                            GPSTime
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                            Coordenadas
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                            Satelites
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                FixGPS
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                HDOP
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                Velocidad
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                Kilometraje     
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2">
                                VoltajeIn_0 
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {#each reports as report, i }
                            <tr class="bg-white border-b">
                                <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {report.numberOfRecord}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.serverTimeFormat}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.dateAndTimeFormat}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.latitude}, {report.longitude}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.satellites}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.coordinatesCorrectness}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.hdop}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.speed}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.odometer}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {report.inputVoltage0}
                                </td>
                            </tr>                                
                            {/each}
                       </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
        {/if}

    </div>
</div>
<script>
    import { Meteor } from "meteor/meteor";

    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];

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

