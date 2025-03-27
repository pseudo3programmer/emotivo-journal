
import React from 'react';

interface EmotionBackgroundImageProps {
  emotion: string;
  className?: string;
}

const EmotionBackgroundImage: React.FC<EmotionBackgroundImageProps> = ({ emotion, className = '' }) => {
  // Define image paths for each emotion with correct path
  const emotionImages: Record<string, string> = {
    joy: './emotions/joy.jpg',
    sadness: './emotions/sadness.jpg',
    anger: './emotions/anger.jpg',
    fear: './emotions/fear.jpg',
    surprise: './emotions/surprise.jpg',
    neutral: './emotions/neutral.jpg'
  };

  // Define artistic styles for each emotion with enhanced visual effects
  const emotionStyles: Record<string, string> = {
    joy: 'after:bg-joy/30 after:backdrop-blur-sm after:bg-gradient-to-br',
    sadness: 'after:bg-sadness/30 after:backdrop-blur-sm after:bg-gradient-to-t',
    anger: 'after:bg-anger/30 after:backdrop-blur-sm after:bg-gradient-to-r',
    fear: 'after:bg-fear/30 after:backdrop-blur-sm after:bg-gradient-to-bl',
    surprise: 'after:bg-surprise/30 after:backdrop-blur-sm after:bg-gradient-to-tr',
    neutral: 'after:bg-neutral/30 after:backdrop-blur-sm after:bg-gradient-to-b'
  };

  // Default to neutral if emotion isn't found
  const imagePath = emotionImages[emotion.toLowerCase()] || emotionImages.neutral;
  const emotionStyle = emotionStyles[emotion.toLowerCase()] || emotionStyles.neutral;

  return (
    <div 
      className={`absolute inset-0 overflow-hidden rounded-lg shadow-md transition-all duration-300 ${className}`}
    >
      <div className={`absolute inset-0 -z-10 ${emotionStyle} after:absolute after:inset-0 after:opacity-50`}></div>
      <img 
        src={imagePath} 
        alt={`${emotion} mood background`} 
        className="w-full h-full object-cover opacity-20 -z-20 transition-opacity duration-500"
        onError={(e) => {
          console.error(`Failed to load image: ${imagePath}`);
          e.currentTarget.src = './emotions/neutral.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-black/50 -z-10"></div>
      
      {/* Add subtle brushstroke pattern overlay for artistic effect */}
      <div className="absolute inset-0 bg-brushstroke opacity-10 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default EmotionBackgroundImage;
