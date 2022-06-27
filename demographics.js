var demographics_text = {
    type: jsPsychSurveyText,
    questions: [
      {prompt: 'What is your date of birth?', name: 'DOB', placeholder: 'mm/dd/yyyy'},
      {prompt: 'Sex:', name: 'Sex'},
      {prompt: 'Ethnicity:', name: 'Ethnicity'},
      {prompt: 'Nationality:', name: 'Nationality'},
      {prompt: 'English Language Fluency:', name: 'EnglishLevel'},
      {prompt: 'Sexual Orientation:', name: 'SexualOrientation'},
    ]
};

var demographics_choice = {
    type: jsPsychSurveyMultiChoice,
    questions: [

      {
        prompt: 'Are you currently taking any medication?',
        name: 'TakingMedication', 
        options: ['Yes', 'No'],

      },
      {
        prompt: 'Do you currently take any contraceptives (i.e. via pill, implant, coil etc)?',
        name: 'TakingContraceptives', 
      options: ['Yes', 'No'],

      },
      {
        prompt: 'Have you had any caffeine today?  ',
        name: 'Caffeine', 
      options: ['Yes', 'No'],

      },
      {
        prompt: 'Have you smoked today?  ',
        name: 'Smoking', 
      options: ['Yes', 'No'],

      },

    ]
  };