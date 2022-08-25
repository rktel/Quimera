<div class="tabPanelContainer">
    <div class="tabPanelSideLeft">

        <div class="p-3 flex flex-col gap-3">
            <select name="dateReportSelect" id="dateView" bind:value={dateReportSelected} class="form-select">
                <option value={0}>Hoy</option>
                <option value={1}>Ayer</option>
                <option value={2}>Fecha</option>
            </select>
        </div>

    </div>
    <div class="tabPanelSideRight">2</div>
</div>
<script>
      let dateReportSelected = 0;
</script>

