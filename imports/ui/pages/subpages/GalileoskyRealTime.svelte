<script>
    import { formatDate } from '../../../tools'
    import { udpStreamer } from '../../../api/streamers'
    let _data = []
    udpStreamer.on('galileoskyData', function(data){
        const now = formatDate( new Date() )
        data = now + '>>  ' + data
        _data.splice(0,-1,data)
        _data = _data
        console.log('Data from server UDP:', data);
    })

</script>

{#if _data.length > 0}
<div class="container">
    <div class="left">
        {#each _data as e }
        <h2 class="blue-text pb-10">
            <b>{e}</b>
        </h2>
        {/each}
    </div>
    <div class="right">
        <input type="text" placeholder="Message" class="input">
        <button class="button">Send</button>
    </div>
</div>
{/if}

<style>
    .container{
        padding: 20px;
        display: flex;

    }
    .left{
        background-color: aquamarine;
    }
    .right{
        background-color: bisque;
        display: flex;
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
        top: -1px;
    }
    .blue-text{
        color: slateblue;
    }
    .pb-10{
        padding-bottom: 10px;
    }
</style>
