
import React, { useEffect } from 'react';
import EntryForm from '@/components/EntryForm';
import NavigationBar from '@/components/NavigationBar';
import { useToast } from '@/components/ui/use-toast';
import { Paintbrush, Sparkles } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();

  // Handle saving entries (also save to localStorage for persistence)
  const handleSaveEntry = (entry: any) => {
    console.log('Entry saved successfully:', entry);
    
    // Save to localStorage for persistence
    const existingEntries = localStorage.getItem('mockJournalEntries');
    let entries = [];
    
    if (existingEntries) {
      entries = JSON.parse(existingEntries);
    }
    
    // Ensure date is stored properly
    const entryWithProperDate = {
      ...entry,
      // This will ensure the date is stored as a string that can be parsed back
      date: entry.date instanceof Date ? entry.date.toISOString() : entry.date
    };
    
    // Add the new entry to the array
    entries.push(entryWithProperDate);
    
    // Save back to localStorage
    localStorage.setItem('mockJournalEntries', JSON.stringify(entries));
    
    // Show success toast
    toast({
      title: "Entry saved successfully",
      description: "Your journal entry has been saved to the database.",
    });
  };

  // Welcome toast on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedEmotivoJournal');
    
    if (!hasVisited) {
      setTimeout(() => {
        toast({
          title: "Welcome to Emotivo Journal",
          description: "Express yourself, understand your emotions, and get AI-powered reflections on your entries.",
        });
        localStorage.setItem('hasVisitedEmotivoJournal', 'true');
      }, 1000);
    }
  }, [toast]);

  return (
    <div className="min-h-screen w-full pb-24 flex flex-col items-center bg-gradient-to-b from-background via-background/90 to-background/95">
      {/* Hero image section with enhanced artistic overlay */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden animate-fade-in">
        <img 
          src="./journal-hero.jpg" 
          alt="Peaceful journal writing scene" 
          className="w-full h-full object-cover opacity-85 transition-all duration-700 hover:scale-105"
          onError={(e) => {
            console.error('Failed to load hero image');
            e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background"></div>
        
        {/* Enhanced artistic overlay patterns */}
        <div className="absolute inset-0 bg-artistic-pattern opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-brushstroke opacity-15 mix-blend-soft-light"></div>
      </div>

      <header className="w-full py-8 text-center animate-slide-down relative z-10 -mt-24">
        <div className="inline-flex items-center justify-center space-x-2 mb-2">
          <Paintbrush className="h-6 w-6 text-artistic-primary" />
          <div className="h-px w-16 bg-artistic-primary/70"></div>
          <Sparkles className="h-5 w-5 text-artistic-secondary animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-wide text-gradient-primary">Emotivo Journal</h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto italic font-light">
          Capture moments, understand emotions, receive AI insights
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-artistic-primary/10 via-artistic-primary/60 to-artistic-primary/10"></div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-8 relative z-10">
        <div className="art-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <EntryForm onSave={handleSaveEntry} />
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Index;
