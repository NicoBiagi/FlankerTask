/*
 * Infographic template for displaying survey data
 */

jsPsych.plugins["infographic"] = (function() {

  var plugin = {};
  jsPsych.pluginAPI.registerPreload('snap', 'stimulus', 'image');
  
  plugin.info = {
    name: "infographic",
    parameters: {
      data: {
        type: jsPsych.plugins.parameterType.FLOAT,
        default_value: [0]
      },
      names: {
        type: jsPsych.plugins.parameterType.STRING,
        default_value: "NA"
      }
    }
  }

  plugin.trial = function(display_element, trial) {

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

	$(document).scrollTop(0);
  	// make a snap canvas to display images on
	display_element.innerHTML = "<svg id='jspsych-snap-canvas' width=" + 1200 + " height=" + 1500 + "></svg>";
	paper = Snap("#jspsych-snap-canvas");
	
	info_up = 0
	
	console.log('new')
	
	var palette = ["#ff4081", "#ffd166", "#06d6a0", "#118ab2", "#073b4c", "white"]
	
	sub_text = ["Joyous exploration:\nThe pleasure and enjoyment\nof learning new information\nand facing new challenges", 
				"Deprivation sensitivity:\nThe discomfort and\ntension felt when faced\nwith uncertainty or new\nsituations", 
				"Social curiosity:\nThe desire for information\nabout other people, and\nto understand their thoughts\nand actions", 
				"Thrill seeking:\nThe tendency to seek\nout risky situations to\nexperience new thrills\nand sensations", 
				"Stress tolerance:\nThe ability to cope with\nnew or uncertain situations\nthat may present conflict\nor confusion"]
	
	
	clickFunc = (function(){
		if (info_up == 1) {
			info_line.remove()
			info_box.remove()
			}
		info_up = 1
		number = this.number
		colour = palette[number]
		bar_top = x[number].getBBox().y
		bar_centre = x[number].getBBox().cx
		
		info_box = paper.rect(400, 50, 400, 300, 15).attr({
													stroke: colour,
													fill: "white",
													'stroke-width': 8
		})
		info_line = paper.path("M"+bar_centre+" "+bar_top+"L"+bar_centre+" 380L600 380L600 350").attr({
																			stroke: colour,
																			'stroke-width': 5,
																			'fill-opacity': 0
																		})
		info_text = paper.multitext(600, 100, sub_text[number]).attr({'font-size': 28,
																		'text-anchor': 'middle'})
	})
	
	var x = [];
	var txt = [];
	for (i=0; i<5; i++ ){
		x[i] = paper.rect(100+i*200,650, 200, 50).attr("fill", palette[i]).click(clickFunc)
		x[i].animate({y: 650-(40*trial.data[i]), height: 50+40*trial.data[i]}, 1000);
		x[i].number = i
		txt[i] = paper.text(200+i*200, 695, trial.names[i]).attr({fill: palette[5],
													'text-anchor': 'middle'}).click(clickFunc)
		txt[i].number = i
	}

	
	title = paper.text(600, 200, "This is your curiosity!").attr({'font-size': 38,
																		'text-anchor': 'middle'})
	instr = paper.text(600, 300, "Click on a bar to learn more").attr({'font-size': 24,
																		'text-anchor': 'middle'})
	
	paper.rect(525, 715, 150, 80, 20).attr({stroke: "#118ab2", "stroke-width": 3, fill: "white"}).click(function () {
							    // end trial
			jsPsych.finishTrial()});

	paper.text(600, 770, "MENU").attr({"text-anchor": "middle", "font-family": "Montserrat", "font-size": 40}).click(function () {
							    // end trial
			jsPsych.finishTrial()});												


  


  };

  return plugin;
})();
