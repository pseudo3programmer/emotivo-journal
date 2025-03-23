
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntryCardProps {
  id: string;
  text: string;
  date: Date;
  analysis: {
    primaryEmotion: string;
    scores: Array<{
      emotion: string;
      score: number;
    }>;
    summary: string;
  };
}

const EntryCard: React.FC<EntryCardProps> = ({ text, date, analysis }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  // Format time
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Truncate text for preview
  const truncatedText = text.length > 200 
    ? `${text.substring(0, 200)}...` 
    : text;
  
  return (
    <Card className={cn(
      "glass-card mb-4 transition-all duration-300 ease-out overflow-hidden",
      expanded ? "transform scale-[1.02]" : "",
      "hover:shadow-xl"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span 
              className={`emotion-dot emotion-dot-${analysis.primaryEmotion.toLowerCase()}`} 
              aria-hidden="true"
            />
            <span className="font-medium capitalize">{analysis.primaryEmotion}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-md leading-relaxed whitespace-pre-line">
          {expanded ? text : truncatedText}
        </p>
      </CardContent>
      
      {text.length > 200 && (
        <CardFooter className="pt-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Read more
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EntryCard;
