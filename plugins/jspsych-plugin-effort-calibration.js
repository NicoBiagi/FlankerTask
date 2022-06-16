/*
 * Calibrate effort
 */

jsPsych.plugins["effort-calibration"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    // set default values for parameters

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	pressed = 0;
	    // set the HTML of the display target to replaced_text.
    
		timer = true;
		setTimeout(function(){
			console.log('timeout')
			jsPsych.pluginAPI.cancelAllKeyboardResponses(keyboardListener)
			feedback()
			timer = false;
		}, 4000);
		effort_func() 

		// start the response listener
		effort_func = function(){
			if (timer == true) {
			  keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
				callback_function: effort_func,
				valid_responses: [32],
				rt_method: 'date',
				persist: false,
				allow_held_key: false
			  });
			  pressed += 1
			}
		}


    // data saving
    var trial_data = {
      pressed: pressed
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
