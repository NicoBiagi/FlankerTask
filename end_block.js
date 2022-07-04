var valence_scale = [
    "Negative 1", 
    "2", 
    "3", 
    "4", 
    "5",
    "6",
    "7",
    "8",
    "Positive 9"
  ];

var arousal_scale = [
  "Calm 1", 
  "2", 
  "3", 
  "4", 
  "5",
  "6",
  "7",
  "8",
  "Excited 9"
  ];
  

var end_questions = {
    type: jsPsychSurveyLikert,
    questions: [
      {prompt: "How did you feel during the last block of trials?", name: 'Valence', labels: valence_scale, required: true},
      {prompt: "How did you feel during the last block of trials?", name: 'Arousal', labels: arousal_scale, required: true},
    ],
    randomize_question_order: false
};

var emotion_scale =[
  "1", 
  "2", 
  "3", 
  "4", 
  "5",
  "6",
  "7",
  "8",
  "9"
];

var emotions_questions ={
    type: jsPsychSurveyLikert,
    questions: [
      {prompt: "Use the scale below to indicate how <strong>excited</strong> you are", name: 'Excited', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>enthusiastic</strong> you are", name: 'Enthusiastic', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>happy</strong> you are", name: 'Happy', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>joyful</strong> you are", name: 'Joyful', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>sad</strong> you are", name: 'Sad', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>upset</strong> you are", name: 'Upset', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>angry</strong> you are", name: 'Angry', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>frustrated</strong> you are", name: 'Frustrated', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>fearful</strong> you are", name: 'Fearful', labels: emotion_scale, required: true},
      {prompt: "Use the scale below to indicate how <strong>anxious</strong> you are", name: 'Anxious', labels: emotion_scale, required: true},
    ],
    randomize_question_order: false
}