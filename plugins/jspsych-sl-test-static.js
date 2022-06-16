/*
 * Statistical learning test
 */

jsPsych.plugins["sl-test-static"] = (function() {

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
	
	// create a snap plugin fro multiple lines of text
	Snap.plugin(function (Snap, Element, Paper, glob) {
		Paper.prototype.multitext = function (x, y, txt) {
			txt = txt.split("\n");
			var t = this.text(x, y, txt);
			t.selectAll("tspan:nth-child(n+2)").attr({
				dy: "1.2em",
				x: x
			});
			return t;
		};
	});
	
	
	// set up canvas
	
	var w = window.outerWidth;
	var h = window.outerHeight;
	display_element.innerHTML = "<svg id='svg' width=" + w + " height=" + h + "></svg>";
	var s = Snap("#svg");
	
	var ans;
	var start;
	

	// create stimulus array
	var trips = [trial.familiar_triplet, trial.unfamiliar_triplet]
	var stim = [].concat(trips[trial.trip_order], trips[[1,0][trial.trip_order]])

	
	// create position arrays
	var rect_size = 300;
	var im_size = 200;
	var rect_pos = [[w/2-rect_size*1.5, h/2-rect_size*1.5], [w/2+rect_size, h/2-rect_size*1.5]];
	var im_pos_x = [rect_pos[0][0]+(rect_size - im_size)/2,rect_pos[1][0]+(rect_size - im_size)/2]
	var im_pos_y = [[rect_pos[0][1]+(rect_size - im_size)/2],[rect_pos[0][1]+(rect_size - im_size)+im_size],[rect_pos[0][1]+(rect_size - im_size)*1.5+im_size*2]]
	
	// rect 
	var left_rect = s.rect(rect_pos[0][0], rect_pos[0][1], rect_size, rect_size*3-100).attr({fill:"white", 'stroke-width': 3, stroke: 'black', side: 'left'})
	var right_rect = s.rect(rect_pos[1][0], rect_pos[1][1], rect_size, rect_size*3-100).attr({fill:"white", 'stroke-width': 3, stroke: 'black', side: 'right'})
	var im = s.group();

	// show triplets at same time
	for(i=0;i<2;i++){
		for(j=0;j<3;j++){
			if (i==0){side = trial.side_order}else{side = [1,0][trial.side_order]}
			var thisIm = s.image('img/alien'+stim[i*3+j]+'.png', im_pos_x[side], im_pos_y[j]).attr({side: side}).click(function(){
				ans = this.attr("side")
				end_trial()
			})
			im.add(thisIm)
		}
	}
	
	s.multitext(w/2+70, 200, 'Which aliens lined up\ntogether for the\nspaceship?').attr({"font-size":40, 
																							"text-anchor": "middle",
																							"font-family": "Arial"})
																							
	
	// end of trial function
	var end_trial = function(){
	
		var rt = Date.now() - start;
		if(trial.side_order+trial.trip_order==1){
			var corr_ans = 1
		}else{
			var corr_ans = 0
		}
		
		
		var corr = corr_ans == ans;
		
		
		im.remove()
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
