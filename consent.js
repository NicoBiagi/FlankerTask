var consent = {
    type: jsPsychSurveyHtmlForm,
    html:
    '<div style="text-align: centre;">'+
    "<p>CONSENT FORM</p>"+
    "<p>Please use tick box after each statement to confirm it has been read and agreed to.</p>"+
    '</div>'+
    '<div style="text-align: left; width:80%; margin:auto;">'+
    '<div style="">'+

      '<input type="checkbox" id="consent1" name="consent1" required>'+
        '<label for="consent1"> I have read the accompanying Information Sheet relating to the project on ‘Individual differences in affective responses’.</label><br><br>'+
      '<input type="checkbox" id="consent2" name="consent2" required>'+
        '<label for="consent2">I understand the purposes of the project and what will be required of me, and any questions I have had have been answered to my satisfaction. I agree to the arrangements described in the Information Sheet in so far as they relate to my participation.</label><br><br>'+
      '<input type="checkbox" id="consent3" name="consent3" required>'+
        '<label for="consent3">I understand what information will be collected about me, what it will be used for, who it may be shared with, how it will be kept safe, and my rights in relation to my data.</label><br><br>'+
      '<input type="checkbox" id="consent4" name="consent4" required>'+
        '<label for="consent4">I understand that participation is entirely voluntary and that I have the right to withdraw from the project any time, and that this will be without detriment.</label><br><br>'+
      '<input type="checkbox" id="consent5" name="consent5" required>'+
        '<label for="consent5">I understand that the data collected from me in this study will be preserved and made available in anonymised form, so that they can be consulted and re-used by others.</label><br><br>'+
      '<input type="checkbox" id="consent6" name="consent6" required>'+
        '<label for="consent6">I understand that the data collected from me in this study will be preserved, and subject to safeguards will be made available to other authenticated researchers.</label><br><br>'+
      '<input type="checkbox" id="consent7" name="consent7" required>'+
        '<label for="consent7">This project has been reviewed by the University Research Ethics Committee and National Research Ethics committee where relevant, and has been given a favourable ethical opinion for conduct.</label><br><br>'+
      '<input type="checkbox" id="consent8" name="consent8" required>'+
        '<label for="consent8">I have received a copy of this Consent Form and of the accompanying Information Sheet.</label><br><br>'+
        '</div>'
  }