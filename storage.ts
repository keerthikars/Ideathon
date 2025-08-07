import { 
  UserProfile, 
  DailyEntry, 
  JournalEntry, 
  Reminder, 
  BabyProfile, 
  MemoryNote 
} from "@shared/schema";
import { STORAGE_KEYS } from "./constants";

class LocalStorage {
  private get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  }

  // User Profile
  getUserProfile(): UserProfile | null {
    return this.get<UserProfile>(STORAGE_KEYS.USER_PROFILE);
  }

  setUserProfile(profile: UserProfile): void {
    this.set(STORAGE_KEYS.USER_PROFILE, profile);
  }

  // Daily Entries
  getDailyEntries(): DailyEntry[] {
    return this.get<DailyEntry[]>(STORAGE_KEYS.DAILY_ENTRIES) || [];
  }

  addDailyEntry(entry: DailyEntry): void {
    const entries = this.getDailyEntries();
    const existingIndex = entries.findIndex(e => e.date === entry.date);
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    
    this.set(STORAGE_KEYS.DAILY_ENTRIES, entries);
  }

  getDailyEntry(date: string): DailyEntry | null {
    const entries = this.getDailyEntries();
    return entries.find(e => e.date === date) || null;
  }

  // Journal Entries
  getJournalEntries(): JournalEntry[] {
    return this.get<JournalEntry[]>(STORAGE_KEYS.JOURNAL_ENTRIES) || [];
  }

  addJournalEntry(entry: JournalEntry): void {
    const entries = this.getJournalEntries();
    entries.unshift(entry); // Add to beginning for reverse chronological order
    this.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
  }

  updateJournalEntry(id: string, updates: Partial<JournalEntry>): void {
    const entries = this.getJournalEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index >= 0) {
      entries[index] = { ...entries[index], ...updates };
      this.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
    }
  }

  deleteJournalEntry(id: string): void {
    const entries = this.getJournalEntries();
    const filtered = entries.filter(e => e.id !== id);
    this.set(STORAGE_KEYS.JOURNAL_ENTRIES, filtered);
  }

  // Reminders
  getReminders(): Reminder[] {
    return this.get<Reminder[]>(STORAGE_KEYS.REMINDERS) || [];
  }

  setReminders(reminders: Reminder[]): void {
    this.set(STORAGE_KEYS.REMINDERS, reminders);
  }

  updateReminder(id: string, updates: Partial<Reminder>): void {
    const reminders = this.getReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index >= 0) {
      reminders[index] = { ...reminders[index], ...updates };
      this.set(STORAGE_KEYS.REMINDERS, reminders);
    }
  }

  // Baby Profile
  getBabyProfile(): BabyProfile | null {
    return this.get<BabyProfile>(STORAGE_KEYS.BABY_PROFILE);
  }

  setBabyProfile(profile: BabyProfile): void {
    this.set(STORAGE_KEYS.BABY_PROFILE, profile);
  }

  // Memory Notes
  getMemoryNotes(): MemoryNote[] {
    return this.get<MemoryNote[]>(STORAGE_KEYS.MEMORY_NOTES) || [];
  }

  addMemoryNote(note: MemoryNote): void {
    const notes = this.getMemoryNotes();
    notes.unshift(note); // Add to beginning
    this.set(STORAGE_KEYS.MEMORY_NOTES, notes);
  }

  updateMemoryNote(id: string, updates: Partial<MemoryNote>): void {
    const notes = this.getMemoryNotes();
    const index = notes.findIndex(n => n.id === id);
    if (index >= 0) {
      notes[index] = { ...notes[index], ...updates };
      this.set(STORAGE_KEYS.MEMORY_NOTES, notes);
    }
  }

  deleteMemoryNote(id: string): void {
    const notes = this.getMemoryNotes();
    const filtered = notes.filter(n => n.id !== id);
    this.set(STORAGE_KEYS.MEMORY_NOTES, filtered);
  }

  // Utility methods
  clear(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  export(): string {
    const data: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      data[key] = this.get(storageKey);
    });
    return JSON.stringify(data, null, 2);
  }
}

export const storage = new LocalStorage();
