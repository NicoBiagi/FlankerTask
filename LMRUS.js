var likert_scale_second_questionnaire = [
    "Not at all characteristic of me",
    "A little characteristic of me",
    "Somewhat characteristic of me",
    "Very characteristic of me",
    "Entirely characteristic of me"
  ];
  
  var LMRUS_survey = {
    type: jsPsychSurveyLikert,
     preamble: "<h1>IUS</h1><div>You will find below a series of statements which describe how people may react to the uncertainties of life. Please use the scale below to describe to what extent each item is characteristic of you.</div>",
    questions: [
      {prompt: "Unforeseen events are exciting", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "I like it when information is missing", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "I like surprises", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "Unforeseen events do not spoil my plans", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "I like not knowing what the future has in store for me", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "I embrace all uncertain situations", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "Uncertainty makes me feel happy or excited	", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "Uncertainty motivates me", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "I find certainty boring", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "Uncertainty does not stop me from having fun", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "Uncertainty does not stop me from feeling good", labels: likert_scale_second_questionnaire, required: true},
      {prompt: "I will still try a new activity, even if I am unsure whether I will like it or not", labels: likert_scale_second_questionnaire, required: true},
    ],
    randomize_question_order: false
  };