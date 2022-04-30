var likert_scale_IUS = [
    "Not at all characteristic of me",
    " ",
    "Somewhat characteristic of me",
    " ",
    "Entirely characteristic of me"
  ];
  
  var IUS_survey = {
    type: jsPsychSurveyLikert,
     preamble: "<h1>IUS</h1><div>You will find below a series of statements which describe how people may react to the uncertainties of life. Please use the scale below to describe to what extent each item is characteristic of you.</div>",
    questions: [
      {prompt: "Uncertainty stops me from having a firm opinion.", labels: likert_scale_IUS, required: true},
      {prompt: " Being uncertain means that a person is disorganized.", labels: likert_scale_IUS, required: true},
      {prompt: "Uncertainty makes life intolerable", labels: likert_scale_IUS, required: true},
      {prompt: "It's unfair not having any guarantees in life.", labels: likert_scale_IUS, required: true},
      {prompt: "My mind can't be relaxed if I don't know what will happen tomorrow.", labels: likert_scale_IUS, required: true},
      {prompt: "Uncertainty makes me uneasy, anxious, or stressed.", labels: likert_scale_IUS, required: true},
      {prompt: "Unforeseen events upset me greatly.", labels: likert_scale_IUS, required: true},
      {prompt: "It frustrates me not having all the information I need.", labels: likert_scale_IUS, required: true},
      {prompt: "Uncertainty keeps me from living a full life.", labels: likert_scale_IUS, required: true},
      {prompt: "One should always look ahead so as to avoid surprises.", labels: likert_scale_IUS, required: true},
      {prompt: "A small unforeseen event can spoil everything, even with the best of planning.", labels: likert_scale_IUS, required: true},
      {prompt: "When it's time to act, uncertainty paralyses me.", labels: likert_scale_IUS, required: true},
      {prompt: "Being uncertain means that I am not first rate.", labels: likert_scale_IUS, required: true},
      {prompt: "When I am uncertain, I can't go forward.", labels: likert_scale_IUS, required: true},
      {prompt: "When I am uncertain I can't function very well.", labels: likert_scale_IUS, required: true},
      {prompt: "Unlike me, others always seem to know where they are going with their lives.", labels: likert_scale_IUS, required: true},
      {prompt: "Uncertainty makes me vulnerable, unhappy, or sad.", labels: likert_scale_IUS, required: true},
      {prompt: "I always want to know what the future has in store for me.", labels: likert_scale_IUS, required: true},
      {prompt: "I can't stand being taken by surprise.", labels: likert_scale_IUS, required: true},
      {prompt: "The smallest doubt can stop me from acting.", labels: likert_scale_IUS, required: true},
      {prompt: "I should be able to organize everything in advance.", labels: likert_scale_IUS, required: true},
      {prompt: "Being uncertain means that I lack confidence.", labels: likert_scale_IUS, required: true},
      {prompt: "I think it's unfair that other people seem sure about their future.", labels: likert_scale_IUS, required: true},
      {prompt: "Uncertainty keeps me from sleeping soundly.", labels: likert_scale_IUS, required: true},
      {prompt: "I must get away from all uncertain situations.", labels: likert_scale_IUS, required: true},
      {prompt: "The ambiguities in life stress me.", labels: likert_scale_IUS, required: true},
      {prompt: "I can't stand being undecided about my future.", labels: likert_scale_IUS, required: true},
    ],
    randomize_question_order: false
  };