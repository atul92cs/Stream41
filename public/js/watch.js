

let peerConnection;
socket.on('offer',(id,description)=>{
 peerConnection=new RTCPeerConnection(config);
 peerConnection.setRemoteDescription(description)
 .then(()=>{peerConnection.createAnswer()})
 .then(sdp=>{peerConnection.setLocalDescription(sdp)})
 .then(()=>{
     socket.emit('answer',id,peerConnection.localDescription);
 });
});
socket.on('candidate',(id,candidate)=>{
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});
socket.on('connect',()=>{
    socket.emit('watcher');
});
socket.on('broadcaster',()=>{
    socket.emit('watcher');
});
socket.on('bye',()=>{
    peerConnection.close();
});