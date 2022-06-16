/*
 * Plane trials (including take-off and landing)
 */

jsPsych.plugins["plane"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "plane",
    parameters: {
      weather: {
        type: jsPsych.plugins.parameterType.BOOLEAN, // weather is a boolean, true is weather trial, false is no weather (practice)
        default_value: false
      },
      trial_type: {
        type: jsPsych.plugins.parameterType.INT, // cloud type (0=certain reward, 1=uncertain, 2=certain punishment)
        default_value: 0
      },
      outcome: {
        type: jsPsych.plugins.parameterType.INT, // outcome (0=reward, 1=punishment)
        default_value: 0
      },
      time: {
        type: jsPsych.plugins.parameterType.INT, // time between cue onset and event (ms)
        default_value: 10000
      },
      tracker: {
        type: jsPsych.plugins.parameterType.BOOLEAN, // weather is a boolean, true is weather trial, false is no weather (practice)
        default_value: false
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    // snap plugin for circle path
    Snap.plugin( function( Snap, Element, Paper, global ) {
            Paper.prototype.arcPath = function(cx,cy,r) {
            var p = "M" + (cx-r) + "," + cy;
            p += "a" + -r + "," + -r + " 0 1,1 " + (r*2) +",0";
            return this.path(p, cx, cy );

                    };
    });

    var weather_shown = false;
    var tracker = trial.tracker
    var start_time = Date.now();

		var w = window.innerWidth;
		var h = window.innerHeight;

    display_element. innerHTML = '';
    display_element.innerHTML = "<svg style='overflow:hidden;' id='jspsych-snap-canvas' width=" + w + " height=" + h + "></svg></head>";

    var paper = Snap('#jspsych-snap-canvas');


		var coords = [];
    var over

    if(tracker){
      // averageing function
      const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
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
      // create a custom event for incoming eye data
      var eyeEvent = new CustomEvent("newEyeData");
      function eyeListener(){
          if(eye.x.length > 5 && Snap.getElementByPoint(arrAvg(eye.x.slice(-5)), arrAvg(eye.y.slice(-5)))){
            over = Snap.getElementByPoint(arrAvg(eye.x.slice(-5)), arrAvg(eye.y.slice(-5))).attr('group_id')
            //console.log(over)
          }else{
            over = 'nothing'
          }
          switch (over) {
            case 'plane':
              if(in_plane==false){
                plane_group.eyeover()
              }
              if(weather_shown){
                theWeather.remove();
                weather_shown = false;
              }
              break;
            case 'cue':
              if(in_plane){
                plane_group.eyeout()
              }
              if(weather_shown==false||theWeather.removed){
                showWeather(trial.outcome)
              }
              break;
            default:
              if(in_plane){
                plane_group.eyeout()
              }
              if(weather_shown){
                theWeather.remove();
                console.log(theWeather)
                weather_shown = false;
              }
          }

          coords.push({x: eye.x.slice(-1), y: eye.y.slice(-1), time: Date.now()-start_time, over: over})

      }
      window.addEventListener("newEyeData", eyeListener)
      // eye data
    }else{
      function mouseListener(e){
        if(Snap.getElementByPoint(e.clientX, e.clientY)){
          over = Snap.getElementByPoint(e.clientX, e.clientY).attr('group_id')
        }else{
          over = 'nothing'
        }
        coords.push({x: e.clientX, y: e.clientY, time: Date.now()-start_time, over: over})
      };
      window.addEventListener('mousemove', mouseListener)
    }


// 		window.onmousemove = function(e){
//   			var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
//   			console.log(pageCoords);
// 		};


		var in_plane = false;

			// create and draw the hills
		var background = paper.rect(0,0,w,h).attr({fill: "#d5f4e6"})
		var hills = paper.g();
		var hill_dims = [];
		var runway = [];
		var cloud, theWeather, cloudBox;

		for (i=0;i<1000;i++){
				hill_dims[i] = new Object()
				hill_dims[i].height = Math.floor(Math.random()*50)+70
				hill_dims[i].width = Math.floor(Math.random()*50)+100
				if(i==0){
					hill_dims[i].x = 0
				}else{hill_dims[i].x = Number(hill_dims[i-1].x)+Number(hill_dims[i].width)}
		}

		var hill_dims = jsPsych.randomization.repeat(hill_dims, 1)
		for (i=0;i<1000;i++){
				hills.add(paper.ellipse(hill_dims[i].x, h, hill_dims[i].width, hill_dims[i].height).attr({fill: ["#31b314","#8fda7f","#62e545","#50df30","#4bbd32","#adf29e"][Math.floor(Math.random()*6)], group_id: 'hills'}))
		}

			runway[0] = paper.rect(0,h-50, w*1.5, 50).attr({fill:"#CACACA"})
			runway[1] = paper.line(0,h-25,w*1.5,h-25).attr({stroke:'white', strokeWidth: 5, strokeDasharray:20})
			hills.add(runway[0],runway[1])

			var translate = w
			animate_hills = function(speed){
				if(speed>0){
					translate = translate + speed
					hills.stop().animate(
						{transform:'t-'+translate+',0'},
						100, function(){animate_hills(speed)})
				}else{hills.stop()}
			}


			var plane = paper.image("img/plane.png", w/2-125, h-125, 250, 200)
			var plane_group = paper.g()
			var vapour = [];
			var bubble = [];
			var rainbow = ["#ff3352","#f9d814","#7ae576","#7fa0fb","#ae86d8"]
      var dull_rainbow = ["#f5b7b1","#f9e79f","#a9dfbf","#aed6f1","#d7bde2"]
      var greyscale = ["#c8b8b8", "#8b8a8a","#ababab","#6f6b6b", "#564d4d"]
			var rand_xysize = [[10, 0, -20, 10, -20],[0, -30, -10, 15, 10],[20, 25, 30, 20, 15]]
			var speed = 0
			//var speed_func = function(){if(speed>0){return 10000/speed}}

			var bubble_animation = function(){
					this.animate({r:this.attr('maxsize')}, Math.random()*100+200, function(){
					   this.animate({r:this.attr('minsize')}, Math.random()*100+200, bubble_animation)
          })
			}

			for(var i=0; i<5; i++){
				vapour[i] = paper.line(plane.getBBox().x+100, plane.getBBox().cy-30+i*10, plane.getBBox().x-60, plane.getBBox().cy-30+i*10).attr({strokeWidth:10, stroke: rainbow[i]})
				bubble[i] = paper.circle(plane.getBBox().x-60+rand_xysize[0][i], plane.getBBox().cy+rand_xysize[1][i], rand_xysize[2][i]).attr({fill: rainbow[i], minsize: rand_xysize[2][i]-10, maxsize: rand_xysize[2][i]+10}).animate({r:rand_xysize[2][i]},0,bubble_animation)
      }

      var overbox = paper.rect(plane.getBBox().x-100, plane.getBBox().y-100, 450, 400).attr({fillOpacity:0, group_id: 'plane'})

      var changeColours = function(palette){
        for (var i = 0; i < 5; i++){
          vapour[i].attr({stroke: palette[i]})
          bubble[i].attr({fill: palette[i]})
        }
      }

			plane_group.add(vapour)
			bubble_group = paper.g()
			bubble_group.add(bubble)
			plane_group.add(bubble_group)
			plane_group.add(plane)
      plane_group.add(overbox)
      plane_group.eyeover = function(){}
      plane_group.eyeout = function(){}

      var count_plane = function(data){
        return data.over == 'plane'
      }

      var takeoff = function(){
        changeColours(dull_rainbow)
        speed = 40
        hills.animate({transform:'t-'+w*0.5+',0'},
        2000, mina.easeout, function(){
          plane_group.animate({transform: 'T0,-300'}, 2000, mina.easeout)
          hills.animate(
            {transform:'t-'+w+',0'},
            1500, function(){
              animate_hills(speed)
            })
        })
        setTimeout(function(){
          timer_start = Date.now();
          if(tracker){
            plane_group.eyeover = inFunc
            plane_group.eyeout = outFunc
          }else{
            plane_group.mouseover(inFunc)
            plane_group.mouseout(outFunc)
          }
        }, 3500)
      }

      var landing = function(){
        changeColours(dull_rainbow)
        speed = 40
        animate_hills(speed)
        paper.append(runway[0])
        paper.append(runway[1])
        runway[1].attr({x2:w*3})
        runway[1].animate(
          {transform: 't-'+w+',0'},
          2500)
        paper.append(plane_group)
        plane_group.animate({transform: 'T0,0'}, 2000, mina.easeout)
        setTimeout(function(){
          animate_hills(0)
          paper.selectAll("circle").forEach(function(elem){elem.stop();});
          setTimeout(function(){
            var arcs = [];
            for(var i=0; i<5; i++){
              paper.circle(w/2, h, 800-i*100).attr({fill:rainbow[i]})
              arcs[i] = paper.arcPath(w/2, h, (700-i*100+30)).attr({fillOpacity:0})
            }
            if(tracker){
              socket.emit('tracker_msg', 'tracker_off')
              window.removeEventListener("newEyeData", eyeListener, false);
            }else{
              window.removeEventListener('mousemove', mouseListener, false);
            }

            paper.circle(w/2, h, 300).attr({fill: "#d5f4e6"})
            paper.text(0, h-200, "Great job! Your steady flight score is "+Math.floor(coords.filter(count_plane).length/coords.length*1000)+" points").attr({"text-anchor": "center", "font-size": 40, "font-family": "Montserrat", 'textpath': arcs[0], 'text-anchor':'middle'}).textPath.animate({"startOffset":arcs[0].getTotalLength()/2},0)
            if(trial.weather){
              paper.text(0, h-200, "Weather encountered: "+["wind", "lightning"][trial.outcome]+[" + 100", " - 100"][trial.outcome]+" points").attr({"font-size": 40, "font-family": "Montserrat", 'textpath': arcs[1], 'text-anchor':'middle'}).textPath.animate({"startOffset":arcs[1].getTotalLength()/2},0)
              paper.text(0, h-200, "Total score: "+(Math.floor(coords.filter(count_plane).length/coords.length*1000)+[100, -100][trial.outcome])+" points").attr({"font-size": 40, "font-family": "Montserrat", 'textpath': arcs[2], 'text-anchor':'middle'}).textPath.animate({"startOffset":arcs[2].getTotalLength()/2},0)
              paper.text(0, h-200, "Click the plane to start the next flight").attr({"font-size": 40, "font-family": "Montserrat", 'textpath': arcs[4], 'text-anchor':'middle'}).textPath.animate({"startOffset":arcs[4].getTotalLength()/2},0)
            }else{
              paper.text(0, h-200, "Total score: "+Math.floor(coords.filter(count_plane).length/coords.length*1000)+" points").attr({"font-size": 40, "font-family": "Montserrat", 'textpath': arcs[2],'text-anchor':'middle'}).textPath.animate({"startOffset":arcs[2].getTotalLength()/2},0)
              paper.text(0, h-200, "Click the plane to continue").attr({"font-size": 40, "font-family": "Montserrat", 'textpath': arcs[4], 'text-anchor':'middle'}).textPath.animate({"startOffset":arcs[4].getTotalLength()/2},0)
            }
            paper.append(hills)
            paper.append(runway[0])
            paper.append(runway[1])
            paper.append(plane_group)
            plane_group.click(end_trial)
        }, 500)
      }, 2500)
      }


      showWeather = function(outcome){
        console.log('show')
        weather_shown = true;
        theWeather = paper.image(["img/wind.png","img/lightning.png"][outcome], w-275, 200, 100, 100)
        if(tracker){
          theWeather.attr({group_id:'cue'})
        }else{
          theWeather.attr({pointerEvents:'none'})
        }
      }

      inFunc = function(){
          in_plane = true
          //var in_time = Date.now()-timer_start
          changeColours(dull_rainbow)
					speed = 40
					animate_hills(speed)
				}
			outFunc = function(){
          in_plane = false
          changeColours(greyscale)
					speed = 10
					animate_hills(speed)
			}

      end_trial = function(time){
        setTimeout(function(){
              paper.clear()
              jsPsych.finishTrial()
            },time)
      }

			weather =function(type, outcome, time){
					cloud = paper.image(["img/cloud1.png", "img/cloud2.png", "img/cloud3.png"][type], w-350, 150, 250, 200).attr({group_id: 'cue'})
          cloudBox = paper.rect(w-400, 100, 350, 300).attr({fillOpacity: 0, group_id: 'cue'})
          if(!tracker){
            cloudBox.mouseover(showWeather).mouseout(function(){theWeather.remove()})
            cloud.mouseover(showWeather).mouseout(function(){theWeather.remove()})
          }

        setTimeout(function(){
          if(tracker){
            plane_group.eyeover = function(){}
            plane_group.eyeout = function(){}
          }else{
            plane_group.unmouseover();
            plane_group.unmouseout();
          }
					cloud.remove()
					if(weather_shown){theWeather.remove()}
					background.attr({fill:["#FFFFFF","#EFADFF","#666466"][type]})

					cloud1 = paper.image(["img/cloud1.png", "img/cloud2.png", "img/cloud3.png"][type], w/2-200, 100, 500, 400)
					cloud2 = paper.image(["img/cloud1.png", "img/cloud2.png", "img/cloud3.png"][type], w-500, 300, 500, 400)
					cloud3 = paper.image(["img/cloud1.png", "img/cloud2.png", "img/cloud3.png"][type], 100, 300, 500, 400)
					cloud4 = paper.image(["img/cloud1.png", "img/cloud2.png", "img/cloud3.png"][type], w-500, 0, 500, 400)
					cloud5 = paper.image(["img/cloud1.png", "img/cloud2.png", "img/cloud3.png"][type], 100, 0, 500, 400)
					theWeather1 = paper.image(["img/wind.png","img/lightning.png"][outcome], w-300, 400, 250, 200)
					theWeather2 = paper.image(["img/wind.png","img/lightning.png"][outcome], 200, 400, 250, 200)
					var weather_img = paper.g(cloud4, cloud5, cloud1, cloud2, cloud3, theWeather1, theWeather2)
					speed = [60, 20][outcome]
          changeColours([rainbow,greyscale][outcome])
					animate_hills(speed)
					paper.append(plane_group)
					setTimeout(function(){
            background.attr({fill:"#d5f4e6"})
            weather_img.remove()
            landing();
          }, 2000)}, time)
			}


      takeoff()
      if (trial.weather){
        setTimeout(function(){
          weather(trial.trial_type,trial.outcome,trial.time)
        },5000)
      }else{
        setTimeout(function(){
          landing()
        },10000)
      }


  };

  return plugin;
})();
