/*
 * Plugin for statistical learning test trials (two item forced choice, familiar vs. foil)
 */

jsPsych.plugins["SL"] = (function() {

  var plugin = {};
  jsPsych.pluginAPI.registerPreload('snap', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {
	  
	  
	  
	display_element.append($("<div style = 'padding-top:50px;'><center><svg id='jspsych-snap-canvas' width=" + 900 + " height=" + 900 + " x = 300></svg></center></div>"));
	paper = Snap("#jspsych-snap-canvas");
	
    var width = 150, height = 150;
	var cx = 450 + 50, cy = 450 + 10
	
	
	listA = [0,1,2]
	listb = [3,4,5]
	listC = [6,7,8]


	for(i=0;i<30;i++){
		for(j=0;j<3;j++){
			alien = paper.image("img/alien"+listA[j]+".png",cx,cy,width,height)
			setTimeout(function(){
					alien.remove()
					setTimeout(function(){},200)
			}, 400)
		}
		for(j=0;j<3,j++){
			alien = paper.image("img/alien"+listB[j]+".png",cx,cy,width,height)
						setTimeout(function(){
					alien.remove()
					setTimeout(function(){},200)
			}, 400)
		}
		for(j=0;j<3,j++){
			alien = paper.image("img/alien"+listC[j]+".png",cx,cy,width,height)
						setTimeout(function(){
					alien.remove()
					setTimeout(function(){},200)
			}, 400)
		}
	}
	

	
};
  return plugin;
})();
