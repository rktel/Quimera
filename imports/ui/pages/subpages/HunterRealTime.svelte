<script>
    import { formatDate } from '../../../tools'
    import { udpStreamerHunter } from '../../../api/streamers'
    let _data = []
    let message = '';
    udpStreamerHunter.on('HunterData', function(data){
        const now = formatDate( new Date() )
        data = now + '>>  ' + data
        _data.splice(0,-1,data)
        _data = _data
        console.log('Data from server UDP:', data);
    })
    function sendMessage(){
        if(message.length > 0){
            console.log('rxUDPHunter:', message);
            udpStreamerHunter.emit('rxUDPHunter', message)
        }
    }
</script>

{#if _data.length > 0}
<div class="full">
    <div class="left">
        {#each _data as e }
        <h2 class="blue-text pb-10">
            <b>{e}</b>
        </h2>
        {/each}
    </div>
    <div class="right">
        <input type="text" placeholder="Message" class="input" bind:value={message}>
        <button class="button" on:click={sendMessage}>Send</button>
    </div>
</div>
{/if}

<style>
    .full{
        padding: 20px;
        width: 100%;
        height: calc(100vh - 60px);
        display: flex;
        justify-content: space-between;
    }
    .left{
        background-color: aquamarine;
        padding: 10px;
    }
    .right{
        background-color: bisque;
        padding: 10px;
        display: grid;
        width: 400px;
        grid-template-columns: 300px 80px;
        grid-template-rows: 50px;

    }
    .input{
        border: 1px solid red;
        padding: 10px;
    }
    .button{
        background-color: silver;
        color: white;
        padding: 10px;
    }
    .button:active{
        position: relative;
        top: 1px;
    }
    .blue-text{
        color: slateblue;
    }
    .pb-10{
        padding-bottom: 10px;
    }
</style>

