/**
 * Seed Firebase : crée les comptes Auth + profils Firestore de démo.
 * Usage : node scripts/seed.mjs
 */
import { readFileSync } from 'fs';

// --- Lecture de .env.local ---
const env = {};
readFileSync(new URL('../.env.local', import.meta.url), 'utf-8')
  .split('\n')
  .forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  });

const API_KEY    = env.VITE_FIREBASE_API_KEY;
const PROJECT_ID = env.VITE_FIREBASE_PROJECT_ID;

if (!API_KEY || !PROJECT_ID) {
  console.error('❌  .env.local manquant ou incomplet (VITE_FIREBASE_API_KEY / VITE_FIREBASE_PROJECT_ID)');
  process.exit(1);
}

const DEMO_ACCOUNTS = [
  {
    email: 'killian@tcheksplay.fr',
    password: 'admin123',
    name: 'Killian Bersot',
    role: 'admin',
    team: 'Annecy FC',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
  },
  {
    email: 'yassin@tcheksplay.fr',
    password: 'joueur123',
    name: 'Yassin Mebrouk',
    role: 'player',
    team: 'Annecy FC',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80',
  },
];

// --- Helpers REST ---
async function createAuthUser(email, password) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? 'Auth error');
  return { uid: data.localId, idToken: data.idToken };
}

async function signInUser(email, password) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? 'SignIn error');
  return { uid: data.localId, idToken: data.idToken };
}

async function setFirestoreDoc(collection, docId, fields, idToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${docId}`;
  const firestoreFields = {};
  for (const [k, v] of Object.entries(fields)) {
    firestoreFields[k] = { stringValue: String(v) };
  }
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ fields: firestoreFields }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? 'Firestore error');
  }
}

// --- Seed ---
async function seed() {
  console.log('🌱  Seed Tcheksplay — Firebase Auth + Firestore\n');
  for (const account of DEMO_ACCOUNTS) {
    process.stdout.write(`  → ${account.email} … `);
    try {
      let uid, idToken;
      try {
        ({ uid, idToken } = await createAuthUser(account.email, account.password));
        process.stdout.write('Auth créé … ');
      } catch (err) {
        if (err.message.includes('EMAIL_EXISTS')) {
          ({ uid, idToken } = await signInUser(account.email, account.password));
          process.stdout.write('Auth existant … ');
        } else {
          throw err;
        }
      }
      await setFirestoreDoc(
        'users',
        uid,
        { id: uid, name: account.name, email: account.email, role: account.role, team: account.team, avatar: account.avatar },
        idToken
      );
      console.log(`✅  Firestore OK (UID: ${uid})`);
    } catch (err) {
      console.log(`❌  ${err.message}`);
    }
  }
  console.log('\n✔  Seed terminé.');
}

seed();
