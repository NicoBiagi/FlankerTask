/*
 * Serial reaction time matching task
 */

jsPsych.plugins["SRT"] = (function() {

  var plugin = {};
  
  plugin.info = {
    name: "SRT",
    parameters: {
      aliens: {
        type: jsPsych.plugins.parameterType.INT, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: [0,1,2,3,4]
      },
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default_value: ['alien0.png','alien1.png','alien2.png','alien3.png','alien4.png']
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
        angle = 0, step = (2*Math.PI) / trial.aliens.length;
	var cx = w/2-radius/2, cy = h/2-radius/2;
		
	var alien = [], stim;
	var circle = paper.circle(cx+width/2, cy+height/2, width*.66).attr({fill: 'white', stroke: '#FFC300', strokeWidth: 3})
		
	
	if (trial.practice) {
		var txt = paper.text(cx+width*0.5, cy+width*0.5, "start here").attr({fontSize: 24, textAnchor:"middle"})
	}
	function draw_aliens (aliens, angle){
		
		for(i=0;i<trial.aliens.length;i++) {	
			j = aliens[i]
			var x = Math.round(width/2 + radius * Math.cos(angle) - width/2);
			var y = Math.round(height/2 + radius * Math.sin(angle) - height/2);
			alien[i] = paper.image("img/alien"+j+".png",x+cx,y+cy,width,height)
			alien[i].number = j
			angle += step;
		};
	}
		
		
	function overFunction(){
		if (!over){
			over = true;
			rt = Date.now()-start;
			stim.remove();
			var num = this.number;
			
			// code to run when the mouse is over an alien
			if(num == trial.stimulus){
				corr = 1
				if (txt) {
					txt.attr({text: 'great!'})
				}
				Snap.animate(1, 4, function (val) {
					if(Math.floor(val) % 2){var a = "a"}else{var a = ""}
    				alien[trial.aliens.indexOf(num)].node.href.baseVal = "img/alien"+num+a+".png"
				}, trial.isi);
			}else{
				corr = 0
				if (txt) {
					txt.attr({text: 'oops!'})
				}
				Snap.animate(1, 4, function (val) {
					if(Math.floor(val*5) % 2){var a = 1.1}else{var a = 1}
    				alien[trial.aliens.indexOf(num)].transform('S'+a)
				}, trial.isi);
			}
			
			setTimeout(function(){
			// data saving
			var trial_data = {
			  alien: trial.stimulus,
			  resp: num,
			  correct: corr,
			  rt: rt
			};
			
			
			jsPsych.finishTrial(trial_data);

			}, trial.isi)
		}
		

		
	}  
	  
	
	draw_aliens(trial.aliens, angle)

	circle.mouseover(function(){
		if (!over2){
			if (txt) {
				txt.transform('t0,150')
				txt.attr({text: 'match the alien'})
			}
			console.log('over2')
			over2 = true;
			stim = paper.image("img/alien"+trial.stimulus+".png",cx,cy,width,height)
			for(i=0;i<trial.aliens.length;i++) {	 
				alien[i].mouseover(overFunction)
			}
		}
	})
	
  }; 
  

  return plugin;
})();



	

	


