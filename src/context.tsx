import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  defaultPets,
  initialNotifications,
  type PageId,
  type Pet,
  type Notification,
  type User,
} from '@/data';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  pets: Pet[];
  addPet: (pet: Pet) => void;
  removePet: (id: string) => void;
  notifications: Notification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>(defaultPets);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('carepet-dark');
    if (saved) {
      setDarkMode(saved === 'true');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('carepet-dark', String(darkMode));
  }, [darkMode]);

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);

  const login = useCallback((u: User) => {
    setUser(u);
    setAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const addPet = useCallback((pet: Pet) => {
    setPets((prev) => [...prev, pet]);
  }, []);

  const removePet = useCallback((id: string) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'success') => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate,
        darkMode,
        toggleDarkMode,
        user,
        login,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        pets,
        addPet,
        removePet,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllRead,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
