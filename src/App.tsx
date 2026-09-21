import { AppProvider, useApp } from '@/context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toasts from '@/components/Toasts';
import AuthModal from '@/components/AuthModal';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import VeterinariansPage from '@/pages/VeterinariansPage';
import PricingPage from '@/pages/PricingPage';
import AppointmentPage from '@/pages/AppointmentPage';
import MyPetsPage from '@/pages/MyPetsPage';
import EmergencyPage from '@/pages/EmergencyPage';

function PageRouter() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'services':
      return <ServicesPage />;
    case 'veterinarians':
      return <VeterinariansPage />;
    case 'pricing':
      return <PricingPage />;
    case 'appointment':
      return <AppointmentPage />;
    case 'my-pets':
      return <MyPetsPage />;
    case 'emergency':
      return <EmergencyPage />;
    default:
      return <HomePage />;
  }
}

function AppContent() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink-900 transition-colors dark:bg-ink-950 dark:text-white">
      <Navbar />
      <main className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <AuthModal />
      <Toasts />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
