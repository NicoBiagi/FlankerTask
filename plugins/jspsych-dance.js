/*
 * Serial reaction time matching task
 */

jsPsych.plugins["dance"] = (function() {

  var plugin = {};
  
  plugin.info = {
    name: "dance",
    parameters: {
      moves: {
        type: jsPsych.plugins.parameterType.INT, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: [1,2,3]
      },
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default_value: ['d1.png','d2.png','d3.png']
      },
	  isi: {
		type: jsPsych.plugins.parameterType.INT, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: 400
	  },
	  practice: {
	  	type: jsPsych.plugins.parameterType.BOOL, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: true
	  }
    }
  }

  plugin.trial = function(display_element, trial) {

	
	var w = window.outerWidth;
	var h = window.outerHeight;
	
	display_element.innerHTML = "<svg id='svg' width=" + w + " height=" + h + "></svg>";
	
	var paper = Snap("#svg");
	
	var start = Date.now(), rt;
	var over = false, over2 = false;

    var radius = 300;
    var width = 150, height = 150,
        angle = 0, step = (2*Math.PI) / trial.moves.length;
	var cx = w/2-radius/2, cy = h/2-radius/2;
		
	var move = [], stim;
	var circle = paper.circle(cx+width/2, cy+height/2, width*.66).attr({fill: 'white', stroke: '#FFC300', strokeWidth: 3})
	var stim = paper.image("img/mon0.png",cx,cy,width,height)
	
	if (trial.practice) {
		var txt = paper.text(cx+width*0.5, cy+width*0.5, "start here").attr({fontSize: 24, textAnchor:"middle"})
	}
	
	function draw_moves (moves, angle){
		
		for(i=0;i<trial.moves.length;i++) {	
			j = moves[i]
			var x = Math.round(width/2 + radius * Math.cos(angle) - width/2);
			var y = Math.round(height/2 + radius * Math.sin(angle) - height/2);
			move[i] = paper.image("img/d"+j+".png",x+cx,y+cy,width,height)
			move[i].number = j
			angle += step;
		};
	}
		
		
	function clickFunction(){
		if (!over){
			over = true;
			rt = Date.now()-start;
			
			var num = this.number;
			
			// code to run when the mouse is over an alien
			if(num == trial.stimulus){
				corr = 1
			}else{
				corr = 0
			}
			
			// data saving
			var trial_data = {
			  move: trial.stimulus,
			  resp: num,
			  correct: corr,
			  rt: rt
			};
			
			
			jsPsych.finishTrial(trial_data);

		}
		
	}  
	  
	
	draw_moves(trial.moves, angle)

	stim.mouseover(function(){
		if (!over2){
			if (txt) {
				txt.transform('t0,150')
				txt.attr({text: 'match the alien'})
			}
			console.log('over2')
			over2 = true;
			stim.node.href.baseVal = "img/mon"+trial.stimulus+".png"
			setTimeout(function(){stim.node.href.baseVal = "img/mon0.png"}, 200)
			for(i=0;i<trial.moves.length;i++) {	 
				move[i].mouseover(clickFunction)
			}
		}
	})
	
  }; 
  

  return plugin;
})();



	

	


