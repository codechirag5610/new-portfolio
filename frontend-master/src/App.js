import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/index';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage/CaseStudiesPage';
import CaseStudyDetail from './pages/CaseStudyDetail/CaseStudyDetail';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
