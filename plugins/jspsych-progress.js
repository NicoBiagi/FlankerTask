/*
 * Example plugin template
 */

jsPsych.plugins["progress"] = (function() {

  var plugin = {};
  jsPsych.pluginAPI.registerPreload('snap', 'stimuli', 'image', 'single-stim');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.text = trial.text || 'Your progress so far';
    trial.choices = trial.choices || [32]
    trial.progress = trial.progress || 0

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);


	display_element.append($("<svg id='jspsych-progress-canvas' width=" + 1000 + " height=" + 600 + "></svg>"));
	var s = Snap('jspsych-progress-canvas')
	
	centre = 250
	radius = 100
	d = 360*trial.progress/100-90
	radians = Math.PI*(d)/180;
	x1 = centre
	y1 = centre - radians
	x2= centre + radius*Math.cos(radians);
    y2= centre + radius * Math.sin(radians);
    
    largeArc = d-90>180 ? 1 : 0;  
    path= "M"+x1+","+y1+" A"+radius+","+radius+" 0 		"+largeArc+",1 "+x2+","+y2;
    
    
	
	window.onload = function(){
        back_circle = s.circle(centre, centre, radius).attr({
                                                            fill: 'none',
                                                            stroke: '#D5DBDB',
                                                            strokeWidth: 30
                                                            })
    
        front_arc = s.path(path).attr({
              stroke: '#F5B041',
              fill: 'none',
              strokeWidth: 30
            });
        text = s.text(30, 40, trial.text)
        text2 = s.text(30, 250, "Press 'space' to continue")    
        
        percent = s.text(centre, centre - 10, trial.progress+"%")
	}

    // data saving
    var trial_data = {
    };
    

    // start the response listener
    if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: function(){jsPsych.finishTrial(trial_data);},
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
     }

    
  };

  return plugin;
})();
