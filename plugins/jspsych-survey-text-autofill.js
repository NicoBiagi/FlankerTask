/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['survey-text-autofill'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-text-autofill',
    description: '',
    parameters: {
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        default: undefined,
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'Prompts for the subject to response'
          },
          value: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Value',
            array: true,
            default: null,
            description: 'The strings will be used to populate the response fields with editable answers.'
          },
          rows: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Rows',
            array: true,
            default: 1,
            description: 'The number of rows for the response text box.'
          },
          columns: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Columns',
            array: true,
            default: 40,
            description: 'The number of columns for the response text box.'
          }
        }
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'HTML formatted string to display at the top of the page above all the questions.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
      fill_array: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Value',
        array: true,
        default: null,
        description: 'The array of strings available for autocompletion.'
      },
      ppt_id: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Value',
        array: true,
        default: null,
        description: 'The array of ids to go with autocomplete strings.'
      }
    }
  }


  plugin.trial = function(display_element, trial) {

    if (typeof trial.questions[0].rows == 'undefined') {
      trial.questions[0].rows = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.questions[i].rows.push(1);
      }
    }
    if (typeof trial.questions[0].columns == 'undefined') {
      trial.questions[0].columns = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.questions[i].columns.push(40);
      }
    }
    if (typeof trial.questions[0].value == 'undefined') {
      trial.questions[0].value = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.questions[i].value.push("");
      }
    }

    var html = '';
    // show preamble text
    if(trial.preamble !== null){
      html += '<div id="jspsych-survey-text-preamble" class="jspsych-survey-text-preamble">'+trial.preamble+'</div>';
    }

    // create a holder for valid responses
    var valid_responses = []


    // add questions
    for (var i = 0; i < trial.questions.length; i++) {


      html += '<div id="jspsych-survey-text-"'+i+'" class="jspsych-survey-text-question ui-widget" style="margin: 2em 0em;">';
      html += '<p class="jspsych-survey-text">' + trial.questions[i].prompt + '</p>';
      if(trial.questions[i].rows == 1){
        html += '<input type="text" name="#jspsych-survey-text-response-fill-' + i + '" id = "autocomplete-1'+i+'" class="ui-autocomplete-input" size="'+trial.questions[i].columns+'" value="'+trial.questions[i].value+'"></input>';
      } else {
        html += '<textarea name="#jspsych-survey-text-response-fill-' + i + '" cols="' + trial.questions[i].columns + '" rows="' + trial.questions[i].rows + '">'+trial.questions[i].value+'</textarea>';
      }
      html += '</div>';

      valid_responses[i]=true

    }


    // add submit button
    html += '<button id="jspsych-survey-text-next" class="jspsych-btn jspsych-survey-text">'+trial.button_label+'</button>';

    display_element.innerHTML = html;
    for (var i = 0; i < trial.questions.length; i++) {
        $( function() {
          var options = trial.fill_array
          $("#autocomplete-1"+i).autocomplete({
            source: function( request, response ) {
          var matcher = new RegExp( "\\b" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( options, function( item ){
              return matcher.test( item );

          }) );
      },
            minLength: 1,
            select: function (event, ui) {
                if(!ui.item){
                    //http://api.jqueryui.com/autocomplete/#event-change -
                    // The item selected from the menu, if any. Otherwise the property is null
                    //so clear the item for force selection
                    ui.item.value = "";
                }else{
                  ui.item.value = trial.ppt_id[trial.fill_array.indexOf(ui.item.value)]
                }
            },
            focus: function (event, ui) {
                return false;
            }
          });
        } );
    }


    display_element.querySelector('#jspsych-survey-text-next').addEventListener('click', function() {

      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      var matches = display_element.querySelectorAll('div.jspsych-survey-text-question');
      for(var index=0; index<matches.length; index++){
        var id = "Q" + index;
        var val = matches[index].querySelector('textarea, input').value;
        var resp_id = val;
        if(val!="" && trial.ppt_id.indexOf(val)==-1){
          console.log("error, not in list")
          valid_responses[index]=false
        }else{
          valid_responses[index]=true
        }
        console.log(resp_id);
        var obje = {};
        obje[id] = resp_id;
        Object.assign(question_data, obje);
      }

if(valid_responses.includes(false)){
  var errors = []
  var idx = valid_responses.indexOf(false);
  while (idx != -1) {
    errors.push(idx);
    idx = valid_responses.indexOf(false, idx + 1);
  }
  console.log(errors)
  alert("Oops! Please check the red responses.");
  for(var i=0;i<errors.length;i++){
    document.getElementById("autocomplete-1"+errors[i]).style.color = "red";
  }

}else{
  // save data
  var trialdata = {
    "rt": response_time,
    "responses": JSON.stringify(question_data)
  };

  display_element.innerHTML = '';

  // next trial
  jsPsych.finishTrial(trialdata);
}

    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
