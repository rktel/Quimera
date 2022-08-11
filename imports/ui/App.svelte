<script>
  import { Meteor } from "meteor/meteor";
  import { fly } from "svelte/transition";
  import DatabaseEye from "svelte-material-icons/DatabaseEye.svelte";
  import TimerSandEmpty from "svelte-material-icons/TimerSandEmpty.svelte";
  import TimerSandFull from "./components/icons/TimerSandFull.svelte";
  import Navbar from "./components/Navbar.svelte";

  let dateReportSelected = 0;
  let imei;
  let reports = [];
  const jgetReports = (_) => {
    Meteor.call('reports.getTodayReport', (error,result)=> {
      console.log(result);
    })
    // switch (dateViewSelected) {
    //   case 0:
    //     Meteor.call("views.today");
    //     break;
    //   case 1:
    //     Meteor.call("views.yesterday");
    //     break;
    //   case 2:
    //     Meteor.call("views.dates");
    //     break;
    //   default:
    //     break;
    // }
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
        <input type="date" name="date-start" id="date-start" />
        <span class="span">
          <TimerSandFull size="1.4em" />
        </span>
        <input type="date" name="date-end" id="date-end" />
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
