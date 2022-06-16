/*
 * Plugin for curiosity cards task
 */

jsPsych.plugins["curiosity-cards"] = (function() {

  var plugin = {};
  jsPsych.pluginAPI.registerPreload('snap', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.trial_type = trial.trial_type || 'lock';
    trial.unavailable = trial.unavailable || 2;
	trial.n_unavailable = trial.n_unavailable || 6;
	trial.n_samples = trial.n_samples || 12

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

	// make a snap canvas to display images on
	display_element.append($("<svg id='jspsych-snap-canvas' width=" + 1500 + " height=" + 800 + "></svg>"));
	paper = Snap("#jspsych-snap-canvas");
	
	var sample = 0
	
	clickFunc = (function() {
		console.log('mousedown')
		loc = this.getBBox()
		if (this.available == true){
			number = this.number
			sample = sample+1
			var pic = paper.image('img/im'+sample%10+'.jpg', loc.x, loc.y, loc.w, loc.h)
			pic.mouseup(unclickFunc)
		}
	})
	
	unclickFunc = 	(function() {
		console.log('mouseup')
				this.remove()
				if (sample >= trial.n_unavailable){
					limit.remove()
					card1.available = true
					card2.available = true
					card3.available = true
					card4.available = true
				}
				if(sample == trial.n_samples){
					paper.remove()
					jsPsych.finishTrial();
				}
	})

	var x_pos = [200, 600]
	var y_pos = [100, 400]
	
	for (i = 10; i > 0; i--){
		var card1 = paper.rect(x_pos[0]-i, y_pos[0]+i*3, 300, 200).attr({fill: 'LightGray', stroke: 'Gray'})
		var card2 = paper.rect(x_pos[1]-i, y_pos[0]+i*3, 300, 200).attr({fill: 'LightGray', stroke: 'Gray'})
		var card3 = paper.rect(x_pos[0]-i, y_pos[1]+i*3, 300, 200).attr({fill: 'LightGray', stroke: 'Gray'})
		var card4 = paper.rect(x_pos[1]-i, y_pos[1]+i*3, 300, 200).attr({fill: 'LightGray', stroke: 'Gray'})
	}
	
	var card1 = paper.rect(x_pos[0], y_pos[0], 300, 200)
	var card2 = paper.rect(x_pos[1], y_pos[0], 300, 200)
	var card3 = paper.rect(x_pos[0], y_pos[1], 300, 200)
	var card4 = paper.rect(x_pos[1], y_pos[1], 300, 200)
	
	var limit = paper.image('img/'+trial.trial_type+'.png', x_pos[(trial.unavailable+1)%2]+100,y_pos[trial.unavailable>1?1:0]+50, 100, 100)
	
	card1.number = 1
	card2.number = 2
	card3.number = 3
	card4.number = 4
	card1.available = (trial.unavailable!=1)
	card2.available = (trial.unavailable!=2)
	card3.available = (trial.unavailable!=3)
	card4.available = (trial.unavailable!=4)

	card1.attr({ 
		fill: "#ffbf00",
		stroke: "black",
		strokeWidth: 3
	}).mousedown(clickFunc)

	card2.attr({
		fill: 	"#e35d6a",
		stroke: "black",
		strokeWidth: 3
	}).mousedown(clickFunc)

	card3.attr({ 
		fill: "#5cb85c",
		stroke: "black",
		strokeWidth: 3
	}).mousedown(clickFunc)

	card4.attr({
		fill: 	"#428bca",
		stroke: "black",
		strokeWidth: 3
	}).mousedown(clickFunc)
	
	
	
  };

  return plugin;
})();
