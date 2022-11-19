<script>
    import { udpStreamer } from '../../../api/streamers'
    let _data = []
    udpStreamer.on('data', function(data){
        _data.splice(0,-1,data)
        _data = _data
        console.log('Data from server UDP:', data);
    })

</script>

{#if _data.length > 0}
<div class="container">
    {#each _data as e }
    <h2 class="blue-text pb-10">{e}</h2>
    {/each}
</div>
{/if}

<style>
    .container{
        padding: 20px;
    }
    .blue-text{
        color: slateblue;
    }
    .pb-10{
        padding-bottom: 10px;
    }
</style>
