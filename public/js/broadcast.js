

let peerConnections={};
const Constrainsts={
    audio:true,
    video:true
};
navigator.mediaDevices.getUserMedia(Constrainsts).then((stream)=>{
    video.srcObject=stream;
    socket.emit('broadcaster');
}).catch(err=>{
   console.error(err);
});

socket.on('answer',(id,description)=>{
    peerConnections[id].setRemoteDescriptions(description);
});
socket.on('watcher',(id)=>{
    const peerConnection=new RTCPeerConnection(config);
    peerConnections[id]=peerConnection;
    let stream=video.srcObject;
    stream.getTracks().forEach(track=>{peerConnection.addTrack(track,stream)});
    peerConnection.createOffer()
    .then((sdp)=>{peerConnection.setLocalDescription(sdp)})
    .then(()=>{
        socket.emit('offer',id,peerConnection.localDescription);
    });
    peerConnection.onicecandidate=(event)=>{
      if(event.candidate)
      {
          socket.emit('candidate',id,event.candidate);
      }
    };
});
socket.on('candidate',(id,candidate)=>{
    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});
socket.on('bye',(id)=>{
    peerConnections[id] && peerConnections[id].close();
    delete peerConnections[id];
});