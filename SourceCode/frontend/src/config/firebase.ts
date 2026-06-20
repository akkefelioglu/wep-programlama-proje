import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type User,
} from 'firebase/auth';

// Firebase yapılandırması
// Gerçek proje için Firebase Console'dan alınan değerler .env dosyasında tanımlanmalıdır
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemo_Test_Key_Replace_With_Real",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "britmart-ecommerce.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "britmart-ecommerce",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "britmart-ecommerce.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Firebase'i başlat
let app;
let auth: ReturnType<typeof getAuth>;
let googleProvider: GoogleAuthProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn('Firebase initialization failed, using mock auth:', error);
}

// Admin email listesi
const ADMIN_EMAILS = ['admin@britmart.co.uk', 'admin@test.com'];

export const isAdminEmail = (email: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
};

// Auth fonksiyonları
export const loginWithEmail = async (email: string, password: string) => {
  if (auth && import.meta.env.VITE_FIREBASE_API_KEY) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }
  // Mock auth - demo amaçlı
  return mockLogin(email, password);
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  if (auth && import.meta.env.VITE_FIREBASE_API_KEY) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    return result.user;
  }
  return mockRegister(email, displayName);
};

export const loginWithGoogle = async () => {
  if (auth && googleProvider && import.meta.env.VITE_FIREBASE_API_KEY) {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  }
  return mockLogin('google@user.com', 'google');
};

export const logout = async () => {
  if (auth && import.meta.env.VITE_FIREBASE_API_KEY) {
    await signOut(auth);
  }
  localStorage.removeItem('mockUser');
};

// Mock auth sistemi (Firebase olmadan çalışması için)
interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
}

const mockLogin = (email: string, _password: string): MockUser => {
  const user: MockUser = {
    uid: 'mock-' + Date.now(),
    email,
    displayName: email.split('@')[0],
    photoURL: null,
  };
  localStorage.setItem('mockUser', JSON.stringify(user));
  return user;
};

const mockRegister = (email: string, displayName: string): MockUser => {
  const user: MockUser = {
    uid: 'mock-' + Date.now(),
    email,
    displayName,
    photoURL: null,
  };
  localStorage.setItem('mockUser', JSON.stringify(user));
  return user;
};

export const getMockUser = (): MockUser | null => {
  const data = localStorage.getItem('mockUser');
  return data ? JSON.parse(data) : null;
};

export { auth };
export type { User, MockUser };
