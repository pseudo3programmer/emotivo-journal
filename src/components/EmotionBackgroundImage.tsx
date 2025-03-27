
import React from 'react';

interface EmotionBackgroundImageProps {
  emotion: string;
  className?: string;
}

const EmotionBackgroundImage: React.FC<EmotionBackgroundImageProps> = ({ emotion, className = '' }) => {
  // Define image paths for each emotion
  const emotionImages: Record<string, string> = {
    joy: '/emotions/joy.jpg',
    sadness: '/emotions/sadness.jpg',
    anger: '/emotions/anger.jpg',
    fear: '/emotions/fear.jpg',
    surprise: '/emotions/surprise.jpg',
    neutral: '/emotions/neutral.jpg'
  };

  // Default to neutral if emotion isn't found
  const imagePath = emotionImages[emotion.toLowerCase()] || emotionImages.neutral;

  return (
    <div 
      className={`absolute inset-0 opacity-10 -z-10 overflow-hidden rounded-lg ${className}`}
    >
      <img 
        src={imagePath} 
        alt={`${emotion} mood background`} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent dark:from-black/30"></div>
    </div>
  );
};

export default EmotionBackgroundImage;
