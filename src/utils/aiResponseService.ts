
// This is a simple rule-based AI response generator
// In a production app, this would be replaced with a call to an actual AI API

interface EmotionResponse {
  [key: string]: string[];
}

const emotionResponses: EmotionResponse = {
  joy: [
    "I'm happy to see you're feeling joyful! What made you feel this way?",
    "It's wonderful to see such positive emotions in your entry. What contributed to this joy?",
    "Joy is such a beautiful emotion to experience. How can you carry this feeling forward?"
  ],
  sadness: [
    "I notice you're feeling sad. Remember that it's okay to feel this way, and emotions are temporary.",
    "I'm sorry you're experiencing sadness. Is there something specific that triggered this feeling?",
    "When we feel sad, it can help to focus on small acts of self-care. What might help you feel a bit better today?"
  ],
  anger: [
    "I can sense frustration in your entry. Taking deep breaths might help you process this anger.",
    "Anger often signals that a boundary has been crossed. Is there a way to address what upset you?",
    "When we're angry, it's important to express it in healthy ways. Have you tried journaling specifically about what made you angry?"
  ],
  fear: [
    "I notice feelings of fear in your entry. Remember that courage isn't the absence of fear, but moving forward despite it.",
    "Fear is a natural response to uncertainty. What small step could you take to address what's concerning you?",
    "It's okay to feel afraid sometimes. Would talking to someone you trust about this fear help you?"
  ],
  surprise: [
    "Life is full of unexpected moments! How has this surprise changed your perspective?",
    "Surprises keep life interesting, don't they? How are you adapting to this unexpected development?",
    "I notice you were surprised. Sometimes the unexpected can lead to new opportunities. What possibilities do you see?"
  ],
  neutral: [
    "I notice a sense of calm in your entry today. How are you maintaining this balanced state?",
    "Sometimes neutral emotions give us space to reflect. Is there anything you're contemplating right now?",
    "A neutral state can be a good time for planning and thinking clearly. Is there something you'd like to focus your energy on?"
  ]
};

const generalResponses = [
  "Thank you for sharing your thoughts with me today. How else can I support you?",
  "I appreciate your openness in this entry. Is there anything specific you'd like to explore further?",
  "Writing regularly can help process emotions. What patterns have you noticed in your journaling?",
  "Your self-reflection shows great emotional awareness. What have you learned about yourself from this entry?"
];

export function generateAIResponse(text: string, primaryEmotion: string): Promise<string> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Get emotion-specific responses
      const emotionSpecificResponses = emotionResponses[primaryEmotion.toLowerCase()] || emotionResponses.neutral;
      
      // Create a personalized response based on entry content and emotion
      let personalizedResponse = '';
      
      // Pick a random response from the emotion-specific array
      const randomEmotionResponse = emotionSpecificResponses[Math.floor(Math.random() * emotionSpecificResponses.length)];
      
      // Pick a random general response
      const randomGeneralResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      
      // Combine them into a multi-paragraph response
      personalizedResponse = `${randomEmotionResponse}\n\n${randomGeneralResponse}`;
      
      resolve(personalizedResponse);
    }, 1500); // Simulate processing time
  });
}
