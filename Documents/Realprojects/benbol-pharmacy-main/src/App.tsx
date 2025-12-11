import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import RefillFormPage from './pages/RefillFormPage';
import AppointmentFormPage from './pages/AppointmentFormPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'faq':
        return <FAQPage />;
      case 'refill':
        return <RefillFormPage onNavigate={handleNavigate} />;
      case 'appointment':
        return <AppointmentFormPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <Chatbot />
    </div>
  );
}

export default App;
