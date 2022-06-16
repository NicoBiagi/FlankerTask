/*
 * Example plugin template
 */

jsPsych.plugins["feedback"] = (function() {

  var plugin = {};
  
    jsPsych.pluginAPI.registerPreload('snap', 'stimuli', 'image');

  plugin.trial = function(display_element, trial) {

    // // set default values for parameters
    // trial.size = trial.size || 100;
	// trial.outcome = trial.outcome || "bust"

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

	var paper = Snap("#jspsych-snap-canvas");
	
	// v = paper.path("M200 10V310").attr({stroke: "#000",
										// strokeWidth: 2})
	// h = paper.path("M200 310H500").attr({stroke: "#000",
										// strokeWidth: 2})
	

			
	
	// b = paper.circle(212 + trial.size, 298-trial.size, trial.size).attr({fill: '#00cc99'})
	// t = paper.polygon(220, 290, 205, 290, 220, 305).attr({fill: '#00cc99'})
	
	// //if(trial.outcome == "bust"){
	
		// // show pull image
		paper.image('img/rab_pull.bmp', 0, 0, 150, 300)
		// // wait 300ms
		// b.animate({r: trial.size}, 300, mina.easeinout, function(){
		
		// // show push image
		// paper.image('img/rab_lose.bmp', 0, 0, 150, 300)
		// // animate ball growth for 300ms
		// //b.remove()
				
		// })
	// //}
	
	

    // data saving
    var trial_data = {
      
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
