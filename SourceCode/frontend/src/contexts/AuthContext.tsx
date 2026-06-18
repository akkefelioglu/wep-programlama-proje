import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logout as firebaseLogout,
  isAdminEmail,
  getMockUser,
  auth,
  type MockUser,
} from '../config/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';

interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toAppUser = (user: FirebaseUser | MockUser | null): AppUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    isAdmin: isAdminEmail(user.email ?? null),
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase auth listener
    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(toAppUser(firebaseUser));
          setLoading(false);
        });
        return () => unsubscribe();
      } catch {
        // Firebase not available
      }
    }

    // Mock auth fallback
    const mockUser = getMockUser();
    setUser(toAppUser(mockUser));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginWithEmail(email, password);
    if (result) {
      setUser(toAppUser(result as FirebaseUser | MockUser));
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    const result = await registerWithEmail(email, password, displayName);
    if (result) {
      setUser(toAppUser(result as FirebaseUser | MockUser));
    }
  };

  const googleLogin = async () => {
    const result = await loginWithGoogle();
    if (result) {
      setUser(toAppUser(result as FirebaseUser | MockUser));
    }
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
