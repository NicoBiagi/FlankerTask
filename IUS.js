var likert_scale_IUS = [
  "Not at all characteristic of me",
  "A little characteristic of me",
  "Somewhat characteristic of me",
  "Very characteristic of me",
  "Entirely characteristic of me"
  ];
  
  var IUS_survey = {
    type: jsPsychSurveyLikert,
     preamble: "<h1>IUS</h1><div>You will find below a series of statements which describe how people may react to the uncertainties of life. Please use the scale below to describe to what extent each item is characteristic of you.</div>",
    questions: [
      {prompt: "Unforeseen events upset me greatly.", labels: likert_scale_IUS, required: true},
      {prompt: "It frustrates me not having all the information I need.", labels: likert_scale_IUS, required: true},
      {prompt: "Uncertainty keeps me from living a full life.", labels: likert_scale_IUS, required: true},
      {prompt: "One should always look ahead so as to avoid surprises.", labels: likert_scale_IUS, required: true},
      {prompt: "A small unforeseen event can spoil everything, even with the best of planning.", labels: likert_scale_IUS, required: true},
      {prompt: "When it’s time to act, uncertainty paralyses me.", labels: likert_scale_IUS, required: true},
      {prompt: "When I am uncertain I can’t function very well.", labels: likert_scale_IUS, required: true},
      {prompt: "I always want to know what the future has in store for me.", labels: likert_scale_IUS, required: true},
      {prompt: "I can’t stand being taken by surprise.", labels: likert_scale_IUS, required: true},
      {prompt: "The smallest doubt can stop me from acting.", labels: likert_scale_IUS, required: true},
      {prompt: "I should be able to organize everything in advance.", labels: likert_scale_IUS, required: true},
      {prompt: "I must get away from all uncertain situations.", labels: likert_scale_IUS, required: true},
    ],
    randomize_question_order: false
  };