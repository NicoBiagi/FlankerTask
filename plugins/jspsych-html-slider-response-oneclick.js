/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 50,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
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
      input_type: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Input type',
        default: null,
        description: 'What type of input, slider or text.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {
    var html = '<div style="height: 682px; display: inline-block; margin: auto"><div id="jspsych-html-slider-response-wrapper" style="margin: 20px 0px 20px 0px;">';
    html += '<div id = "jspsych-html-slider-response-stimulus-background" style = "height: 500px; width: 600px; display:flex; align-items: center; justify-content: center; background-image: url('+"https://webstockreview.net/images/blackboard-clipart-chalkboard-5.jpg"+'); background-size: 100% 100%;">'
    html += '<div id = "jspsych-html-slider-response-stimulus" style = "display: inline-block; font-family: pastelRegular; color: white; font-size: 1.5em; padding-left: 40px; padding-right:40px">' + trial.stimulus + '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div id = "jspsych-html-slider-response-container" class="jspsych-html-slider-response-container" style="position:relative; width: 500px; margin: auto;">';
    if (trial.prompt !== null){
      html += trial.prompt;
    }

      if (trial.input_type == "slider"){
        html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%; height: 15px;" id="jspsych-html-slider-response-response" class = slider></input>';
        html += '<div>'
        for(var j=0; j < trial.labels.length; j++){
          var width = 100/(trial.labels.length-1);
          var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
          html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
          html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
          html += '</div>'
        }
        html += '</div>'

      }else if (trial.input_type == "text"){
        html += '<br>&#163<input type="text" value="" onkeypress="return event.charCode >= 46 && event.charCode <= 57" id="jspsych-html-slider-response-response"></input>';
      }

      if (trial.input_type!==null){
        // add submit button
        html += '<div style = "margin-top:25px;"><button id="jspsych-html-slider-response-next" class="jspsych-btn" disabled>'+trial.button_label+'</button></div>';
      }
    html += '</div></div>';


    display_element.innerHTML = html;

    var response = {
      rt: null,
      response: null
    };
console.log(trial.input_type !== null);
if (trial.input_type !== null){
  // only enable continue button after slider response
  if (trial.input_type=="slider"){
    $(':input').change(
        function(){
           $("#jspsych-html-slider-response-next").prop("disabled",false);
        }
    );
  } else if (trial.input_type=="text"){ // only enable continue button after text input
    $("#jspsych-html-slider-response-response").on("change paste keyup", function() {
       $("#jspsych-html-slider-response-next").prop("disabled",false);
    });
  }

  display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
    // measure response time
    var endTime = (new Date()).getTime();
    response.rt = endTime - startTime;
    response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
    console.log(response.response)
    if(trial.response_ends_trial){
      end_trial();
    } else {
      display_element.querySelector('#jspsych-html-slider-response-response').disabled = true;
    }

  });
}


    function end_trial(){
      console.log("end trial")
      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "response": response.response,
        "stimulus": trial.stimulus
      };
      jQuery('#jspsych-html-slider-response-container').fadeOut("normal", function(){
        display_element.innerHTML = '';

        // next trial
        jsPsych.finishTrial(trialdata);
      })

    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
