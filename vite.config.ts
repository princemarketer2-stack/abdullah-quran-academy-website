import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data Directory for persistent records
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

// Custom Vite API plugin for real backend endpoints
function academyApiPlugin(): Plugin {
  return {
    name: 'academy-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url?.startsWith('/api/')) {
          res.setHeader('Content-Type', 'application/json');

          // Helper to parse JSON body
          const parseBody = (callback: (body: any) => void) => {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = body ? JSON.parse(body) : {};
                callback(parsed);
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, message: 'Invalid JSON body' }));
              }
            });
          };

          // 1. Trial Requests
          if (url === '/api/trial-requests') {
            if (req.method === 'GET') {
              const requests = readJsonFile<any[]>(TRIAL_REQUESTS_FILE, []);
              res.end(JSON.stringify({ success: true, requests }));
              return;
            }
            if (req.method === 'POST') {
              parseBody((body) => {
                const requests = readJsonFile<any[]>(TRIAL_REQUESTS_FILE, []);
                const newReq = {
                  id: body.id || `trial_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                  studentName: body.studentName || 'Student',
                  whatsapp: body.whatsapp || '',
                  country: body.country || '',
                  course: body.course || 'Noorani Qaida',
                  preferredTime: body.preferredTime || 'Flexible',
                  message: body.message || '',
                  assignedTutor: body.assignedTutor || null,
                  submittedAt: body.submittedAt || new Date().toISOString(),
                  status: body.status || 'New Request',
                };
                requests.unshift(newReq);
                writeJsonFile(TRIAL_REQUESTS_FILE, requests);
                res.end(JSON.stringify({ success: true, requestId: newReq.id, request: newReq }));
              });
              return;
            }
          }

          // 2. Tutor Applications
          if (url === '/api/tutor-applications') {
            if (req.method === 'GET') {
              const applications = readJsonFile<any[]>(TUTOR_APPS_FILE, []);
              res.end(JSON.stringify({ success: true, applications }));
              return;
            }
            if (req.method === 'POST') {
              parseBody((body) => {
                const applications = readJsonFile<any[]>(TUTOR_APPS_FILE, []);
                const newApp = {
                  id: body.id || `tut_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                  fullName: body.fullName || 'Tutor Applicant',
                  whatsapp: body.whatsapp || '',
                  email: body.email || '',
                  country: body.country || 'Pakistan',
                  city: body.city || '',
                  gender: body.gender || 'Unspecified',
                  experience: body.experience || '',
                  qualifications: body.qualifications || '',
                  courses: body.courses || [],
                  languages: body.languages || [],
                  introduction: body.introduction || '',
                  submittedAt: body.submittedAt || new Date().toISOString(),
                  status: body.status || 'Pending Review',
                };
                applications.unshift(newApp);
                writeJsonFile(TUTOR_APPS_FILE, applications);
                res.end(JSON.stringify({ success: true, applicationId: newApp.id, application: newApp }));
              });
              return;
            }
          }

          // 3. Contact Inquiries
          if (url === '/api/contact') {
            if (req.method === 'GET') {
              const messages = readJsonFile<any[]>(CONTACT_MESSAGES_FILE, []);
              res.end(JSON.stringify({ success: true, messages }));
              return;
            }
            if (req.method === 'POST') {
              parseBody((body) => {
                const messages = readJsonFile<any[]>(CONTACT_MESSAGES_FILE, []);
                const newMsg = {
                  id: body.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                  name: body.name || 'Visitor',
                  whatsapp: body.whatsapp || '',
                  email: body.email || '',
                  subject: body.subject || 'General Inquiry',
                  message: body.message || '',
                  submittedAt: body.submittedAt || new Date().toISOString(),
                  status: 'Unread',
                };
                messages.unshift(newMsg);
                writeJsonFile(CONTACT_MESSAGES_FILE, messages);
                res.end(JSON.stringify({ success: true, messageId: newMsg.id }));
              });
              return;
            }
          }

          // 4. Stats
          if (url === '/api/stats') {
            const tutorApps = readJsonFile<any[]>(TUTOR_APPS_FILE, []);
            const trialReqs = readJsonFile<any[]>(TRIAL_REQUESTS_FILE, []);
            res.end(
              JSON.stringify({
                success: true,
                stats: {
                  totalTutorApplications: tutorApps.length,
                  totalTrialRequests: trialReqs.length,
                  founder: 'Abdullah',
                  location: 'Lahore, Pakistan',
                  contactPhone: '+92 310 7565285',
                },
              })
            );
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), academyApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
