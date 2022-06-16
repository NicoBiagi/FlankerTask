/*
 * Analogue rating scale using snap
 */

jsPsych.plugins["rating"] = (function() {

  var plugin = {};


  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.anchorImages = trial.anchorImages || [];
    trial.choices = trial.choices || [];


    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
	display_element.append($("<svg id='jspsych-rating-canvas' width=" + 1000 + " height=" + 300 + "></svg>"));
        var s = Snap("#jspsych-rating-canvas");
    
        // function to end trial when it is time
        var end_trial = function() {


          // kill keyboard listeners
          if (typeof keyboardListener !== 'undefined') {
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
          }

          // data saving
          var trial_data = {
            //final_pos: bb.cx-200
          };
		
	  // clear the display
      	  display_element.html('');
	  s.clear();

          // end trial
          jsPsych.finishTrial(trial_data);

      };
    
      (function() {
      Snap.plugin( function( Snap, Element, Paper, global ) {

					Element.prototype.limitDrag = function( params ) {
							this.data('minx', params.minx ); this.data('miny', params.miny );
							this.data('maxx', params.maxx ); this.data('maxy', params.maxy );
							this.data('x', params.x );    this.data('y', params.y );
							this.data('ibb', this.getBBox() );
							this.data('ot', this.transform().local );
							this.drag( limitMoveDrag, limitStartDrag, limitFinishDrag );
							return this;    
					};

					// this code is old and clunky now, and transform possibly in wrong order, so only use for simple cases
					function limitMoveDrag( dx, dy ) {
							var tdx, tdy;
							var sInvMatrix = this.transform().globalMatrix.invert();
							sInvMatrix.e = sInvMatrix.f = 0; 
							tdx = sInvMatrix.x( dx,dy ); tdy = sInvMatrix.y( dx,dy );

							this.data('x', +this.data('ox') + tdx);
							this.data('y', +this.data('oy') + tdy);
							if( this.data('x') > this.data('maxx') - this.data('ibb').width  ) 
									{ this.data('x', this.data('maxx') - this.data('ibb').width  ) };
							if( this.data('y') > this.data('maxy') - this.data('ibb').height ) 
									{ this.data('y', this.data('maxy') - this.data('ibb').height ) };
							if( this.data('x') < this.data('minx') ) { this.data('x', this.data('minx') ) };
							if( this.data('y') < this.data('miny') ) { this.data('y', this.data('miny') ) };
							this.transform( this.data('ot') + "t" + [ this.data('x'), this.data('y') ]  );
					};

					function limitStartDrag( x, y, ev ) {
							this.data('ox', this.data('x')); this.data('oy', this.data('y'));
					};
					
					function limitFinishDrag() {
						//return bb = this.getBBox(); 
								}
			  });
			})();
													

			text = s.text(0,20,"Rate your emotions by dragging the marker. Then press 'space'.")
			sad = s.image(trial.anchorImages[0], 0, 50, 100, 100)
			happy = s.image(trial.anchorImages[1], 650, 50, 100, 100)
			line = s.polyline(200, 100, 600, 100).attr({ stroke: '#000', 'strokeWidth': 3})
			marker = s.polygon(400, 103, 410, 120, 390, 120).attr({fill: '#000'}).limitDrag({ x: 0, y: 0, minx: -200, miny: 0, maxx: 220, maxy: 0 })
			
      // start the response listener
      if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: end_trial,
          valid_responses: trial.choices,
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });
      }


  };

  return plugin;
})();
