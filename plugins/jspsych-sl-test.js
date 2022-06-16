/*
 * Statistical learning test
 */

jsPsych.plugins["sl-test"] = (function() {

  var plugin = {};
  
  plugin.info = {
    name: "sl-test",
    parameters: {
      familiar_triplet: {
        type: jsPsych.plugins.parameterType.IMAGE, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: undefined
      },
      unfamiliar_triplet: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default_value: undefined
      },
      trip_order: {
      	type: jsPsych.plugins.parameterType.INT,
      	default_value: 0
      },
      side_order: {
      	type: jsPsych.plugins.parameterType.INT,
      	default_value: 0
      },
      stimulus_duration: {
      	type: jsPsych.plugins.parameterType.INT,
      	default_value: 600
      },
      isi: {
      	type: jsPsych.plugins.parameterType.INT,
      	default_value: 200
      },
    }
  }

  plugin.trial = function(display_element, trial) {
	
	// set up canvas
	
	var w = window.outerWidth;
	var h = window.outerHeight;
	display_element.innerHTML = "<svg id='svg' width=" + w + " height=" + h + "></svg>";
	var s = Snap("#svg");
	
	var im;
	var start;

	// create stimulus array
	var trips = [trial.familiar_triplet, trial.unfamiliar_triplet]
	var stim = [].concat(trips[trial.trip_order], trips[[1,0][trial.trip_order]])
	console.log(stim)
	
	// create position arrays
	var rect_size = 300;
	var im_size = 200;
	var rect_pos = [[w/2-100-rect_size, h/2-rect_size/2], [w/2+100, h/2-rect_size/2]];
	var im_pos = [[w/2-150-im_size,h/2-im_size/2],[w/2+150,h/2-im_size/2]]
	
	// rect 
	var left_rect = s.rect(rect_pos[0][0], rect_pos[0][1], rect_size, rect_size).attr({fill:"white", 'stroke-width': 3, stroke: 'black', side: 'left'})
	var right_rect = s.rect(rect_pos[1][0], rect_pos[1][1], rect_size, rect_size).attr({fill:"white", 'stroke-width': 3, stroke: 'black', side: 'right'})
	
 	//display triplets on left and right of screen	(function repeats 6 times updating 
	var show_image = function(stim_im, side_order, isi, duration, n){
		if(n<6){
			if (n == 1) { var break_time = 1000} else { var break_time = 0}
			if (n<3){side = side_order}else{side = [1,0][side_order]}
			im = s.image(stim_im, im_pos[side][0], im_pos[side][1])
			var x=n+1
			setTimeout(function(){
				im.remove()
				setTimeout(function(){
					show_image('img/alien'+stim[x]+'.png', trial.side_order, trial.isi + break_time, trial.stimulus_duration, x)
				}, isi)
				}, duration)
				
		}else{
			// timer
			start = Date.now();
			
			s.text(w/2, 200, 'Which aliens lined up together for the spaceship?').attr({"font-size":50, 
																							"text-anchor": "middle",
																							"font-family": "Arial"})
		    // participant responds by clicking one of the response boxes    
			left_rect.click(end_trial)
    		right_rect.click(end_trial)
		}
	}
	
	show_image('img/alien'+stim[0]+'.png', trial.side_order, trial.isi, trial.stimulus_duration, 0);
	
	// end of trial function
	var end_trial = function(){
	
		var rt = Date.now() - start;
		if(trial.side_order+trial.trip_order==1){
			var corr_ans = 'right'
		}else{
			var corr_ans = 'left'
		}
		
		var ans = this.attr("side")
		var corr = corr_ans == ans;
		
		
		s.remove()
		setTimeout(function(){
			
			
			// data saving
			var trial_data = {
			  correct_ans: corr_ans,
			  ans: ans,
			  correct: corr,
			  rt: rt
			};		
		
			
			jsPsych.finishTrial(trial_data);
		}, 1000)
	};



  };

  return plugin;
})();
