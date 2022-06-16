/*
 * Example plugin template
 */

jsPsych.plugins["snap"] = (function() {

  var plugin = {};
  jsPsych.pluginAPI.registerPreload('snap', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.size = trial.size || 100;
    trial.value = trial.value || 0;
	trial.pullT = trial.pullT || 300;
	trial.pushT = trial.pushT || 300;

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

	
	  // kill keyboard listeners
	  if (typeof keyboardListener !== 'undefined') {
		jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
	  }
	
	
	// display_element.append($("<svg id='jspsych-snap-canvas' width=" + 600 + " height=" + 320 + "></svg>"));


	paper = Snap("#jspsych-snap-canvas");

							
			
	// create the balloon with a circle and a triangle
	b = paper.circle(212 + trial.size, 298-trial.size, trial.size).attr({fill: '#00cc99'})
	t = paper.polygon(220, 290, 205, 290, 220, 305).attr({fill: '#00cc99'})

	// show pull image
	paper.image('img/rab_pull.bmp', 0, 0, 150, 300)
	v = paper.text(75, 295, trial.value).attr({fill: '#FFFFFF',
												'text-anchor': 'middle'})

	// wait 300ms
	b.animate({r: trial.size}, trial.pullT, mina.easeinout, function(){
	
		// show push image
		paper.image('img/rab_push.bmp', 0, 0, 150, 300)
		// animate ball growth for 300ms
		b.animate({r: trial.size+10, 
					cx: 222+trial.size,
					cy: 288-trial.size
					}, trial.pushT, mina.easeinout, jsPsych.finishTrial())
		
	})
	
	

  };

  return plugin;
})();
