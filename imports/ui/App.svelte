<script>
  import { Meteor } from "meteor/meteor";
  import { fly } from "svelte/transition";
  import DatabaseEye from "svelte-material-icons/DatabaseEye.svelte";
  import TimerSandEmpty from "svelte-material-icons/TimerSandEmpty.svelte";
  import TimerSandFull from "./components/icons/TimerSandFull.svelte";
  import Navbar from "./components/Navbar.svelte";

  let dateReportSelected = 0;
  let startDay,endDay;
  let imei;
  let reports = [];
  const jgetReports = (_) => {

     switch (dateReportSelected) {
       case 0:
         Meteor.call('reports.getTodayReport', (e,r)=> console.log(r));
         break;
       case 1:
         Meteor.call('reports.getYesterdayReport', (e,r)=> console.log(r));
         break;
       case 2:
         Meteor.call('reports.getRangeReport',(startDay, endDay) ,(e,r)=> console.log(r));
         break;
       default:
         break;
     }
  };
  $: {
    console.log(dateReportSelected);
  }
</script>

<Navbar>
  <div slot="left" class="item-container">
    <select name="dateView" id="dateView" bind:value={dateReportSelected}>
      <option value={0}>HOY</option>
      <option value={1}>AYER</option>
      <option value={2}>FECHA</option>
    </select>
    {#if dateReportSelected === 2}
      <div class="item-container" transition:fly={{ x: -200, duration: 500 }}>
        <span class="span">
          <TimerSandEmpty size="1.4em" />
        </span>
        <input type="date" name="date-start" id="date-start" bind:value={startDay}/>
        <span class="span">
          <TimerSandFull size="1.4em" />
        </span>
        <input type="date" name="date-end" id="date-end" bind:value={endDay}/>
      </div>
    {/if}
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
  <!-- <div slot="center" class="item-container">George</div>-->
  <div slot="right" class="item-container" />
</Navbar>
