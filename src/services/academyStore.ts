// Client-side & API dual-persistence store for Abdullah Quran Academy

export interface TrialRequest {
  id: string;
  studentName: string;
  whatsapp: string;
  country: string;
  course: string;
  preferredTime: string;
  message: string;
  assignedTutor: string | null;
  submittedAt: string;
  status: string;
}

export interface TutorApplication {
  id: string;
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  city: string;
  gender: string;
  experience: string;
  qualifications: string;
  courses: string[];
  languages: string[];
  introduction: string;
  submittedAt: string;
  status: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: string;
}

const STORAGE_KEYS = {
  TRIAL: 'aqa_trial_requests',
  TUTORS: 'aqa_tutor_applications',
  MESSAGES: 'aqa_contact_messages',
};

// Seed initial demo records so the admin portal is immediately informative
const INITIAL_TRIALS: TrialRequest[] = [
  {
    id: 'trial_1001',
    studentName: 'Zaid Farooq (Age 9)',
    whatsapp: '+44 7911 123456',
    country: 'United Kingdom',
    course: 'Noorani Qaida',
    preferredTime: 'Evening (5:00 PM - 9:00 PM)',
    message: 'Seeking a patient female tutor for beginner phonetics.',
    assignedTutor: 'Qaria Ayesha Noor',
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Class Scheduled',
  },
  {
    id: 'trial_1002',
    studentName: 'Hamza Tariq (Adult)',
    whatsapp: '+1 416 555 0192',
    country: 'Canada',
    course: 'Quran with Tajweed',
    preferredTime: 'Morning Shift',
    message: 'Adult professional looking to refine Makharij and Tarteel.',
    assignedTutor: 'Qari Hafiz Muhammad Bilal',
    submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'In Progress',
  }
];

const INITIAL_TUTORS: TutorApplication[] = [
  {
    id: 'tut_8001',
    fullName: 'Qari Usama Qureshi',
    whatsapp: '+92 321 4567890',
    email: 'usama.qari@example.com',
    country: 'Pakistan',
    city: 'Lahore',
    gender: 'Male',
    experience: '6 Years teaching online to UK & USA students',
    qualifications: 'Shahadat-ul-Alimiyyah (Wifaq-ul-Madaris) & Hafiz-e-Quran',
    courses: ['Noorani Qaida', 'Quran Reading', 'Quran with Tajweed'],
    languages: ['Urdu', 'English', 'Arabic'],
    introduction: 'Focused on Tajweed precision and encouraging teaching methodology for children.',
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Interview Scheduled',
  }
];

function getStored<T>(key: string, defaultVal: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.warn(`Error reading localStorage ${key}:`, err);
  }
  return defaultVal;
}

function saveStored<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error saving localStorage ${key}:`, err);
  }
}

export const academyStore = {
  // Trial Requests
  async saveTrialRequest(req: Omit<TrialRequest, 'id' | 'submittedAt' | 'status'>): Promise<TrialRequest> {
    const newEntry: TrialRequest = {
      ...req,
      id: `trial_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
      status: 'New Request',
    };

    // Save locally
    const current = getStored<TrialRequest>(STORAGE_KEYS.TRIAL, INITIAL_TRIALS);
    saveStored(STORAGE_KEYS.TRIAL, [newEntry, ...current]);

    // Attempt backend sync
    try {
      await fetch('/api/trial-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
    } catch (e) {
      // Local copy is already safe
    }

    return newEntry;
  },

  async getTrialRequests(): Promise<TrialRequest[]> {
    try {
      const res = await fetch('/api/trial-requests');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.requests) && data.requests.length > 0) {
          return data.requests;
        }
      }
    } catch (e) {
      // Fallback to local
    }
    return getStored<TrialRequest>(STORAGE_KEYS.TRIAL, INITIAL_TRIALS);
  },

  // Tutor Applications
  async saveTutorApplication(app: Omit<TutorApplication, 'id' | 'submittedAt' | 'status'>): Promise<TutorApplication> {
    const newEntry: TutorApplication = {
      ...app,
      id: `tut_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
      status: 'Pending Review',
    };

    const current = getStored<TutorApplication>(STORAGE_KEYS.TUTORS, INITIAL_TUTORS);
    saveStored(STORAGE_KEYS.TUTORS, [newEntry, ...current]);

    try {
      await fetch('/api/tutor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
    } catch (e) {
      // Local copy is already safe
    }

    return newEntry;
  },

  async getTutorApplications(): Promise<TutorApplication[]> {
    try {
      const res = await fetch('/api/tutor-applications');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.applications) && data.applications.length > 0) {
          return data.applications;
        }
      }
    } catch (e) {
      // Fallback to local
    }
    return getStored<TutorApplication>(STORAGE_KEYS.TUTORS, INITIAL_TUTORS);
  },

  // Contact Messages
  async saveContactMessage(msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>): Promise<ContactMessage> {
    const newEntry: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
      status: 'Unread',
    };

    const current = getStored<ContactMessage>(STORAGE_KEYS.MESSAGES, []);
    saveStored(STORAGE_KEYS.MESSAGES, [newEntry, ...current]);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
    } catch (e) {
      // Local copy is already safe
    }

    return newEntry;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
          return data.messages;
        }
      }
    } catch (e) {
      // Fallback
    }
    return getStored<ContactMessage>(STORAGE_KEYS.MESSAGES, []);
  }
};
