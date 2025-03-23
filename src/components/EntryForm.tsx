
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { analyzeEmotion } from '@/utils/emotionAnalyzer';
import EmotionAnalysis from './EmotionAnalysis';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, BookMarked } from 'lucide-react';

interface EntryFormProps {
  onSave: (entry: {
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
  }) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSave }) => {
  const [entryText, setEntryText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeEmotion> | null>(null);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntryText(e.target.value);
    // Clear analysis when text changes
    if (analysis) setAnalysis(null);
  };

  const handleAnalyze = () => {
    if (!entryText.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something to analyze.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      const result = analyzeEmotion(entryText);
      setAnalysis(result);
      setAnalyzing(false);
    }, 1000);
  };

  const handleSave = () => {
    if (!entryText.trim() || !analysis) {
      toast({
        title: "Cannot save entry",
        description: analysis ? "Please write something first." : "Please analyze your entry before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      const newEntry = {
        id: Date.now().toString(),
        text: entryText,
        date: new Date(),
        analysis: analysis
      };
      
      onSave(newEntry);
      
      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved.",
      });
      
      // Reset form
      setEntryText('');
      setAnalysis(null);
      setSaving(false);
      
      // Focus back on textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in transition-all duration-500">
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BookMarked className="mr-2 h-4 w-4" />
              <span>New Entry</span>
            </div>
          </div>
          
          <Textarea
            ref={textareaRef}
            placeholder="How are you feeling today?"
            className="min-h-[200px] border-none bg-transparent focus:ring-0 text-lg leading-relaxed"
            value={entryText}
            onChange={handleTextChange}
          />
          
          <div className="flex justify-between mt-6 space-x-4">
            <Button 
              variant="outline" 
              onClick={handleAnalyze} 
              disabled={!entryText.trim() || analyzing}
              className="w-full transition-all duration-300"
            >
              {analyzing ? "Analyzing..." : "Analyze Emotions"}
            </Button>
            
            <Button 
              onClick={handleSave} 
              disabled={!analysis || saving}
              className="w-full bg-accent hover:bg-accent/90 transition-all duration-300"
            >
              {saving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>
      </Card>

      {analysis && (
        <EmotionAnalysis
          primaryEmotion={analysis.primaryEmotion}
          scores={analysis.scores}
          summary={analysis.summary}
        />
      )}
    </div>
  );
};

export default EntryForm;
