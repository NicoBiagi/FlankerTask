var consent = {
    type: jsPsychSurveyHtmlForm,
    preamble: "<img scr ='https://research.reading.ac.uk/centre-for-book-cultures-and-publishing/wp-content/themes/reading-research/img/logo-Reading.png'>"+
              "<h1>Consent form: Jayne's Study</h1><br>"+
              "<div style='text-align: left; width:80%; margin:auto;'><p>Thank you for supporting our project. On the next few pages you will be asked to answer a series of questions about yourself. In total it should take about 5-10 minutes to complete the questions. At the end of the questionnaire responses, you will begin the online game. You will need to complete both parts of the study together. Please do not close the browser window once you have started as your progress will be lost.</p>"+
              "<p>Many thanks,</p>"+
              "<p>Jayne</p>"+
              "<p><a href='mailto:j.e.morriss@reading.ac.uk'>(j.e.morriss@reading.ac.uk)</a><br><br></div>",
    html:
    '<div style="text-align: left; width:80%; margin:auto;">'+
    '<div style="">'+
      '<input type="checkbox" id="consent1" name="consent1" required>'+
        '<label for="consent1"> I agree to participate in this study being conducted by Nico Biagi, Dr Jayne Morriss, Professor Helen Dodd at the University of Reading.</label><br><br>'+
      '<input type="checkbox" id="consent2" name="consent2" required>'+
        '<label for="consent2"> I have seen and read a copy of the Information Sheet and have been given the opportunity to ask questions about the study and these have been answered to my satisfaction.  </label><br><br>'+
      '<input type="checkbox" id="consent3" name="consent3" required>'+
        '<label for="consent3"> I understand that all personal information will remain confidential to the project team and arrangements for the storage of any identifiable material have been made clear to me.  </label><br><br>'+
      '<input type="checkbox" id="consent4" name="consent4" required>'+
        '<label for="consent4"> I understand that this data will be stored against a number identifier on secure servers and password protected.  </label><br><br>'+
      '<input type="checkbox" id="consent5" name="consent5" required>'+
        '<label for="consent5"> I understand that de-identified data will be shared using a secure data repository service.</label><br><br>'+
      '<input type="checkbox" id="consent6" name="consent6" required>'+
        '<label for="consent6"> I understand that participation in this study is voluntary and that I can withdraw at any time without having to give an explanation.</label><br><br>'+
    '</div>'+
      '<div>As part of the game, your facial expressions will be recorded by your computer’s webcam. You will be instructed how to get this set up when you decide to start the computer game. By giving consent to participate, you are allowing us to view the video-recordings of the study. The video will remain on your computer until the end of the game and we won’t be able to see anything via your webcam until you upload the video. If at this point, you decide that you no longer want to share the video with us, then you can simply decline to upload the video file.</div><br>'+
    '<div style="text-align: left">'+
      '<input type="checkbox" id="consent7" name="consent7" required>'+
        '<label for="consent7"> I am happy to proceed with my participation and for the video to be viewed and stored by the research team as detailed above. </label><br><br>'+
        '</div>'+
      '<div>In addition, you can also authorise us to use the video for educational purposes, for example, to show to other scientists and students or for public sharing, for example, for the purpose of further scientific research or to go on our website. These additional levels of consent help us teach students and communicate our research to others, but they are optional. You will be asked if you wish to consent to these when you upload the video file after the game but there is absolutely no requirement to do so. Please let us know if you need further explanation about these levels or if you have any other questions.</div><br>'+
      '<img src="https://raw.githubusercontent.com/sociallearninglab/online_testing_materials/master/misc_files/online_consent_form_image.png"><br>'+
      '<div><i>This application has been reviewed by the University Research Ethics Committee and has been given a favourable ethical opinion for conduct. </i></div><br>'+
    '</div>'
  }