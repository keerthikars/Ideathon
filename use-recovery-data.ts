import { useState, useEffect } from 'react';
import { DailyEntry, UserProfile, JournalEntry, Reminder, BabyProfile, MemoryNote } from '@shared/schema';
import { storage } from '@/lib/storage';
import { format, differenceInDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export function useRecoveryData() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [babyProfile, setBabyProfile] = useState<BabyProfile | null>(null);
  const [memoryNotes, setMemoryNotes] = useState<MemoryNote[]>([]);

  // Load data on mount
  useEffect(() => {
    setUserProfile(storage.getUserProfile());
    setDailyEntries(storage.getDailyEntries());
    setJournalEntries(storage.getJournalEntries());
    setReminders(storage.getReminders());
    setBabyProfile(storage.getBabyProfile());
    setMemoryNotes(storage.getMemoryNotes());
  }, []);

  // User profile helpers
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...updates };
    storage.setUserProfile(updated);
    setUserProfile(updated);
  };

  const getDaysSinceDelivery = (): number => {
    if (!userProfile?.deliveryDate) return 0;
    return differenceInDays(new Date(), new Date(userProfile.deliveryDate));
  };

  // Daily entry helpers
  const getTodayEntry = (): DailyEntry | null => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return storage.getDailyEntry(today);
  };

  const addOrUpdateDailyEntry = (entry: DailyEntry) => {
    storage.addDailyEntry(entry);
    setDailyEntries(storage.getDailyEntries());
  };

  // Weekly progress helpers
  const getWeeklyProgress = () => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    
    const weekEntries = dailyEntries.filter(entry => 
      isWithinInterval(new Date(entry.date), { start: weekStart, end: weekEnd })
    );

    const totalDays = 7;
    const loggedDays = weekEntries.length;
    const selfCareDays = weekEntries.filter(entry => 
      entry.babyCare.diaper && entry.babyCare.feeding
    ).length;
    const wellnessDays = weekEntries.filter(entry => 
      entry.mood.mood !== 'very-sad' && entry.pain.level <= 5
    ).length;

    return {
      dailyLogs: { completed: loggedDays, total: totalDays },
      selfCare: { completed: selfCareDays, total: totalDays },
      wellness: { completed: wellnessDays, total: totalDays },
    };
  };

  // Journal helpers
  const addJournalEntry = (entry: JournalEntry) => {
    storage.addJournalEntry(entry);
    setJournalEntries(storage.getJournalEntries());
  };

  const updateJournalEntry = (id: string, updates: Partial<JournalEntry>) => {
    storage.updateJournalEntry(id, updates);
    setJournalEntries(storage.getJournalEntries());
  };

  const deleteJournalEntry = (id: string) => {
    storage.deleteJournalEntry(id);
    setJournalEntries(storage.getJournalEntries());
  };

  // Reminder helpers
  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    storage.updateReminder(id, updates);
    setReminders(storage.getReminders());
  };

  const getActiveReminders = (): Reminder[] => {
    return reminders.filter(r => r.enabled);
  };

  // Memory note helpers
  const addMemoryNote = (note: MemoryNote) => {
    storage.addMemoryNote(note);
    setMemoryNotes(storage.getMemoryNotes());
  };

  const updateMemoryNote = (id: string, updates: Partial<MemoryNote>) => {
    storage.updateMemoryNote(id, updates);
    setMemoryNotes(storage.getMemoryNotes());
  };

  const deleteMemoryNote = (id: string) => {
    storage.deleteMemoryNote(id);
    setMemoryNotes(storage.getMemoryNotes());
  };

  const getUrgentNotes = (): MemoryNote[] => {
    return memoryNotes.filter(note => 
      note.priority === 'high' && !note.completed
    );
  };

  // Baby profile helpers
  const updateBabyProfile = (updates: Partial<BabyProfile>) => {
    if (!babyProfile) return;
    const updated = { ...babyProfile, ...updates };
    storage.setBabyProfile(updated);
    setBabyProfile(updated);
  };

  return {
    // State
    userProfile,
    dailyEntries,
    journalEntries,
    reminders,
    babyProfile,
    memoryNotes,
    
    // User profile
    updateUserProfile,
    getDaysSinceDelivery,
    
    // Daily tracking
    getTodayEntry,
    addOrUpdateDailyEntry,
    getWeeklyProgress,
    
    // Journal
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    
    // Reminders
    updateReminder,
    getActiveReminders,
    
    // Memory notes
    addMemoryNote,
    updateMemoryNote,
    deleteMemoryNote,
    getUrgentNotes,
    
    // Baby profile
    updateBabyProfile,
  };
}
