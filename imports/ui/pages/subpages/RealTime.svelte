<script>
    import { udpStreamer } from '../../../api/streamers'
    let _data = ''
    udpStreamer.on('data', function(data){
        _data = data
        console.log('Data from server UDP:', data);
    })
</script>
<h1>Real Time</h1>
<h2>{_data}</h2>