/*
 * Example plugin template
 */

jsPsych.plugins["plugin-snap"] = (function() {

  var plugin = {};
  plugin.info = {
    name: "plugin-snap",
    parameters: {
      time_cost: {
        type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 3
      }
    }
  }
  jsPsych.pluginAPI.registerPreload('snap', 'stimuli', 'image');

  plugin.trial = function(display_element, trial) {

	  display_element.innerHTML = "<div style='text-align:center;padding: 100'><svg id='jspsych-snap-canvas' width=" + 260 + " height=" + 260 + "></svg></div>"
    var s = Snap("#jspsych-snap-canvas");
    var clock_outer = s.rect(0, 0, 260, 200, 15).attr({fill: "black"})
    var clock_inner = s.rect(10, 50, 240, 140, 15).attr({stroke: "black", strokeWidth: 8, fill: "white"})
    var cue = s.text(130,40,"time penalty").attr({fontSize:35, "font-family":"Orbitron", "text-anchor": "middle", fill: 'red'})
    var t = s.text(20,120,"00:0"+trial.time_cost).attr({fontSize:60, "font-family":"Orbitron"})

      Snap.animate(trial.time_cost, 0, function (value) {
          t.attr({text: "00:0"+Math.round(value)});
      }, (1000*trial.time_cost), function(){    // end trial
          jsPsych.finishTrial(trial_data)});



    // data saving
    var trial_data = {
      time_cost: trial.time_cost
    };

  };

  return plugin;
})();
