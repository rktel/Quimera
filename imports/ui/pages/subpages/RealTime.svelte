<script>
    import {onMount} from 'svelte'
    import { udpStreamer } from '../../../api/streamers'
    let _data = []
    onMount(function(){
        udpStreamer.on('data', function(data){
        _data.push(data)
        _data = _data
        console.log('Data from server UDP:', data);
        })
    })


</script>
<h1>Real Time</h1>
{#if _data.length > 0}
    {#each _data as e }
    <h2>{e}</h2>
    {/each}
{/if}
