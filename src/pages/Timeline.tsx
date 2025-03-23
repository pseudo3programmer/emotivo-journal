
import React, { useState, useEffect } from 'react';
import EntryCard from '@/components/EntryCard';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, Filter } from 'lucide-react';

interface DiaryEntry {
  id: string;
  text: string;
  date: string | Date;
  analysis: {
    primaryEmotion: string;
    scores: Array<{
      emotion: string;
      score: number;
    }>;
    summary: string;
  };
}

const Timeline = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    
    // Convert date strings to Date objects
    const formattedEntries = savedEntries.map((entry: DiaryEntry) => ({
      ...entry,
      date: new Date(entry.date)
    }));
    
    setEntries(formattedEntries);
    setFilteredEntries(formattedEntries);
  }, []);

  // Filter entries based on search query and emotion filter
  useEffect(() => {
    let filtered = entries;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(entry => 
        entry.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply emotion filter
    if (activeFilter) {
      filtered = filtered.filter(entry => 
        entry.analysis.primaryEmotion.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    setFilteredEntries(filtered);
  }, [searchQuery, activeFilter, entries]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle emotion filter
  const handleFilterClick = (emotion: string) => {
    setActiveFilter(activeFilter === emotion ? null : emotion);
  };

  // Available emotions for filtering
  const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'neutral'];

  return (
    <div className="min-h-screen w-full pb-24 flex flex-col bg-gradient-to-b from-background to-background/95">
      <header className="w-full py-6 px-4 text-center animate-slide-down">
        <h1 className="text-3xl font-light tracking-tight">Timeline</h1>
        <p className="text-muted-foreground mt-1">Your emotional journey</p>
      </header>
      
      <div className="w-full max-w-lg mx-auto px-4 relative animate-fade-in">
        <div className="glass-card mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            
            {emotions.map(emotion => (
              <Button
                key={emotion}
                size="sm"
                variant={activeFilter === emotion ? "default" : "outline"}
                className={`rounded-full text-xs py-1 px-3 ${
                  activeFilter === emotion 
                    ? `bg-${emotion} text-white` 
                    : ""
                }`}
                onClick={() => handleFilterClick(emotion)}
              >
                <span 
                  className={`emotion-dot emotion-dot-${emotion}`} 
                  aria-hidden="true"
                />
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="flex-1 w-full max-w-lg mx-auto px-4">
        {filteredEntries.length > 0 ? (
          <div className="space-y-4 animate-fade-in">
            {filteredEntries.map(entry => (
              <EntryCard
                key={entry.id}
                id={entry.id}
                text={entry.text}
                date={entry.date as Date}
                analysis={entry.analysis}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-lg font-medium mb-2">No entries found</h3>
            <p className="text-muted-foreground">
              {entries.length === 0 
                ? "Start by adding your first journal entry"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Timeline;
