export interface Tutor {
  id: string;
  name: string;
  honorific: string;
  gender: 'male' | 'female';
  isDemonstrationProfile: boolean;
  demoNotice: string;
  title: string;
  experienceYears: number;
  experienceSummary: string;
  qualifications: string[];
  education: string;
  languages: string[];
  coursesTaught: string[];
  availability: {
    days: string;
    shift: 'Morning' | 'Afternoon' | 'Evening' | 'Flexible';
    timezones: string[];
    slotDetails: string;
  };
  rating: number;
  studentCount: number;
  bio: string;
  avatarPlaceholder: string;
  badges: string[];
}

export const TUTORS: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Qari Hafiz Muhammad Bilal',
    honorific: 'Qari',
    gender: 'male',
    isDemonstrationProfile: true,
    demoNotice: 'Demonstration Profile — Academy Verified Standard',
    title: 'Senior Tajweed & Qira’at Specialist',
    experienceYears: 8,
    experienceSummary: '8+ Years Teaching Online to International Students',
    qualifications: [
      'Shahadat-ul-Alimiyyah (Dars-e-Nizami)',
      'Hafiz-e-Quran (Certified Sanad)',
      'Ijazah in Hafs ‘an ‘Asim Recitation'
    ],
    education: 'Wifaq-ul-Madaris Al-Arabia Certified & B.A. Islamic Studies',
    languages: ['English', 'Urdu', 'Arabic'],
    coursesTaught: ['Noorani Qaida', 'Quran Reading', 'Quran with Tajweed'],
    availability: {
      days: 'Monday – Saturday',
      shift: 'Evening',
      timezones: ['PKT (Pakistan)', 'BST / GMT (UK)', 'EST (US/Canada)'],
      slotDetails: '5:00 PM – 11:00 PM PKT / Morning & Afternoon UK/US'
    },
    rating: 4.95,
    studentCount: 140,
    bio: 'Specializing in phonetics, Makharij clarity, and patient guidance for non-native Arabic speakers. Experienced in helping children transition smoothly from Noorani Qaida to confident Quran recitation.',
    avatarPlaceholder: 'M. Bilal',
    badges: ['Verified Tajweed Sanad', 'Kids Friendly', 'Top Rated']
  },
  {
    id: 'tutor-2',
    name: 'Qaria Syeda Fatima Zahra',
    honorific: 'Ustadha / Qaria',
    gender: 'female',
    isDemonstrationProfile: true,
    demoNotice: 'Demonstration Profile — Academy Verified Standard',
    title: 'Female Quran & Hifz Guide for Sisters & Young Kids',
    experienceYears: 6,
    experienceSummary: '6+ Years Online Quran Tutoring for Female Students',
    qualifications: [
      'Alimah Fazilah Degree',
      'Hafiza of the Complete Holy Quran',
      'Tajweed & Tarteel Certificate'
    ],
    education: 'Jamia Ashrafia Graduate & M.A. Islamic Culture',
    languages: ['English', 'Urdu', 'Punjabi'],
    coursesTaught: ['Noorani Qaida', 'Quran Reading', 'Quran Memorization (Hifz)', 'Islamic Studies'],
    availability: {
      days: 'Flexible (Monday – Sunday)',
      shift: 'Morning',
      timezones: ['PKT (Pakistan)', 'GST (Gulf / UAE)', 'AEST (Australia)'],
      slotDetails: '8:00 AM – 2:00 PM PKT / Evenings Australia & UAE'
    },
    rating: 4.98,
    studentCount: 125,
    bio: 'Dedicated sister tutor offering a warm, encouraging environment for sisters and young children. Expert in gentle Hifz pacing, daily revision methods, and practical daily Duas.',
    avatarPlaceholder: 'S. Fatima',
    badges: ['Female Sister Tutor', 'Kids Specialist', 'Hifz Mentor']
  },
  {
    id: 'tutor-3',
    name: 'Qari Tariq Mahmood',
    honorific: 'Qari',
    gender: 'male',
    isDemonstrationProfile: true,
    demoNotice: 'Demonstration Profile — Academy Verified Standard',
    title: 'Master Reciter & Tarteel Instructor',
    experienceYears: 11,
    experienceSummary: '11+ Years Experience in Quranic Recitation & Teaching',
    qualifications: [
      'Sanad in Saba’ah Qira’at (Seven Recitations)',
      'Hafiz-ul-Quran with Distinctive Distinction',
      'Senior Tajweed Adjudicator'
    ],
    education: 'Lahore Islamic Institute & Specialized Tajweed Diploma',
    languages: ['English', 'Urdu', 'Arabic', 'Punjabi'],
    coursesTaught: ['Quran with Tajweed', 'Quran Reading', 'Quran Translation'],
    availability: {
      days: 'Monday – Friday',
      shift: 'Flexible',
      timezones: ['All Global Timezones Accommodated'],
      slotDetails: 'Flexible slots customized upon student admission'
    },
    rating: 4.97,
    studentCount: 190,
    bio: 'Renowned for vocal beauty and precise instruction in stopping signs (Waqf) and melodic Tarteel. Has guided adult professionals from USA, UK, and Europe to master fluent Quran recitation.',
    avatarPlaceholder: 'T. Mahmood',
    badges: ['Senior Qari', 'Adults & Professionals', 'Advanced Tajweed']
  },
  {
    id: 'tutor-4',
    name: 'Ustadha Maryam Siddiqui',
    honorific: 'Ustadha',
    gender: 'female',
    isDemonstrationProfile: true,
    demoNotice: 'Demonstration Profile — Academy Verified Standard',
    title: 'Quran Translation & Islamic Studies Educator',
    experienceYears: 7,
    experienceSummary: '7+ Years Teaching Quranic Meaning & Islamic Studies',
    qualifications: [
      'Alimah Degree (8-Year Dars-e-Nizami)',
      'B.S. in Arabic & Islamic Sciences',
      'Certified Tafseer & Hadith Instructor'
    ],
    education: 'Lahore Women Islamic Academy',
    languages: ['English', 'Urdu'],
    coursesTaught: ['Quran Translation', 'Islamic Studies', 'Noorani Qaida'],
    availability: {
      days: 'Tuesday – Saturday',
      shift: 'Afternoon',
      timezones: ['PKT', 'GMT (UK)', 'CET (Europe)'],
      slotDetails: '2:00 PM – 8:00 PM PKT / UK Afternoons'
    },
    rating: 4.93,
    studentCount: 110,
    bio: 'Passionate about bridging modern life and Quranic wisdom. Teaches word-by-word Quran translation, Seerah stories, and essential Islamic ethics to teenage girls and adult women worldwide.',
    avatarPlaceholder: 'M. Siddiqui',
    badges: ['Female Scholar', 'Tafseer Specialist', 'Youth Mentor']
  },
  {
    id: 'tutor-5',
    name: 'Hafiz Abdullah Usman',
    honorific: 'Hafiz',
    gender: 'male',
    isDemonstrationProfile: true,
    demoNotice: 'Demonstration Profile — Academy Verified Standard',
    title: 'Hifz Revision & Muraja’ah Coach',
    experienceYears: 6,
    experienceSummary: '6+ Years Coaching Full & Partial Quran Memorizers',
    qualifications: [
      'Certified Hafiz-e-Quran (Gold Medalist)',
      'Tajweed Sanad in Riwayah Hafs',
      'Islamic Psychology & Memorization Techniques'
    ],
    education: 'Jamia Naeemia Lahore & Certified Memorization Coach',
    languages: ['Urdu', 'English', 'Pashto'],
    coursesTaught: ['Quran Memorization (Hifz)', 'Quran Reading', 'Noorani Qaida'],
    availability: {
      days: 'Daily (Mon – Sun)',
      shift: 'Morning',
      timezones: ['PKT (Pakistan)', 'EST & PST (North America)'],
      slotDetails: '6:00 AM – 12:00 PM PKT / US Evenings'
    },
    rating: 4.96,
    studentCount: 85,
    bio: 'Focuses on structured memory retention, eliminating hesitation in Mutashabihat, and cultivating a deep spiritual bond with the Holy Quran. Personalized lesson plans for busy students.',
    avatarPlaceholder: 'A. Usman',
    badges: ['Hifz Coach', 'Daily Sabaq Support', 'High Retention']
  },
  {
    id: 'tutor-6',
    name: 'Qaria Ayesha Noor',
    honorific: 'Ustadha / Qaria',
    gender: 'female',
    isDemonstrationProfile: true,
    demoNotice: 'Demonstration Profile — Academy Verified Standard',
    title: 'Early Childhood Quran & Noorani Qaida Instructor',
    experienceYears: 5,
    experienceSummary: '5+ Years Teaching Children (Ages 4 to 12) Online',
    qualifications: [
      'Noorani Qaida Teaching Master Certified',
      'Hafiza of 15 Juz',
      'Early Childhood Islamic Pedagogy Certificate'
    ],
    education: 'Wifaq Al-Banat Certified',
    languages: ['English', 'Urdu'],
    coursesTaught: ['Noorani Qaida', 'Quran Reading', 'Islamic Studies'],
    availability: {
      days: 'Monday – Friday',
      shift: 'Evening',
      timezones: ['UK (BST)', 'US (EST)', 'Canada (EST)'],
      slotDetails: '4:00 PM – 9:00 PM UK Time / US Morning-Noon'
    },
    rating: 4.99,
    studentCount: 160,
    bio: 'Known for interactive, joyful, and patient teaching that makes young kids fall in love with Quran learning. Uses digital visual aids, positive reinforcement, and fun phonetics drills.',
    avatarPlaceholder: 'A. Noor',
    badges: ['Kids Favorite', 'Gentle Teaching', 'Beginner Specialist']
  }
];
