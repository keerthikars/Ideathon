export const MOOD_OPTIONS = [
  { value: "very-sad", emoji: "😢", label: "Very Sad" },
  { value: "sad", emoji: "😟", label: "Sad" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "very-happy", emoji: "😄", label: "Very Happy" },
] as const;

export const SLEEP_QUALITY_OPTIONS = [
  { value: "poor", label: "Poor", color: "text-red-500" },
  { value: "fair", label: "Fair", color: "text-yellow-500" },
  { value: "good", label: "Good", color: "text-green-500" },
  { value: "excellent", label: "Excellent", color: "text-blue-500" },
] as const;

export const REMINDER_TYPES = [
  { 
    type: "water", 
    title: "Drink Water", 
    description: "Stay hydrated for better recovery", 
    frequency: "every-3-hours",
    icon: "💧"
  },
  { 
    type: "meals", 
    title: "Eat Well", 
    description: "Don't skip meals - your body needs nutrition", 
    frequency: "3-times-daily",
    icon: "🍽️"
  },
  { 
    type: "kegel", 
    title: "Kegel Exercises", 
    description: "Strengthen your pelvic floor muscles", 
    frequency: "twice-daily",
    icon: "💪"
  },
  { 
    type: "stretches", 
    title: "Gentle Stretches", 
    description: "Light stretching to ease tension", 
    frequency: "daily",
    icon: "🧘‍♀️"
  },
] as const;

export const WELLNESS_EXERCISES = [
  {
    id: "breathing-5min",
    title: "5-Minute Calm Breath",
    description: "Deep breathing to reduce stress and anxiety",
    duration: 5,
    type: "breathing",
  },
  {
    id: "gentle-stretch",
    title: "Gentle Stretch Session",
    description: "Light stretches for neck, shoulders, and back",
    duration: 10,
    type: "stretching",
  },
  {
    id: "pep-talk",
    title: "You're Doing Great",
    description: "Positive affirmations for new mothers",
    duration: 3,
    type: "pep-talk",
  },
  {
    id: "meditation-10min",
    title: "Mindful Moment",
    description: "Guided meditation for inner peace",
    duration: 10,
    type: "meditation",
  },
] as const;

export const LEARN_ARTICLES = [
  {
    id: "breastfeeding-basics",
    title: "Breastfeeding Basics",
    category: "breastfeeding",
    content: "Breastfeeding is a natural process, but it can take time to master. Here are essential tips for successful breastfeeding...",
    readTime: 5,
  },
  {
    id: "postpartum-depression",
    title: "Understanding Postpartum Depression",
    category: "depression",
    content: "Postpartum depression affects many new mothers. It's important to recognize the signs and seek help when needed...",
    readTime: 8,
  },
  {
    id: "c-section-recovery",
    title: "C-Section Recovery Guide",
    category: "recovery",
    content: "Recovering from a cesarean section requires special care. Here's what to expect and how to heal properly...",
    readTime: 10,
  },
  {
    id: "vaginal-recovery",
    title: "Vaginal Birth Recovery",
    category: "recovery",
    content: "Recovery after vaginal delivery involves caring for tears, managing bleeding, and rebuilding strength...",
    readTime: 7,
  },
  {
    id: "baby-bonding",
    title: "Building Bond with Your Baby",
    category: "bonding",
    content: "Bonding with your baby is a gradual process. Don't worry if it doesn't happen immediately - this is normal...",
    readTime: 6,
  },
  {
    id: "self-compassion",
    title: "Self-Compassion for New Moms",
    category: "self-care",
    content: "Being kind to yourself during this transition is crucial. Learn how to practice self-compassion...",
    readTime: 4,
  },
] as const;

export const EMERGENCY_CONTACTS = [
  {
    id: "hospital",
    name: "Hospital",
    number: "Emergency",
    description: "Your delivery hospital emergency line",
  },
  {
    id: "obgyn",
    name: "OB/GYN",
    number: "Doctor's Office",
    description: "Your obstetrician/gynecologist",
  },
  {
    id: "pediatrician",
    name: "Pediatrician",
    number: "Pediatric Office",
    description: "Your baby's doctor",
  },
  {
    id: "postpartum-helpline",
    name: "Postpartum Support",
    number: "1-800-944-4773",
    description: "24/7 postpartum support helpline",
  },
] as const;

export const EMERGENCY_GUIDES = [
  {
    id: "bleeding",
    title: "Heavy Bleeding Emergency",
    content: "Call 911 immediately if you experience: soaking through a pad every hour, passing clots larger than a golf ball, or feeling dizzy/faint.",
  },
  {
    id: "baby-fever",
    title: "Baby Fever Guide",
    content: "For babies under 3 months: any fever over 100.4°F (38°C) requires immediate medical attention. Call your pediatrician or go to ER.",
  },
  {
    id: "depression-signs",
    title: "Postpartum Depression Signs",
    content: "Seek help if you experience: persistent sadness, anxiety, thoughts of harming yourself or baby, inability to care for yourself or baby.",
  },
] as const;

export const STORAGE_KEYS = {
  USER_PROFILE: "postpartum_user_profile",
  DAILY_ENTRIES: "postpartum_daily_entries",
  JOURNAL_ENTRIES: "postpartum_journal_entries",
  REMINDERS: "postpartum_reminders",
  BABY_PROFILE: "postpartum_baby_profile",
  MEMORY_NOTES: "postpartum_memory_notes",
  WELLNESS_PROGRESS: "postpartum_wellness_progress",
} as const;
