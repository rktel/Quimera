<script>
    import { udpStreamer } from '../../../api/streamers'
    udpStreamer.on('data', function(data){
        console.log('Data from server UDP:', data);
    })
</script>
<h1>Real Time</h1>