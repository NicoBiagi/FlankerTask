/*
 * Example plugin template
 */

jsPsych.plugins["box-search-eye"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "box-search-eye",
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
// set up the window
    var w = window.innerWidth;
		var h = window.innerHeight;
		display_element.innerHTML = "<svg id='jspsych-snap-canvas' width=" + w + " height=" + h + "></svg>";
		var s = Snap("#jspsych-snap-canvas");

var im_shown = false;

// averageing function
const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
var eye_data = [];
var timer
var eyeon = 'nothing'
var view_period = [];

// create a custom event for incoming eye data
var eyeEvent = new CustomEvent("newEyeData");

var eyeListener = function(){
  //console.log('x: '+ eye.x.slice(-1)+' y: '+eye.y.slice(-1))
  over = Snap.getElementByPoint(arrAvg(eye.x.slice(-5)), arrAvg(eye.y.slice(-5)))
  if (over){

    if(over.id_name>=0){
      eyeon = over.id_name
      if(seen.length<trial.n && !im_shown){
        timer = Date.now()
        over_box[eyeon].eyeover()
      }
    }else{
      if (eyeon != 'nothing'){
        view_period.push({im: theIm.node.href.baseVal, time: Date.now()-timer})
        eyeon = 'nothing'
      }
    }
  }else{
    if (eyeon != 'nothing'){
      view_period.push({im: theIm.node.href.baseVal, time: Date.now()-timer})
      eyeon = 'nothing'
    }
  }

  if(im_shown && eyeon == 'nothing'){ // if there's an image shown but it's not being looked at then remove the image
    im_shown = false;
    theIm.remove();
  }

  eye_data.push({x: eye.x, y: eye.y, time: eye.time, over: eyeon})

}
window.addEventListener("newEyeData", eyeListener, false)

  var  eye = {x: [], y:[], time:[]};

  socket.on('message', function(data){
    var dat = JSON.parse(data);
    if(dat.right){ // check if there's data then add the data to the data function
      eye.x.push(dat.right.x*screen.width);
      eye.y.push(dat.right.y*screen.height);
      eye.time.push(dat.timeSeconds);
      window.dispatchEvent(eyeEvent)
    }
  })

		var n = trial.n;

		var w = window.innerWidth;
		var h = window.innerHeight;

		var box_size = 100;

		var imlist = trial.images

		var borders = [];
		var cards = [];
		var seen = [];

		var theIm = [];
		var over_box = [];

		inFunc = function(){
				im_shown = true
				var num = Number(this.id_name)
				if (!this.seen){
					this.pic = imlist[seen.length]
					seen.push(num)
				}
				this.seen = true
				var box = this.getBBox()
				theIm = s.image(this.pic, box.x+box_size/2, box.y+box_size/2, box_size, box_size).attr({stroke:'black', strokeWidth:2})
        theIm.id_name = trial.n+1

        if (seen.length==trial.images.length){
          setTimeout(function(){
            window.removeEventListener("newEyeData", eyeListener, false);
            jsPsych.finishTrial(trial_data)
          }, 1000)
        }
		}


		for(i=0;i<n;i++){
			var xpos = trial.coords[0][i];
			var ypos = trial.coords[1][i];
			//borders[i] = s.rect(xpos, ypos, box_size, box_size).attr({stroke: 'black', strokeWidth: 2})
			cards[i] = s.rect(xpos, ypos, box_size, box_size).attr({pic: 'error', seen: false, num: i, fill: '#d38d5f',stroke: 'black', strokeWidth: 2})//.mouseover(inFunc)
      cards[i].id_name = i;
      over_box[i] = s.rect(xpos-box_size/2, ypos-box_size/2, box_size*2, box_size*2).attr({seen: false, num: i, fillOpacity: 0})//.mouseover(inFunc)
      over_box[i].id_name = i;
      over_box[i].eyeover = inFunc
		}


    // data saving
    var trial_data = {
      seen: seen,
      eye_data: eye_data
    };


  };

  return plugin;
})();
