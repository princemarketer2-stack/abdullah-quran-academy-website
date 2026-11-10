export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Classes' | 'Tutors' | 'Admissions';
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Tutors',
    question: 'How can I find a Quran tutor?',
    answer: 'You can explore our dedicated "Tutors" directory page on this website. You can filter tutors by gender (Male / Qari or Female / Qaria), course specialty (Noorani Qaida, Tajweed, Hifz, Translation), languages spoken, and availability. Once you find a tutor you like, click "Request a Class" to book a free trial session directly or connect with us on WhatsApp.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Can international students join?',
    answer: 'Yes, absolutely! Abdullah Quran Academy welcomes students from Pakistan and all around the world, including the United Kingdom, United States, Canada, Australia, UAE, Saudi Arabia, and Europe. Our tutors offer flexible class schedules tailored to your local timezone.'
  },
  {
    id: 'faq-3',
    category: 'Classes',
    question: 'Do you offer online Quran classes?',
    answer: 'Yes! All our classes are conducted 100% online through interactive screen-sharing platforms such as Zoom, Google Meet, or Skype. Classes are conducted 1-on-1 to ensure individualized attention, steady progress, and gentle personalized coaching.'
  },
  {
    id: 'faq-4',
    category: 'Admissions',
    question: 'How can I request a trial class?',
    answer: 'You can request a free trial class by filling out the "Free Trial Class" form on our website or by messaging us directly on WhatsApp at +92 310 7565285. We provide up to 3 trial classes with no upfront fee or credit card required, allowing you to experience our teaching quality first-hand.'
  },
  {
    id: 'faq-5',
    category: 'Tutors',
    question: 'How can I become a Quran tutor?',
    answer: 'Qualified Quran teachers (both male and female) can apply through our "Become a Tutor" page. Fill out the application form with your Quran teaching experience, academic qualifications (Ijazah, Dars-e-Nizami, Hifz certification), and language proficiencies. Applications are reviewed by founder Abdullah and the academy administration.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'How can I contact the academy?',
    answer: 'You can reach Abdullah Quran Academy directly via WhatsApp at +92 310 7565285 (https://wa.me/923107565285), through our Contact Page message form, or by clicking the floating WhatsApp button on any page. Our founder Abdullah and student support team respond promptly.'
  },
  {
    id: 'faq-7',
    category: 'Classes',
    question: 'Are female Quran tutors available for sisters and children?',
    answer: 'Yes. We have certified, highly respectful female Quran tutors (Qarias and Alimahs) specifically for female students of all ages as well as young children, ensuring complete privacy, modesty, and comfort.'
  },
  {
    id: 'faq-8',
    category: 'Classes',
    question: 'What days and times are classes held?',
    answer: 'Classes are customizable to your lifestyle. We offer 2-day, 3-day, and 5-day weekly schedules. Each class typically lasts 30 to 45 minutes, with sessions scheduled according to your preferred morning, afternoon, or evening slot.'
  }
];
