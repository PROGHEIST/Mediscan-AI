const http = require('node:http');
const { randomUUID } = require('node:crypto');

const PORT = Number(process.env.PORT || 4000);
const DISCLAIMER = 'This API is for educational and demonstration purposes only. It does not provide medical diagnosis or treatment. Please consult a qualified healthcare professional for medical advice.';

const doctors = [
  { id: 'doc-ava', name: 'Dr. Ava Williams', specialty: 'Cardiologist', rating: 4.9, nextAvailable: 'Today 4:30 PM' },
  { id: 'doc-noah', name: 'Dr. Noah Patel', specialty: 'General Physician', rating: 4.8, nextAvailable: 'Tomorrow 10:00 AM' },
  { id: 'doc-mia', name: 'Dr. Mia Chen', specialty: 'Dermatologist', rating: 4.9, nextAvailable: 'Friday 2:15 PM' },
  { id: 'doc-sofia', name: 'Dr. Sofia Rivera', specialty: 'Mental Health', rating: 4.7, nextAvailable: 'Monday 9:30 AM' },
];

const symptomRules = [
  { keywords: ['chest', 'pressure', 'breath', 'arm pain'], conditions: ['Cardiac strain', 'Acid reflux', 'Anxiety-related chest tightness'], riskLevel: 'High', specialist: 'Cardiologist or emergency care', urgency: 'urgent', nextSteps: ['Seek urgent help for severe chest pain or breathlessness.', 'Avoid exertion until assessed.', 'Track duration, triggers, and associated symptoms.'] },
  { keywords: ['fever', 'cough', 'sore throat', 'fatigue'], conditions: ['Viral upper respiratory infection', 'Seasonal flu', 'COVID-like respiratory illness'], riskLevel: 'Moderate', specialist: 'General Physician', urgency: 'soon', nextSteps: ['Rest and hydrate.', 'Monitor temperature and oxygen level if available.', 'Book care if fever lasts more than 3 days or breathing worsens.'] },
  { keywords: ['headache', 'migraine', 'dizziness', 'blurred'], conditions: ['Tension headache', 'Migraine episode', 'Blood pressure variation'], riskLevel: 'Moderate', specialist: 'Neurologist or primary care doctor', urgency: 'soon', nextSteps: ['Rest in a quiet room and hydrate.', 'Check blood pressure if possible.', 'Get urgent help for sudden severe headache, weakness, or confusion.'] },
  { keywords: ['rash', 'itch', 'skin', 'redness'], conditions: ['Allergic dermatitis', 'Fungal skin irritation', 'Eczema flare'], riskLevel: 'Low to Moderate', specialist: 'Dermatologist', urgency: 'routine', nextSteps: ['Avoid scratching and new cosmetic products.', 'Keep the area clean and dry.', 'Consult a clinician if rash spreads, oozes, or includes fever.'] },
  { keywords: ['sad', 'anxiety', 'panic', 'sleep', 'stress'], conditions: ['Stress overload', 'Anxiety symptoms', 'Sleep disruption'], riskLevel: 'Moderate', specialist: 'Mental Health Professional', urgency: 'soon', nextSteps: ['Try slow breathing and reduce stimulants.', 'Talk to a trusted person today.', 'Seek immediate crisis support if you may harm yourself or someone else.'] },
  { keywords: ['stomach', 'vomit', 'nausea', 'diarrhea'], conditions: ['Gastroenteritis', 'Food intolerance', 'Acidity or indigestion'], riskLevel: 'Low to Moderate', specialist: 'Gastroenterologist or general physician', urgency: 'routine', nextSteps: ['Sip fluids frequently.', 'Eat light foods as tolerated.', 'Seek care for blood in stool, severe pain, or dehydration.'] },
];

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; if (raw.length > 1_000_000) req.destroy(); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (error) { reject(error); } });
  });
}

function analyzeSymptoms(symptoms = '') {
  const text = String(symptoms).toLowerCase();
  const match = symptomRules.find((rule) => rule.keywords.some((word) => text.includes(word)));
  return match || { conditions: ['General wellness concern', 'Minor infection or lifestyle-related issue', 'Needs clinician review if persistent'], riskLevel: text.trim() ? 'Low' : 'Not enough information', specialist: 'General Physician', urgency: 'routine', nextSteps: text.trim() ? ['Add duration, severity, age, and medicines for a better demo result.', 'Monitor symptoms and rest.', 'Book an appointment if symptoms persist or worsen.'] : ['Enter symptoms such as fever, cough, headache, rash, chest pain, or anxiety.', 'For emergencies, contact local emergency services immediately.'] };
}

