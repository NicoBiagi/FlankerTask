/*
 * Serial reaction time matching task
 */

jsPsych.plugins["choose-dance"] = (function() {

  var plugin = {};
  
  plugin.info = {
    name: "choose-dance",
    parameters: {
      sequences: {
        type: jsPsych.plugins.parameterType.INT, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: []
      }
    }
  }

  plugin.trial = function(display_element, trial) {
	var trial_data = {};
	
	var w = window.outerWidth;
	var h = window.outerHeight;
	
	display_element.innerHTML = "<svg id='svg' width=" + w + " height=" + h + "></svg>";
	
	var paper = Snap("#svg");
	
	var start = Date.now(), rt;
	var over = false, over2 = false;

    var radius = 300;
    var width = 150, height = 150,
        angle = 0, step = (2*Math.PI) / 5;
	var cx = w/2-radius/2, cy = h/2-radius/2;
	
	var reps = 180;
	var rep = 0;
		
	var clicked = false;
	
	var monster = [];
	
	var num = NaN;
	
	for(i=0;i<5;i++) {	
			var x = Math.round(width/2 + radius * Math.cos(angle) - width/2);
			var y = Math.round(height/2 + radius * Math.sin(angle) - height/2);
			monster[i] = paper.image("img/mon0.png",x+cx,y+cy,width,height).click(clickFunc);
			monster[i].number = i;
			angle += step;
	};
	
	function clickFunc(){
			// data saving
			num = this.number;
			console.log(num);
			clicked = true;
	}
	
	function monsters_move (angle, rep){
		setTimeout(function(){
			setTimeout(function(){
				for(i=0;i<5;i++){
					monster[i].node.href.baseVal = "img/mon0.png"
				}
			}, 200)
			setTimeout(function(){
					for(i=0;i<5;i++){
						monster[i].node.href.baseVal = "img/mon"+trial.sequences[i][rep]+".png"
					}
			}, 400)
			rep++
			if(rep<reps && clicked == false){
				
				return rep, monsters_move(angle, rep)
			}else{
				var trial_data = {
						  rep: rep,
						  resp: num
						};
			rep=reps;
			jsPsych.finishTrial(trial_data);
			}
		},600)
	}
		

monsters_move(angle,rep)
	
  
  };
  return plugin;
})();



	

	


