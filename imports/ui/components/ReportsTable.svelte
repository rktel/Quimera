<script>
    import { s_reports } from '../../api/stores'
    let reports = [];
    s_reports.subscribe(newValue => {reports = newValue})
</script>

<div class="table-container">
    {#if reports.length > 0}
    <table class="table">
        <thead>
            <tr>
                <th>FechaHoraServer</th>
                <th>FechaHoraGPS</th>
                <th>IMEI</th>
                <th>Record</th>
                <th>Coordenadas</th>
                <th>Altitud</th>
                <th>Velocidad</th>
                <th>Rumbo</th>
                <th>Satelites</th>
                <th>FixGPS</th>
                <th>HDOP</th>
                <th>Kilometraje</th>
                <th>VoltajeInput_0</th>
                <th>Raw</th>
            </tr>
        </thead>
        <tbody>
            {#each reports as report }
            <tr>
                <td>{report.serverTimeFormat}</td>
                <td>{report.dateAndTimeFormat}</td>
                <td>{report.imei}</td>
                <td>{report.numberOfRecord}</td>
                <td>{report.latitude}, {report.longitude}</td>
                <td>{report.altitude}</td>
                <td>{report.speed}</td>
                <td>{report.direction}</td>
                <td>{report.satellites}</td>
                <td>{report.coordinatesCorrectness}</td>
                <td>{report.hdop}</td>
                <td>{report.odometer}</td>
                <td>{report.inputVoltage0}</td>
                <td>{report.raw}</td>
            </tr>
            {/each}
        </tbody>
    </table>
    {/if}
</div>