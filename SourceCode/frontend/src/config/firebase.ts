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

// Firebase yapılandırması - Demo/Test modu
// Gerçek proje için Firebase Console'dan alınan değerler kullanılmalıdır
const firebaseConfig = {
  apiKey: "AIzaSyDemo_Test_Key_Replace_With_Real",
  authDomain: "britmart-ecommerce.firebaseapp.com",
  projectId: "britmart-ecommerce",
  storageBucket: "britmart-ecommerce.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
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
  try {
    if (auth) {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    }
  } catch {
    // Firebase başarısız olursa mock auth kullan
  }
  // Mock auth - demo amaçlı
  return mockLogin(email, password);
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    if (auth) {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      return result.user;
    }
  } catch {
    // Firebase başarısız olursa mock auth kullan
  }
  return mockRegister(email, displayName);
};

export const loginWithGoogle = async () => {
  try {
    if (auth && googleProvider) {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    }
  } catch {
    // Mock auth
  }
  return mockLogin('google@user.com', 'google');
};

export const logout = async () => {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch {
    // ignore
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
