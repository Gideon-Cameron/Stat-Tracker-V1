import React, { lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import StrengthStatPage from './pages/stats/strength';
import EnduranceStatPage from './pages/stats/endurance';
import SpeedStatPage from './pages/stats/speed';
import SkillStatPage from './pages/stats/skill';
import FlexibilityStatPage from './pages/stats/flexibility';
import StatsIndex from './pages/stats/index';
import LoginPage from './pages/login';
import { useAuth } from './context/AuthContext';
import Home from './pages/home';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import favicon from "./assets/favicon.png"

import Success from './pages/Success';
import Cancel from './pages/Cancel';
import About from './pages/About';
import Pricing from './pages/Pricing';

const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const RefundsPage = lazy(() => import('./pages/RefundsPage'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const RedirectIfLoggedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Landing page should use the full browser width
  const isLanding = location.pathname === "/landing";

  return (
    <div className="min-h-screen flex flex-col bg-[#0a192f] text-[#ccd6f6]">

      {/* Navbar */}

      <nav className="sticky top-0 z-50 border-b border-[#203554] bg-[#0E1B33]/95 px-8 py-5 text-[#ccd6f6] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,.25)]">

  <div className="mx-auto flex max-w-7xl items-center justify-between">

    {/* Logo */}

    <Link
      to="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <img
        src={favicon}
        alt="RankUp Logo"
        className="h-10 w-10 object-contain"
      />

      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-[#64ffda]">Rank</span>
        <span className="text-white">Up</span>
      </h1>
    </Link>

    {/* Navigation */}

    <div className="flex items-center gap-7 text-[15px] font-medium">

      <Link to="/stats" className="text-slate-300 transition hover:text-[#64ffda]">
        All Stats
      </Link>

      <Link
        id="strength-link"
        to="/stats/strength"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Strength
      </Link>

      <Link
        to="/stats/endurance"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Endurance
      </Link>

      <Link
        to="/stats/speed"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Speed
      </Link>

      <Link
        to="/stats/skill"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Skill
      </Link>

      <Link
        to="/stats/flexibility"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Flexibility
      </Link>

      <Link
        to="/about"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        About
      </Link>

      <Link
        to="/landing"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Landing
      </Link>

      <Link
        to="/pricing"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Pricing
      </Link>

      {user ? (
        <div className="ml-3 flex items-center gap-3">

          <Link
            to="/pricing"
            className="
              rounded-xl
              bg-[#64ffda]
              px-5
              py-2.5
              font-semibold
              text-[#0B1B33]
              shadow-[0_0_20px_rgba(100,255,218,.25)]
              transition-all
              hover:scale-[1.03]
              hover:bg-[#7AFFE2]
            "
          >
            Go Premium
          </Link>

          <button
            onClick={logout}
            className="
              rounded-xl
              border
              border-[#29476A]
              bg-[#132544]
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-300
              transition-all
              hover:border-[#64ffda]/40
              hover:text-white
              hover:bg-[#173053]
            "
          >
            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/login"
          className="
            rounded-xl
            border
            border-[#29476A]
            px-5
            py-2.5
            text-slate-300
            transition-all
            hover:border-[#64ffda]
            hover:text-white
          "
        >
          Log In
        </Link>
      )}

    </div>

  </div>

</nav>

      {/* Main Content */}

      {isLanding ? (
        <main className="flex-grow">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </main>
      ) : (
        <main className="mx-auto flex-grow max-w-6xl px-4 py-8">
          <Routes>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <LoginPage />
                </RedirectIfLoggedIn>
              }
            />

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

            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/refunds" element={<RefundsPage />} />

            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />

          </Routes>
        </main>
      )}

      <Footer />

    </div>
  );
}

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;