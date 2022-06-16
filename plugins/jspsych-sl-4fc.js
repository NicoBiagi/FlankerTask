/*
 * Statistical learning test
 */

jsPsych.plugins["sl-4fc"] = (function() {

  var plugin = {};
  
  plugin.info = {
    name: "sl-test",
    parameters: {
      triplet: {
        type: jsPsych.plugins.parameterType.IMAGE, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: undefined
      },
	  test_item: {
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
	
	
	// set up some variables
	var im = [];
	var	rect = [];
	var test_im = [];
	var	test_rect = [];
	var start;

	
	// create position arrays
	var rect_size = 300;
	var im_size = 200;
	var rect_pos = [[w/2-rect_size*2, h*0.33-rect_size/2], [w/2-rect_size*0.5, h*0.33-rect_size/2], [w/2+rect_size, h*0.33-rect_size/2]];
	var im_pos = [[rect_pos[0][0]+(rect_size-im_size)/2,h*0.33-im_size/2],[rect_pos[1][0]+(rect_size-im_size)/2,h*0.33-im_size/2],[rect_pos[2][0]+(rect_size-im_size)/2,h*0.33-im_size/2]]
	
	
	// rect 
	for (i=0;i<3;i++){
		rect[i] = s.rect(rect_pos[i][0], rect_pos[i][1], rect_size, rect_size).attr({fill:"white", 'stroke-width': 3, stroke: 'black', side: 'left'});
		if(i != trial.test_item){
			im[i] = s.image('img/alien'+trial.triplet[i]+'.png', im_pos[i][0], im_pos[i][1]);
		}else{
			im[i] = s.text(rect_pos[i][0]+rect_size/2, rect_pos[i][1]+rect_size*.66, '?').attr({'font-size':200, 'text-anchor': 'middle'})
		}
	}
	
	
	var test_rect_pos = [[w/2-rect_size*3, h*0.33-rect_size/2], [w/2-rect_size*1.5, h*0.33-rect_size/2], [w/2+rect_size*0.5, h*0.33-rect_size/2], [w/2+rect_size*2, h*0.33-rect_size/2]];
	var test_im_pos = [[test_rect_pos[0][0]+(rect_size-im_size)/2,h*0.33-im_size/2],[test_rect_pos[1][0]+(rect_size-im_size)/2,h*0.33-im_size/2],[test_rect_pos[2][0]+(rect_size-im_size)/2,h*0.33-im_size/2],[test_rect_pos[3][0]+(rect_size-im_size)/2,h*0.33-im_size/2]]
	
	console.log(triplets)
	// rect 
	for (i=0;i<4;i++){
		test_rect[i] = s.rect(rect_pos[i][0], rect_pos[i][1], rect_size, rect_size).attr({fill:"white", 'stroke-width': 3, stroke: 'black', side: 'left'});
		test_im[i] = s.image('img/alien'+triplets[i][trial.test_item]+'.png', im_pos[i][0], im_pos[i][1]).attr({pos:i}).click(jsPsych.finishTrial-);
	}
	
/* 	//display triplets on left and right of screen	(function repeats 6 times updating 
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
*/

  };

  return plugin;
})();
