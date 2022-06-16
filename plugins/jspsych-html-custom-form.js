/**
 * jspsych-html-button-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["html-custom-form"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-custom-form',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      margin_vertical: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Margin vertical',
        default: '0px',
        description: 'The vertical margin of the button.'
      },
      margin_horizontal: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Margin horizontal',
        default: '8px',
        description: 'The horizontal margin of the button.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, then trial will end when user responds.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {
    var responses={};
    // display stimulus
    var html = '<div id="jspsych-html-button-response-stimulus"><form id="form" autocomplete="off" action="?" method="POST">'+trial.stimulus+'<div>'+
                  '<input type="submit" name="g" value="Submit" id="g">'+
                  '</div>'+'</form>'+
                  '<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"'+
                  'async defer></script></div>';

    // function to check for empty responses
    function checkArray(responses){
      // for(var i=0;i<responses.length;i++){
      //   console.log(responses[i])
      //      // if(responses[i].value === "" & responses[i].dataset.required === true)
      //      //    return false;
      //      }
      return true;
    }

    display_element.innerHTML = html;
      $( "form" ).submit(function( event ) {
          console.log( $( this ).serializeArray() );
          responses = $( this ).serializeArray()
          event.preventDefault();

          if(checkArray(responses)){
            end_trial();
          }else{
               alert("Please check that you have answered all the questions!")
          }

      });


    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data to store for the trial
      var trial_data = {
        "responses": JSON.stringify(responses),
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // hide image if timing is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-button-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
