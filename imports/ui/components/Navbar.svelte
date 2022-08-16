<script>
    import { Meteor } from "meteor/meteor";
    import { fly } from "svelte/transition";
    import { s_reports } from "../../api/stores";
    import { s_openDrawer } from "../../api/stores";

    import DatabaseEye from "../components/icons/DatabaseEye.svelte";
    import TimerSandEmpty from "../components/icons/TimerSandEmpty.svelte";
    import TimerSandFull from "../components/icons/TimerSandFull.svelte";
    import VisualStudioCode from "../components/icons/VisualStudioCode.svelte";
    let dateReportSelected = 0;
    let startDay, endDay;
    let imei, command;
    let reports = [];

    s_reports.subscribe(newValue => {reports = newValue})
    const jsendCommand = (_) => {
        Meteor.call("commands.origin", imei, command);
    };
    const jgetReports = (_) => {
        s_openDrawer.update(oldValue => !oldValue);
        switch (dateReportSelected) {
            case 0:
                Meteor.call("reports.getTodayReport", imei, (e, r) => {
                    s_reports.update((_) => r);
                    //console.log(r);
                });
                break;
            case 1:
                Meteor.call("reports.getYesterdayReport", imei, (e, r) => {
                    s_reports.update((_) => r);
                    //console.log(r);
                });
                break;
            case 2:
                Meteor.call(
                    "reports.getRangeReport",
                    imei,
                    startDay,
                    endDay,
                    (e, r) => {
                        s_reports.update((_) => r);
                        //console.log(r);
                    }
                );
                break;
            default:
                break;
        }
    };

</script>

<div class="navbar">
    <div name="left" class="item-container">
        <select name="dateView" id="dateView" bind:value={dateReportSelected}>
            <option value={0}>HOY</option>
            <option value={1}>AYER</option>
            <option value={2}>FECHA</option>
        </select>
        {#if dateReportSelected === 2}
            <div
                class="item-container"
                transition:fly={{ x: -200, duration: 500 }}
            >
                <span class="span">
                    <TimerSandEmpty size="1.4em" />
                </span>
                <input
                    type="date"
                    name="date-start"
                    id="date-start"
                    bind:value={startDay}
                />
                <span class="span">
                    <TimerSandFull size="1.4em" />
                </span>
                <input
                    type="date"
                    name="date-end"
                    id="date-end"
                    bind:value={endDay}
                />
            </div>
        {/if}
        <div class="item-container">
            <input
                type="text"
                name="imei"
                id="imei"
                placeholder="IMEI"
                bind:value={imei}
            />
            <button class="btn primary" disabled={!imei} on:click={jgetReports}>
                <DatabaseEye size="1.4em" />
            </button>
        </div>
        {#if reports.length > 0}
            <div
                class="item-container"
                transition:fly={{ x: 0, duration: 300 }}
            >
                <input
                    type="text"
                    name="command"
                    id="command"
                    placeholder="Comando"
                    bind:value={command}
                />
                <button
                    class="btn secondary"
                    disabled={!command}
                    on:click={jsendCommand}
                >
                    <VisualStudioCode size="1.4em" />
                </button>
            </div>
        {/if}
    </div>
    <!-- <div name="center" class="item-container">George</div>-->
    <div name="right" class="item-container" />
</div>
