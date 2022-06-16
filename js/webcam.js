function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        //alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback(name) {
    // video.src = video.srcObject = null;
    // video.muted = false;
    // video.volume = 1;
    // video.src = URL.createObjectURL(recorder.getBlob());

    var audioVideoBlob = recorder.blob;
    //uploadBlob(audioVideoBlob);
    videoStorage.push({file: audioVideoBlob, name: name})

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;

    return audioVideoBlob
}


// this function is used to generate random file name
function getFileName(fileExtension, fileID) {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var date = d.getUTCDate();
    return fileID + "_" + year + month + date + '.' + fileExtension;
}

function getRandomString() {
    if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
        var a = window.crypto.getRandomValues(new Uint32Array(3)),
            token = '';
        for (var i = 0, l = a.length; i < l; i++) {
            token += a[i].toString(36);
        }
        return token;
    } else {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
}

function uploadBlob(blob, fileID) {
    var formData = new FormData();
    formData.append('file', blob);
    console.log(blob)

    // generating a random file name
    var fileName = getFileName('webm', fileID);

    // we need to upload "File" --- not "Blob"
    var fileObject = new File([blob], fileName, {
        type: 'video/webm'
    });

    var formData = new FormData();

    // recorded data
    formData.append('video-blob', fileObject);

    // file name
    formData.append('video-filename', fileObject.name);
    //var upload_url = '/uploads';
    var upload_url = 'save.php';

    var upload_directory = upload_url;
    var upload_directory = '../../uploads/';

    // upload using jQuery
    $.ajax({
        url: upload_url, // replace with your own server URL
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function() {
                console.log("success");
        },
        error: function() {
          alert("There was a problem uploading the videos. Please contact the researcher.")
        }
    });
}

var recorder; // globally accessible

start_recording = function() {
    //this.disabled = true;
    captureCamera(function(camera) {
        // video.muted = true;
        // video.volume = 0;
        // video.srcObject = camera;

        recorder = RecordRTC(camera, {
            type: 'video'
        });

        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;

        //document.getElementById('btn-stop-recording').disabled = false;
    });
};

stop_recording = function(videoStorage, name="default") {
    //this.disabled = true;
    recorder.stopRecording(function(){stopRecordingCallback(name)});
};
