export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  ageGroup: string;
  duration: string;
  prerequisites: string;
  curriculum: string[];
  features: string[];
}

export const COURSES: Course[] = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida',
    arabicTitle: 'القاعدة النورانية',
    subtitle: 'Beginner Arabic & Quranic Reading Foundation',
    shortDescription: 'The essential first step for beginners to master Arabic alphabet pronunciation (Makharij), letter shapes, and basic joining rules.',
    fullDescription: 'The Noorani Qaida course is structured specifically for children and adult beginners taking their first steps in Quranic reading. Guided by experienced tutors, students learn accurate articulation points (Makharij), vowels (Harakat), Tanween, Madd letters, Sukoon, and Tashdeed to build effortless fluency before transitioning to the Holy Quran.',
    image: '/src/assets/images/course_noorani_qaida_1793510783368.jpg',
    level: 'Beginner',
    ageGroup: 'Kids (4+) & Adults',
    duration: '2–3 Months (Customized Pace)',
    prerequisites: 'No prior Arabic knowledge required',
    curriculum: [
      'Single Alphabet Pronunciation & Makharij (Articulations)',
      'Compound Letters & Connected Forms (Murakkabat)',
      'Short Vowels (Zabar, Zer, Pesh / Harakat)',
      'Tanween (Double Vowels) & Sukoon (Jazm)',
      'Letters of Maddah & Leen',
      'Rules of Noon Sakinah, Tanween & Meem Sakinah',
      'Practice Exercises from the Holy Quran'
    ],
    features: [
      'Interactive Digital Qaida Pointer & Audio Playback',
      'One-on-One Dedicated Attention',
      'Patient Male & Female Tutors for Kids',
      'Weekly Pronunciation Assessment'
    ]
  },
  {
    id: 'quran-reading',
    title: 'Quran Reading (Nazra)',
    arabicTitle: 'قراءة القرآن الكريم (ناظرة)',
    subtitle: 'Fluent & Confident Recitation of the Holy Quran',
    shortDescription: 'Develop smooth, confident, and melodious Nazra recitation directly from the Mushaf with continuous tutor supervision.',
    fullDescription: 'Designed for students who have completed the Qaida or basic primers and wish to recite the complete Quran with fluency and respect. Tutors listen to every verse, correct hesitation, refine rhythm, and instill proper Quranic etiquette (Adaab-ul-Quran).',
    image: '/src/assets/images/hero_quran_holy_book_1793510781682.jpg',
    level: 'Intermediate',
    ageGroup: 'All Ages (Kids, Youth, Adults)',
    duration: '6–12 Months for Complete Nazra',
    prerequisites: 'Basic knowledge of Arabic alphabet reading',
    curriculum: [
      'Transitioning from Qaida to Juz 30 (Juz Amma)',
      'Flow, Breath Control, and Pause Signs (Waqf)',
      'Word-by-word Recitation with Tutor Guidance',
      'Gradual Speed Building from Tarteel to Fluency',
      'Etiquettes of Handling and Reading the Mushaf',
      'Continuous Revision of Previous Surahs'
    ],
    features: [
      'Personalized Pace According to Student Capacity',
      'Flexible Class Times for School & Working Schedules',
      'Monthly Progress Tracking for Parents',
      'Completion Certificate upon Finishing Full Quran'
    ]
  },
  {
    id: 'quran-with-tajweed',
    title: 'Quran with Tajweed',
    arabicTitle: 'القرآن الكريم مع التجويد',
    subtitle: 'Master the Rules of Divine Recitation & Tarteel',
    shortDescription: 'Master phonetics, Ghunnah, Ikhfa, Idgham, Qalqalah, and Madd to recite the Holy Quran as it was revealed to Prophet Muhammad (PBUH).',
    fullDescription: 'Tajweed is the science of giving each Quranic letter its rightful phonetic articulation and characteristics. This rigorous yet accessible course covers both theoretical principles (Ahkam-e-Tajweed) and extensive vocal practice under certified Qaris.',
    image: '/src/assets/images/course_quran_tajweed_1793510782113.jpg',
    level: 'Intermediate',
    ageGroup: 'Kids (8+) & Adults',
    duration: '4–6 Months',
    prerequisites: 'Can read Quran text moderately',
    curriculum: [
      'Makharij-ul-Huroof (The 17 Articulation Points)',
      'Sifat-ul-Huroof (Characteristics: Hams, Jahr, Isti’la, etc.)',
      'Ahkam Noon Sakinah & Tanween (Izhar, Idgham, Iqlab, Ikhfa)',
      'Ahkam Meem Sakinah & Rules of Ra & Lam',
      'Rules of Madd (Natural, Obligatory, Permissible Prolongations)',
      'Rules of Waqf (Stopping, Pausing, and Resuming Recitation)',
      'Vocal Melody and Tarteel Exercises'
    ],
    features: [
      'Certified Qari Instructors with verified Sanad',
      'Color-Coded Tajweed Mushaf Integration',
      'Detailed Correction of Subtle Pronunciation Slips',
      'Audio Recording Review for Homework'
    ]
  },
  {
    id: 'quran-memorization',
    title: 'Quran Memorization (Hifz)',
    arabicTitle: 'تحفيظ القرآن الكريم',
    subtitle: 'Structured Full & Selected Surahs Hifz Program',
    shortDescription: 'Preserve the words of Allah in your heart through systematic daily Sabaq, Sabaqi (recent revision), and Manzil (cumulative retention).',
    fullDescription: 'Our Hifz-ul-Quran program provides a disciplined, spiritually supportive environment for students memorizing either the entire Quran or selected blessed Surahs (such as Surah Yaseen, Al-Mulk, Al-Kahf, Ar-Rahman, and Juz 30). Tutors employ time-tested classical revision methodologies to ensure long-term retention without burnout.',
    image: '/src/assets/images/course_quran_memorization_1793510783138.jpg',
    level: 'Advanced',
    ageGroup: 'Children (6+) & Dedicated Adults',
    duration: '2–3 Years (Full Hifz) or Custom Modules',
    prerequisites: 'Fluent Quran reading with sound Tajweed',
    curriculum: [
      'Daily New Memorization (Sabaq)',
      'Previous Lessons Consolidation (Sabaqi)',
      'Cumulative Revision of Previous Juz (Manzil / Dhor)',
      'Mutashabihat (Similar Verses) Identification Strategies',
      'Memorization Techniques & Mind-Mapping',
      'Tajweed Perfection during Fast Recitation',
      'Preparation for Public Recitation & Taraweeh'
    ],
    features: [
      'Daily 1-on-1 Sessions with Experienced Huffaz',
      'Dedicated Sister Hifz Tutors for Female Students',
      'Structured Manzil Record Book',
      'Milestone Ceremonies & Academy Hifz Sanad'
    ]
  },
  {
    id: 'quran-translation',
    title: 'Quran Translation & Tafseer',
    arabicTitle: 'ترجمة القرآن والتفسير',
    subtitle: 'Word-by-Word Translation & Deep Meaning',
    shortDescription: 'Understand the divine message with word-by-word Urdu or English translation, contextual revelation, and practical life lessons.',
    fullDescription: 'Reciting the Quran is an act of worship, and understanding its message transforms the heart and soul. This course provides students with word-by-word grammatical translation, core Arabic vocabulary, context of revelation (Asbab-un-Nuzool), and commentary (Tafseer) to connect deeply with Allah’s direct words.',
    image: '/src/assets/images/course_quran_tajweed_1793510782113.jpg',
    level: 'All Levels',
    ageGroup: 'Youth & Adults',
    duration: '6–18 Months (Modular)',
    prerequisites: 'Basic reading ability',
    curriculum: [
      'High-Frequency Quranic Arabic Vocabulary',
      'Word-by-Word Urdu and English Translation',
      'Thematic Breakdown of Surahs & Chapters',
      'Asbab-un-Nuzool (Historical Context of Revelation)',
      'Practical Implementation in Modern Daily Life',
      'Reflections on Stories of the Prophets in the Quran'
    ],
    features: [
      'Accessible to Non-Arabic Speakers Worldwide',
      'Interactive Q&A with Qualified Scholars',
      'Study Notes and Slide Summaries Provided',
      'Bilingual Delivery in English and Urdu'
    ]
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies',
    arabicTitle: 'الدراسات الإسلامية',
    subtitle: 'Faith, Morals, Duas & Essential Daily Practices',
    shortDescription: 'Comprehensive Islamic education covering Aqeedah, Salah (Prayer), Sunnah, Daily Duas, Hadith, and Islamic manners for children and adults.',
    fullDescription: 'A nurturing curriculum crafted to instill authentic Islamic character (Akhlaq), core beliefs (Aqeedah), correct performance of rituals (Wudu, Salah, Fasting, Zakah), daily Masnoon Duas, and inspiring stories from the life of Prophet Muhammad (PBUH) and the Sahabah.',
    image: '/src/assets/images/hero_quran_holy_book_1793510781682.jpg',
    level: 'Beginner',
    ageGroup: 'Kids, Teens & New Learners',
    duration: 'Ongoing Continuous Learning',
    prerequisites: 'None',
    curriculum: [
      'Pillars of Islam & Articles of Faith (Iman)',
      'Practical Method of Wudu & Salah with Meaning',
      'Memorization of 40 Essential Masnoon Duas',
      'Seerah of the Holy Prophet Muhammad (PBUH)',
      'Stories of the Prophets from Adam to Isa (AS)',
      'Islamic Manners (Akhlaq & Adab towards Parents & Elders)',
      'Contemporary Muslim Ethics in a Globalized World'
    ],
    features: [
      'Child-Friendly Visual Slides & Quizzes',
      'Safe, Encouraging Islamic Environment',
      'Sister Teachers Available for Girls & Ladies',
      'Monthly Character Growth Reports'
    ]
  }
];
