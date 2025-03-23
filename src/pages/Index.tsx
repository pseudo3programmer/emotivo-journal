
import React, { useEffect } from 'react';
import EntryForm from '@/components/EntryForm';
import NavigationBar from '@/components/NavigationBar';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  // Handle saving entries
  const handleSaveEntry = (entry: any) => {
    // We don't need to save to localStorage anymore since the entry is saved to the backend
    // Just display a success toast
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
          description: "Express yourself and understand your emotions better.",
        });
        localStorage.setItem('hasVisitedEmotivoJournal', 'true');
      }, 1000);
    }
  }, [toast]);

  return (
    <div className="min-h-screen w-full pb-24 flex flex-col items-center bg-gradient-to-b from-background to-background/95">
      <header className="w-full py-6 text-center animate-slide-down">
        <h1 className="text-3xl font-light tracking-tight">Emotivo Journal</h1>
        <p className="text-muted-foreground mt-1">Capture moments, understand emotions</p>
      </header>
      
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-8">
        <EntryForm onSave={handleSaveEntry} />
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Index;