function calculateRisk(body) {
  const age = Number(body.age || 30);
  const weight = Number(body.weight || 70);
  const height = Number(body.height || 170) / 100;
  const systolic = Number(body.bloodPressure || 120);
  const sugar = Number(body.sugarLevel || 95);
  const bmi = Math.round((weight / Math.max(height * height, 1)) * 10) / 10;
  let score = 15 + Math.max(0, age - 35) * 0.7 + Math.max(0, bmi - 24) * 2 + Math.max(0, systolic - 120) * 0.35 + Math.max(0, sugar - 100) * 0.25;
  if (body.smoking === true || body.smoking === 'yes') score += 15;
  if (Number(body.exerciseDays || 0) >= 4) score -= 10;
  score = Math.max(5, Math.min(95, Math.round(score)));
  return { score, bmi, category: score > 70 ? 'High' : score > 40 ? 'Moderate' : 'Low', recommendations: ['Maintain regular physical activity.', 'Choose high-fiber meals and reduce sugary drinks.', 'Review these demo results with a qualified clinician for real medical decisions.'] };
}

async function router(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { status: 'ok', service: 'MediScan AI API', disclaimer: DISCLAIMER });
    if (req.method === 'GET' && url.pathname === '/api/doctors') return send(res, 200, { doctors });
    if (req.method === 'GET' && url.pathname === '/api/dashboard') return send(res, 200, { metrics: { bmi: 23.4, heartRate: 76, bloodPressure: '118/76', sugarLevel: 94, waterLiters: 2.4, sleepHours: 7.5, steps: 9840 }, weekly: [{ day: 'Mon', score: 72 }, { day: 'Tue', score: 76 }, { day: 'Wed', score: 70 }, { day: 'Thu', score: 84 }, { day: 'Fri', score: 82 }, { day: 'Sat', score: 88 }, { day: 'Sun', score: 86 }] });

    if (req.method === 'POST' && url.pathname === '/api/symptom-checker') {
      const body = await readJson(req);
      return send(res, 200, { id: randomUUID(), input: body.symptoms || '', analysis: analyzeSymptoms(body.symptoms), disclaimer: DISCLAIMER });
    }
    if (req.method === 'POST' && url.pathname === '/api/risk-prediction') return send(res, 200, { id: randomUUID(), risk: calculateRisk(await readJson(req)), disclaimer: DISCLAIMER });
    if (req.method === 'POST' && url.pathname === '/api/report-analyzer') return send(res, 200, { id: randomUUID(), summary: 'Simulated blood test summary generated from uploaded report metadata.', abnormalValues: ['Vitamin D: low', 'WBC: slightly elevated'], explanation: 'Mock analyzer highlights values that may need clinician follow-up.', suggestedActions: ['Discuss results with your doctor.', 'Repeat labs if symptoms continue.'], disclaimer: DISCLAIMER });
    if (req.method === 'POST' && url.pathname === '/api/appointments') {
      const body = await readJson(req);
      return send(res, 201, { appointmentId: randomUUID(), status: 'requested', patientName: body.name || 'Patient', doctor: body.doctor || doctors[1].name, requestedFor: `${body.date || 'next available'} ${body.time || ''}`.trim(), message: 'Appointment request received. This is a demo confirmation.' });
    }
    if (req.method === 'POST' && url.pathname === '/api/chat') {
      const body = await readJson(req);
      return send(res, 200, { reply: `I can help explain general health topics about "${body.message || 'your concern'}". For diagnosis or treatment, please consult a qualified healthcare professional.`, disclaimer: DISCLAIMER });
    }
    return send(res, 404, { error: 'Route not found', availableRoutes: ['/api/health', '/api/doctors', '/api/dashboard', '/api/symptom-checker', '/api/risk-prediction', '/api/report-analyzer', '/api/appointments', '/api/chat'] });
  } catch (error) {
    return send(res, 400, { error: 'Invalid request', details: error.message });
  }
}

if (require.main === module) {
  http.createServer(router).listen(PORT, () => console.log(`MediScan AI API running on http://localhost:${PORT}`));
}

module.exports = { router, analyzeSymptoms, calculateRisk };
