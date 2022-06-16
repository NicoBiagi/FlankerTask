var synth = window.speechSynthesis;

function speak(text, enable = true, end_func = null){

    var timed_out = false;
    // function to run after the speech has finished 
    function after_speech(){
        if (enable) {
          console.log(enable);
          $(enable).css('display', "block"); // use the next argument to give the id of the next button
          $(enable).css('pointer-events', 'auto'); // use the next argument to give the id of the next button
          $(enable).prop('disabled', false); // use the next argument to give the id of the next button
        }

        if (end_func){
          end_func() // use the end_func argument to run a function on end
        }
    }
    
    // backup timeout - variable length according to length of text string
    backup_timeout = setTimeout(function(){
        timed_out = true;
        after_speech()
        error_log.push({
          message: "timeout fired during "+jsPsych.currentTrial().data.name
        });
        saveData("error_logs/" + "errors_" + id + "_" + jsPsych.startTime() + ".txt", JSON.stringify(error_log));
    }, 100*text.length);
        
        
    if (synth.speaking) {
      speechSynthesis.cancel()
        //console.error('speechSynthesis.speaking');
        //return;
    }

    var utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function(){
        // if it's not already run the function after the timeout then clear the timeout and run the function
        if(!timed_out){
            clearTimeout(backup_timeout)
            after_speech()
        }else{
          error_log.push({
            message: "onend fired too"
          });
          saveData("error_logs/" + "errors_" + id + "_" + jsPsych.startTime() + ".txt", JSON.stringify(error_log));
        }
    }

    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror '+event.error);
    }

    utterThis.voice = synth.getVoices().filter(voice => voice.name == "Google UK English Female")[0];
    utterThis.pitch = 1;
    utterThis.rate = 0.9;
    setTimeout(function(){synth.speak(utterThis)}, 100);

}
