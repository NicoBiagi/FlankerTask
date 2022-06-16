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
	
	display_element.append($("<svg id='jspsych-snap-canvas' width=" + 1000 + " height=" + 350 + "></svg>"));
	paper = Snap("#jspsych-snap-canvas");
	try_box = Snap.load("img/32.svg", function ( loadedFragment ) {
			paper.append( loadedFragment );
	} );
	console.log(paper.select("svg"))
	
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	pressed = 0;
	    // set the HTML of the display target to replaced_text.

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
    
		timer = true;
		setTimeout(function(){
			console.log('timeout')
			jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener)
			timer = false;
		    // data saving
			var trial_data = {
			  pressed: pressed
			};
			// end trial
    		jsPsych.finishTrial(trial_data);
			paper.clear()
		}, 2500);
		effort_func() 

    
  };
	
  return plugin;
})();
