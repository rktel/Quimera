// UDP Server
const udp = require('dgram')
const server = udp.createSocket('udp4')
const PORT = 2222
import { udpStreamer } from '../../imports/api/streamers'

server.on('error',function(error){
    console.log('Error: ' + error);
    server.close();
});

server.on('message', function(msg, info){
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
    udpStreamer.emit('galileoskyData', msg.toString('hex'))
})

server.on('listening',function(){
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port: ' + port);
    console.log('Server ip:' + ipaddr);
    console.log('Server is IP4/IP6: ' + family);
  });

  server.on('close',function(){
    console.log('Socket is closed !');
  });

  server.bind(PORT);