import { z } from "zod";

// Mood tracking
export const moodSchema = z.object({
  id: z.string(),
  date: z.string(),
  mood: z.enum(["very-sad", "sad", "neutral", "happy", "very-happy"]),
  emoji: z.string(),
  notes: z.string().optional(),
  createdAt: z.string(),
});

// Pain tracking
export const painEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  level: z.number().min(0).max(10),
  location: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
});

// Sleep tracking
export const sleepEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  quality: z.enum(["poor", "fair", "good", "excellent"]),
  hours: z.number().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
});

// Daily recovery entry (combined tracking)
export const dailyEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  mood: moodSchema.omit({ id: true, date: true, createdAt: true }),
  pain: painEntrySchema.omit({ id: true, date: true, createdAt: true }),
  sleep: sleepEntrySchema.omit({ id: true, date: true, createdAt: true }),
  babyCare: z.object({
    diaper: z.boolean(),
    feeding: z.boolean(),
    bath: z.boolean(),
  }),
  createdAt: z.string(),
});

// Journal entries
export const journalEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.enum(["text", "voice"]),
  content: z.string(),
  mood: z.string().optional(),
  audioUrl: z.string().optional(),
  createdAt: z.string(),
});

// Self-care reminders
export const reminderSchema = z.object({
  id: z.string(),
  type: z.enum(["water", "meals", "kegel", "stretches", "custom"]),
  title: z.string(),
  description: z.string(),
  frequency: z.string(), // "every-3-hours", "daily", etc.
  enabled: z.boolean(),
  lastTriggered: z.string().optional(),
  customTime: z.string().optional(),
});

// Baby profile
export const babyProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  birthDate: z.string(),
  birthWeight: z.number().optional(),
  currentWeight: z.number().optional(),
  feedingLogs: z.array(z.object({
    id: z.string(),
    time: z.string(),
    type: z.enum(["breast", "bottle", "solid"]),
    duration: z.number().optional(),
    amount: z.string().optional(),
  })),
  diaperLogs: z.array(z.object({
    id: z.string(),
    time: z.string(),
    type: z.enum(["wet", "dirty", "both"]),
  })),
  temperatureLogs: z.array(z.object({
    id: z.string(),
    time: z.string(),
    temperature: z.number(),
  })),
});

// Memory notes
export const memoryNoteSchema = z.object({
  id: z.string(),
  content: z.string(),
  type: z.enum(["medication", "appointment", "milestone", "general"]),
  priority: z.enum(["low", "medium", "high"]),
  alertTime: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.string(),
});

// User profile
export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  deliveryDate: z.string(),
  deliveryType: z.enum(["vaginal", "c-section"]),
  language: z.enum(["en", "hi", "ta"]),
  onboardingCompleted: z.boolean(),
  pinEnabled: z.boolean(),
  pinCode: z.string().optional(),
});

// Wellness exercise
export const wellnessExerciseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.number(), // in minutes
  type: z.enum(["breathing", "meditation", "stretching", "pep-talk"]),
  audioUrl: z.string().optional(),
});

// Learn center article
export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["breastfeeding", "depression", "recovery", "bonding", "self-care"]),
  content: z.string(),
  readTime: z.number(), // in minutes
  language: z.string(),
  lastRead: z.string().optional(),
});

// Export types
export type Mood = z.infer<typeof moodSchema>;
export type PainEntry = z.infer<typeof painEntrySchema>;
export type SleepEntry = z.infer<typeof sleepEntrySchema>;
export type DailyEntry = z.infer<typeof dailyEntrySchema>;
export type JournalEntry = z.infer<typeof journalEntrySchema>;
export type Reminder = z.infer<typeof reminderSchema>;
export type BabyProfile = z.infer<typeof babyProfileSchema>;
export type MemoryNote = z.infer<typeof memoryNoteSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type WellnessExercise = z.infer<typeof wellnessExerciseSchema>;
export type Article = z.infer<typeof articleSchema>;

// Insert schemas (for forms)
export const insertDailyEntrySchema = dailyEntrySchema.omit({ id: true, createdAt: true });
export const insertJournalEntrySchema = journalEntrySchema.omit({ id: true, createdAt: true });
export const insertReminderSchema = reminderSchema.omit({ id: true, lastTriggered: true });
export const insertMemoryNoteSchema = memoryNoteSchema.omit({ id: true, createdAt: true });
export const insertUserProfileSchema = userProfileSchema.omit({ id: true });

export type InsertDailyEntry = z.infer<typeof insertDailyEntrySchema>;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type InsertReminder = z.infer<typeof insertReminderSchema>;
export type InsertMemoryNote = z.infer<typeof insertMemoryNoteSchema>;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
