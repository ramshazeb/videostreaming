var getuser = require('getusermedia') // audio/video
var peer = require('simple-peer') // uses webrtc api
getuser({
    audio: true,
    video: true
}, function (error, stream) {
    if (error) return console.error(error)
    
    var peers = new peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    })
    peers.on('signal', function (data) {
        document.getElementById('uid').value = JSON.stringify(data)
    })
    document.getElementById('conn').addEventListener('click', function () {
        var oid = JSON.parse(document.getElementById('oid').value)
        peers.signal(oid)
    })
    document.getElementById('send').addEventListener('click', function () {
        var urmsg = document.getElementById('urmsg').value
        peers.send(urmsg)
        document.getElementById('urmsg').value = ''
    })
    peers.on('data', function (data) {
        document.getElementById('msgs').textContent += data + '\n'
    })
    peers.on('stream', function(stream){
        var video = document.createElement('video')
        document.body.appendChild(video)
        video.src = window.URL.createObjectURL(stream)
        video.play()
    })
})

































