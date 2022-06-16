/*
 * Plane trials (including take-off and landing)
 */

jsPsych.plugins["expl-choice"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "expl-choice",
    parameters: {
      labels: {
        type: jsPsych.plugins.parameterType.STRING, // INT, IMAGE, KEYCODE, STRING, FUNCTION, FLOAT
        default_value: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    // create new snap plugin for text over multiple lines
    Snap.plugin(function (Snap, Element, Paper, glob) {
      Paper.prototype.multitext = function (x, y, txt) {
        txt = txt.split("\n");
        y2 = y - (txt.length-1)*20
        var t = this.text(x, y2, txt);
        t.selectAll("tspan:nth-child(n+2)").attr({
          dy: "1.2em",
          x: x
        });
        return t;
      };
    });
    var w = window.innerWidth;
		var h = window.innerHeight;

    display_element.innerHTML = "<svg id='jspsych-snap-canvas' width=" + w + " height=" + h + "></svg>";
    var paper = Snap('#jspsych-snap-canvas');

    var x_pos = [w/2-500, w/2-150, w/2+200]
    var y_pos = [h/2-400, h/2-100, h/2+200]
    if(trial.labels.length==9){
      var palette = ["#06d6a0", "#06d6a0",  "#06d6a0", "#06d6a0", "#073b4c", "#06d6a0", "#06d6a0", "#06d6a0", "#06d6a0"]
    }else{
      var palette = ["#06d6a0", "#06d6a0",  "#06d6a0", "#06d6a0", "#06d6a0", "#06d6a0", "#06d6a0", "#06d6a0"]
    }

    boxes = [], text = [];

    endTrial = function(){
        // data saving
        var trial_data = {
          selected: trial.labels[this.num]
        };

        // end trial
        jsPsych.finishTrial(trial_data);
    }


    for(i=0;i<trial.labels.length;i++){
      boxes[i] = paper.rect(x_pos[i%3], y_pos[Math.floor(i/3)], 300, 200, 20).attr({stroke: palette[i],
      "stroke-width": 8,
      "fill-opacity": 0});
      boxes[i].num = i;
      boxes[i].click(endTrial);
      text[i] = paper.multitext(x_pos[i%3]+150, y_pos[Math.floor(i/3)]+100, trial.labels[i]).attr({"text-anchor": "middle", "font-family": "Montserrat", "font-size": 32})
      text[i].num = i;
      text[i].click(endTrial)
    }


    };
  return plugin;
})();
