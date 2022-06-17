var likert_scale_MASQ = [
    "Not At All",
    "A Little Bit",
    "Moderately",
    "Quite A Bit",
    "Extremely"
  ];
  
  var MASQ_survey = {
    type: jsPsychSurveyLikert,
     preamble: "<h1>Mini-MASQ </h1><div>Below is a list of feelings, sensations, problems, and experiences that people sometimes have. Read each item and then fill in the blank with the number that best describes how much you have felt or experienced things this way during <strong>the past week, including today.</strong></div>",
    questions: [
      {prompt: "Felt really happy", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt tense or “high strung”", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt depressed", labels: likert_scale_MASQ, required: true},
      {prompt: "Was short of breath", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt withdrawn from other people", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt dizzy or lightheaded ", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt hopeless", labels: likert_scale_MASQ, required: true},
      {prompt: "Hands were cold or sweaty", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like I had a lot to look forward to", labels: likert_scale_MASQ, required: true},
      {prompt: "Hands were shaky", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like nothing was very enjoyable", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt keyed up, “on edge”", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt worthless", labels: likert_scale_MASQ, required: true},
      {prompt: "Had trouble swallowing", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like I had a lot of interesting things to do", labels: likert_scale_MASQ, required: true},
      {prompt: "Had hot or cold spells", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like a failure", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like I was choking", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt really lively, “up”", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt uneasy", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt discouraged", labels: likert_scale_MASQ, required: true},
      {prompt: "Muscles twitched or trembled", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like I had a lot of energy", labels: likert_scale_MASQ, required: true},
      {prompt: "Was trembling or shaking", labels: likert_scale_MASQ, required: true},
      {prompt: "Felt like I was having a lot of fun", labels: likert_scale_MASQ, required: true},
      {prompt: "Had a very dry mouth", labels: likert_scale_MASQ, required: true},
    ],
    randomize_question_order: false
  };