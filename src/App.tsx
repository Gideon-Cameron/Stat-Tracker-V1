import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import StrengthStatPage from './pages/stats/strength';
import EnduranceStatPage from './pages/stats/endurance';
import SpeedStatPage from './pages/stats/speed';
import SkillStatPage from './pages/stats/skill';
import FlexibilityStatPage from './pages/stats/flexibility';
import StatsIndex from './pages/stats/index';
import LoginPage from './pages/login';
import { useAuth } from './context/AuthContext';
import Home from './pages/home';
import PremiumButton from './components/PremiumButton';
import Footer from './components/Footer';

// ✅ New imports
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import About from './pages/About'; // <-- Import About page

const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const RefundsPage = lazy(() => import('./pages/RefundsPage'));

// Protects routes for logged-in users only
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Redirects logged-in users away from the login page
const RedirectIfLoggedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0a192f] text-[#ccd6f6]">
        {/* Navbar */}
        <nav className="bg-[#112240] text-[#ccd6f6] px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-[#233554]">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-xl font-bold text-[#64ffda] hover:text-[#52e0c4] transition-colors">
              <Link to="/">Stat Tracker</Link>
            </h1>
            <div className="space-x-4 flex items-center">
              <Link
                to="/stats"
                className="hover:text-[#64ffda] transition-colors"
              >
                All Stats
              </Link>
              <Link
                id="strength-link"
                to="/stats/strength"
                className="hover:text-[#64ffda] transition-colors"
              >
                Strength
              </Link>
              <Link
                to="/stats/endurance"
                className="hover:text-[#64ffda] transition-colors"
              >
                Endurance
              </Link>
              <Link
                to="/stats/speed"
                className="hover:text-[#64ffda] transition-colors"
              >
                Speed
              </Link>
              <Link
                to="/stats/skill"
                className="hover:text-[#64ffda] transition-colors"
              >
                Skill
              </Link>
              <Link
                to="/stats/flexibility"
                className="hover:text-[#64ffda] transition-colors"
              >
                Flexibility
              </Link>
              <Link
                to="/about"
                className="hover:text-[#64ffda] transition-colors"
              >
                About
              </Link>

              {user ? (
                <>
                  <PremiumButton firebaseUserId={user.uid} email={user.email ?? ''} />
                  <button
                    onClick={logout}
                    className="text-sm ml-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-[#64ffda] transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow py-8 px-4 max-w-6xl mx-auto">
          <Routes>
            {/* Home page requires login */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Login page redirects if already logged in */}
            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <LoginPage />
                </RedirectIfLoggedIn>
              }
            />

            {/* Stats pages require login */}
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <StatsIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats/strength"
              element={
                <ProtectedRoute>
                  <StrengthStatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats/endurance"
              element={
                <ProtectedRoute>
                  <EnduranceStatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats/speed"
              element={
                <ProtectedRoute>
                  <SpeedStatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats/skill"
              element={
                <ProtectedRoute>
                  <SkillStatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats/flexibility"
              element={
                <ProtectedRoute>
                  <FlexibilityStatPage />
                </ProtectedRoute>
              }
            />

            {/* ✅ Paddle checkout redirects */}
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

            {/* ✅ Legal Pages */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/refunds" element={<RefundsPage />} />

            {/* ✅ About Page */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* ✅ Footer on every page */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
