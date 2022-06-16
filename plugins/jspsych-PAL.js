/*
 * Plugin for loading and animating jars trial
 */

jsPsych.plugins["PAL"] = (function() {
	var plugin = {};

  plugin.info = {
    name: "PAL",
    parameters: {
      n: {
        type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 4
      }
    }
  }


  jsPsych.pluginAPI.registerPreload('snap', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    //trial.n = Number(trial.n) || 4;

	//display_element.append($("<div style = 'padding-top:50px;'><center><svg id='jspsych-snap-canvas' width=" + 900 + " height=" + 900 + " x = 300></svg></center></div>"));
	//paper = Snap("#jspsych-snap-canvas");
	console.log(trial.n)

	display_element.innerHTML = "<svg id='jspsych-snap-canvas' width=" + 900 + " height=" + 900 + "></svg>";
    var paper = Snap("#jspsych-snap-canvas");

    var radius = 300;
    var width = 150, height = 150,
        angle = 0, step = (2*Math.PI) / trial.n;
	var cx = radius + 50, cy = radius + 10


	var foods = ['ice cream', 'cheese', 'carrots', 'cake', 'pizza', 'watermelon', 'apples', 'eggs']
	var foods = foods.slice(0,trial.n)
	console.log(foods)
	var foods1 = foods.slice(0)
	var aliens = Array.apply(null, Array(trial.n[0])).map(function (_, i) {return i;})

	var alien = new Object()
	var clicked = false
	var learn = true
	var learn_clicks = []
	var test_clicks = []
	var learn_n = 0


	var clickFunction = function(){
		if(learn){
			if(!clicked){
				clicked = true
				theAlien = this
				learn_clicks[learn_n] = theAlien.number
				learn_n = learn_n+1
				border = paper.rect(theAlien.attr('x')-5,theAlien.attr('y')-5, width+10, height+10).attr({strokeWidth:3, 'fill-opacity':0, stroke: "#000000"})
				food = paper.image("img/"+foods[theAlien.number]+".png",cx,cy,width,height)
				setTimeout(function(){
					theAlien.attr({strokeWidth: 0})
					clicked = false
					paper.clear()
					draw_test_button()
					//setTimeout(function(){
						//aliens = shuffle(aliens)
						//if(angle == 0) {angle = angle + step/2} else {angle = 0}
						draw_aliens(aliens, angle)
					//}, 500)
					}, 1500)
			}
		}else{
			theAlien = this
			test_clicks[tested] = theAlien.number
			border = paper.rect(theAlien.attr('x')-5,theAlien.attr('y')-5, width+10, height+10).attr({strokeWidth:3, 'fill-opacity':0, stroke: "#000000"})
			setTimeout(function(){
					border.remove()
					food.remove()
					setTimeout(function(){
						tested = tested+1
						if(tested < trial.n){
							food = paper.image("img/"+foods[tested]+".png",cx,cy,width,height)
						}else{
							paper.clear()
							jsPsych.finishTrial({
									foods1: foods1,
									aliens: aliens,
									foods2: foods,
									test_clicks:test_clicks,
									learn_clicks:learn_clicks});
							}
					}, 500)
			}, 1000)

		}

	}

	function draw_aliens (aliens, angle){
		for(i=0;i<trial.n;i++) {
			j = aliens[i]
			var x = Math.round(width/2 + radius * Math.cos(angle) - width/2);
			var y = Math.round(height/2 + radius * Math.sin(angle) - height/2);
			alien[i] = paper.image("img/alien"+j+".png",x+cx,y+cy,width,height)
			alien[i].click(clickFunction)
			alien[i].number = j
			angle += step;
		};
	}

	function shuffle (array) {
	  var i = 0
		, j = 0
		, temp = null

	  for (i = array.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1))
		temp = array[i]
		array[i] = array[j]
		array[j] = temp
	  }
	  return array
	}

	function draw_test_button () {
		r = paper.rect(750,750,150,100,5,5).attr({fill:"#94EBE2", stroke:"#00000", strokeWidth:2})
		t = paper.text(780,800, "test me")
		g = paper.g(r,t).click(function() {
				foods = shuffle(foods)
				learn = false, g.remove()
				food.remove()
				tested = 0
				food = paper.image("img/"+foods[tested]+".png",cx,cy,width,height)
		})
	}

draw_aliens(aliens, angle)
draw_test_button()



};
  return plugin;
})();
