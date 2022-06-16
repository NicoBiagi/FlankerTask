/*
 * Example plugin template
 */

jsPsych.plugins["box-search"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "box-search",
    parameters: {
      n: {
        type: jsPsych.plugins.parameterType.INT, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: 10
      },
      images: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default_value: ["img/img/error.jpg"]
      },
      coords: {
        type: jsPsych.plugins.parameterType.INT,
        default_value: 0
      }
    }
  }

  plugin.trial = function(display_element, trial) {


		var w = window.innerWidth;
		var h = window.innerHeight;
		display_element.innerHTML = "<svg id='jspsych-snap-canvas' width=" + w + " height=" + h + "></svg>";
		var s = Snap("#jspsych-snap-canvas");
    var timer

		var n = trial.n;

		var w = window.innerWidth;
		var h = window.innerHeight;

		var box_size = 100;


		var imlist = trial.images

		var borders = [];
		var cards = [];
		var seen = [];
    var view_period = [];

		var theIm = [];
		var overbox = [];
		var mouseover = false

    var num

		inFunc = function(){
			if (mouseover == false){
        timer = Date.now()
				mouseover = true
				num = Number(this.attr("num"))
				if (!this.seen){
					this.pic = imlist[seen.length]
					seen.push(num)
				}
				this.seen = true
				var box = this.getBBox()
				theIm = s.image(this.pic, box.x, box.y, box_size, box_size)
				overbox = s.rect(box.x, box.y, box_size, box_size).attr({stroke: 'black', strokeWidth: 2, fillOpacity: 0}).mouseout(outFunc)
				if (seen.length==trial.images.length){
					overbox.unmouseout()
					overbox.attr({stroke: 'red'})
					for(i=0;i<n;i++){cards[i].unmouseover()}
					setTimeout(function(){
					jsPsych.finishTrial(trial_data)
					}, 1000)
					}
			}
		}

		outFunc = function(){
			mouseover = false
      view_period.push({im: theIm.node.href.baseVal, time: Date.now()-timer})
      console.log(view_period)
			theIm.remove()
			overbox.remove()
		}

		for(i=0;i<n;i++){
			var xpos = trial.coords[0][i];
			var ypos = trial.coords[1][i];
			//borders[i] = s.rect(xpos, ypos, box_size, box_size).attr({stroke: 'black', strokeWidth: 2})
			cards[i] = s.rect(xpos, ypos, box_size, box_size).attr({pic: 'error', seen: false, num: i, fill: '#7979E5', stroke: 'black', strokeWidth: 2}).mouseover(inFunc)
		}


    // data saving
    var trial_data = {
      seen: seen,
      view_data: view_period
    };


  };

  return plugin;
})();
