import React, { useState, useEffect } from 'react';
import EntryCard from '@/components/EntryCard';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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

const API_BASE_URL = 'http://localhost:8080/api';

const Timeline = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load entries from backend
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/journal`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      
      const data = await response.json();
      
      // Convert date strings to Date objects
      const formattedEntries = data.map((entry: any) => ({
        ...entry,
        id: entry.id.toString(),
        date: new Date(entry.date)
      }));
      
      setEntries(formattedEntries);
      setFilteredEntries(formattedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast({
        title: "Error loading entries",
        description: "There was a problem loading your journal entries.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Search entries from backend
  const searchEntries = async (query: string) => {
    if (!query.trim()) {
      setFilteredEntries(entries);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/journal/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search entries');
      }
      
      const data = await response.json();
      
      // Convert date strings to Date objects
      const formattedEntries = data.map((entry: any) => ({
        ...entry,
        id: entry.id.toString(),
        date: new Date(entry.date)
      }));
      
      setFilteredEntries(formattedEntries);
    } catch (error) {
      console.error('Error searching entries:', error);
      toast({
        title: "Error searching entries",
        description: "There was a problem searching your journal entries.",
        variant: "destructive",
      });
    }
  };

  // Filter entries by emotion from backend
  const filterByEmotion = async (emotion: string | null) => {
    if (!emotion) {
      setFilteredEntries(entries);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/journal/emotion/${emotion}`);
      
      if (!response.ok) {
        throw new Error('Failed to filter entries');
      }
      
      const data = await response.json();
      
      // Convert date strings to Date objects
      const formattedEntries = data.map((entry: any) => ({
        ...entry,
        id: entry.id.toString(),
        date: new Date(entry.date)
      }));
      
      setFilteredEntries(formattedEntries);
    } catch (error) {
      console.error('Error filtering entries:', error);
      toast({
        title: "Error filtering entries",
        description: "There was a problem filtering your journal entries.",
        variant: "destructive",
      });
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchEntries(query);
  };

  // Handle emotion filter
  const handleFilterClick = (emotion: string) => {
    const newFilter = activeFilter === emotion ? null : emotion;
    setActiveFilter(newFilter);
    filterByEmotion(newFilter);
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
