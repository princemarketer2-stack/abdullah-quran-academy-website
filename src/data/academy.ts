export const ACADEMY_INFO = {
  name: 'Abdullah Quran Academy',
  tagline: 'Learn the Holy Quran Online with Expert Tutors',
  subheading: 'Begin your beautiful journey of learning the Holy Quran from the comfort of your home. Connect with dedicated Quran tutors and learn with confidence.',
  founder: 'Abdullah',
  location: 'Lahore, Pakistan',
  whatsappNumber: '+92 310 7565285',
  whatsappRaw: '923107565285',
  whatsappDefaultLink: 'https://wa.me/923107565285',
  defaultWhatsAppMessage: 'Assalam o Alaikum Abdullah Quran Academy. I am interested in finding a Quran tutor. Please provide me with further details.',
  
  aboutStory: `Abdullah Quran Academy is an online Quran learning platform based in Lahore, Pakistan. Our mission is to make Quran education accessible to students around the world by connecting them with dedicated Quran tutors.

We aim to provide a comfortable, supportive and convenient online learning experience for students of all ages.`,

  missionPoints: [
    'Personalized 1-on-1 Interactive Classes for Kids & Adults',
    'Certified Male & Female Quran Tutors with Authentic Sanad',
    'Flexible Class Schedules across all International Timezones',
    'Affordable monthly plans with 3-Day Free Trial (No Commitment)',
    'Comfortable, Sister-to-Sister Classes for Female Students'
  ],

  coordinates: {
    lat: 31.5204,
    lng: 74.3587,
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan'
  }
};

export function getWhatsAppLink(customMessage?: string): string {
  const message = customMessage || ACADEMY_INFO.defaultWhatsAppMessage;
  return `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

export function getTutorWhatsAppLink(tutorName: string, courseName?: string): string {
  const text = `Assalam o Alaikum Abdullah Quran Academy. I am interested in learning with Tutor ${tutorName}${courseName ? ` for the course "${courseName}"` : ''}. Please provide me with schedule availability and trial class details.`;
  return `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
}

export function getCourseWhatsAppLink(courseTitle: string): string {
  const text = `Assalam o Alaikum Abdullah Quran Academy. I would like to enroll / request a free trial class for "${courseTitle}". Please share class timing and fee details.`;
  return `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
}
