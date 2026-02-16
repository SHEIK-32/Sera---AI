import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setAuth: (user, token) => {
    set({ user, token, isLoading: false });
    // Persist to storage
    if (token) {
      // AsyncStorage.setItem('token', token);
    }
  },
  logout: () => set({ user: null, token: null }),
  setLoading: (isLoading) => set({ isLoading }),
}));
