import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent Data Directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const TUTOR_APPS_FILE = path.join(DATA_DIR, 'tutor_applications.json');
const TRIAL_REQUESTS_FILE = path.join(DATA_DIR, 'trial_requests.json');
const CONTACT_MESSAGES_FILE = path.join(DATA_DIR, 'contact_messages.json');

function readJsonFile<T>(filePath: string, defaultVal: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultVal;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// ---------------- API ROUTES ----------------

// Tutor Applications
app.get('/api/tutor-applications', (_req, res) => {
  const applications = readJsonFile<any[]>(TUTOR_APPS_FILE, []);
  res.json({ success: true, applications });
});

app.post('/api/tutor-applications', (req, res) => {
  const {
    fullName,
    whatsapp,
    email,
    country,
    city,
    gender,
    experience,
    qualifications,
    courses,
    languages,
    introduction,
  } = req.body;

  if (!fullName || !whatsapp || !qualifications || !experience) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields (Full Name, WhatsApp, Qualifications, and Experience).',
    });
  }

  const applications = readJsonFile<any[]>(TUTOR_APPS_FILE, []);
  const newApp = {
    id: `tut_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: String(fullName).trim(),
    whatsapp: String(whatsapp).trim(),
    email: email ? String(email).trim() : '',
    country: String(country || 'Pakistan').trim(),
    city: String(city || '').trim(),
    gender: String(gender || 'Unspecified').trim(),
    experience: String(experience).trim(),
    qualifications: String(qualifications).trim(),
    courses: Array.isArray(courses) ? courses : [courses].filter(Boolean),
    languages: Array.isArray(languages) ? languages : [languages].filter(Boolean),
    introduction: String(introduction || '').trim(),
    submittedAt: new Date().toISOString(),
    status: 'Pending Review',
  };

  applications.unshift(newApp);
  writeJsonFile(TUTOR_APPS_FILE, applications);

  console.log(`[TUTOR APP RECEIVED] New application from ${newApp.fullName} (${newApp.whatsapp})`);

  return res.json({
    success: true,
    message: 'Tutor application received and securely registered at Abdullah Quran Academy.',
    applicationId: newApp.id,
    application: newApp,
  });
});

// Trial Class Requests
app.get('/api/trial-requests', (_req, res) => {
  const requests = readJsonFile<any[]>(TRIAL_REQUESTS_FILE, []);
  res.json({ success: true, requests });
});

app.post('/api/trial-requests', (req, res) => {
  const {
    studentName,
    whatsapp,
    country,
    course,
    preferredTime,
    message,
    assignedTutor,
  } = req.body;

  if (!studentName || !whatsapp || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide student name, WhatsApp number, and selected course.',
    });
  }

  const requests = readJsonFile<any[]>(TRIAL_REQUESTS_FILE, []);
  const newRequest = {
    id: `trial_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    studentName: String(studentName).trim(),
    whatsapp: String(whatsapp).trim(),
    country: String(country || '').trim(),
    course: String(course).trim(),
    preferredTime: String(preferredTime || 'Flexible').trim(),
    message: String(message || '').trim(),
    assignedTutor: assignedTutor ? String(assignedTutor).trim() : null,
    submittedAt: new Date().toISOString(),
    status: 'New Request',
  };

  requests.unshift(newRequest);
  writeJsonFile(TRIAL_REQUESTS_FILE, requests);

  console.log(`[TRIAL CLASS REQUEST] Student ${newRequest.studentName} for course ${newRequest.course}`);

  return res.json({
    success: true,
    message: 'Free trial class request successfully registered at Abdullah Quran Academy.',
    requestId: newRequest.id,
    request: newRequest,
  });
});

// Contact Inquiries
app.get('/api/contact', (_req, res) => {
  const messages = readJsonFile<any[]>(CONTACT_MESSAGES_FILE, []);
  res.json({ success: true, messages });
});

app.post('/api/contact', (req, res) => {
  const { name, whatsapp, email, subject, message } = req.body;

  if (!name || !whatsapp || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your name, WhatsApp number, and message.',
    });
  }

  const messages = readJsonFile<any[]>(CONTACT_MESSAGES_FILE, []);
  const newMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    whatsapp: String(whatsapp).trim(),
    email: email ? String(email).trim() : '',
    subject: String(subject || 'General Inquiry').trim(),
    message: String(message).trim(),
    submittedAt: new Date().toISOString(),
    status: 'Unread',
  };

  messages.unshift(newMessage);
  writeJsonFile(CONTACT_MESSAGES_FILE, messages);

  return res.json({
    success: true,
    message: 'Your message has been received by Abdullah Quran Academy administration.',
    messageId: newMessage.id,
  });
});

// Academy Stats
app.get('/api/stats', (_req, res) => {
  const tutorApps = readJsonFile<any[]>(TUTOR_APPS_FILE, []);
  const trialReqs = readJsonFile<any[]>(TRIAL_REQUESTS_FILE, []);
  const messages = readJsonFile<any[]>(CONTACT_MESSAGES_FILE, []);

  res.json({
    success: true,
    stats: {
      totalTutorApplications: tutorApps.length,
      totalTrialRequests: trialReqs.length,
      totalMessages: messages.length,
      activeCountries: ['Pakistan', 'United Kingdom', 'United States', 'Canada', 'UAE', 'Saudi Arabia', 'Australia'],
      academyEstablished: 'Lahore, Pakistan',
      founder: 'Abdullah',
      contactPhone: '+92 310 7565285',
    },
  });
});

// Mount Vite or serve static assets
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Abdullah Quran Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
