import React, { lazy, useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsMenuOpen, setStatsMenuOpen] = useState(false);

  // Landing page should use the full browser width
  const isLanding =
  location.pathname === "/" ||
  location.pathname === "/landing";

  return (
    <div className="min-h-screen flex flex-col bg-[#0a192f] text-[#ccd6f6]">

      {/* Navbar */}

      <nav className="sticky top-0 z-50 border-b border-[#203554] bg-[#0E1B33]/95 px-4 py-4 text-[#ccd6f6] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,.25)]">

  <div className="mx-auto flex max-w-7xl items-center justify-between">

    {/* Logo */}

    <Link
      to="/dashboard"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
      onClick={() => setMobileMenuOpen(false)}
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

    {/* ============================
        Desktop Navigation
    ============================= */}

    <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">

      {/* Stats Dropdown */}

      <div className="relative group">

        <button className="flex items-center gap-1 text-slate-300 transition hover:text-[#64ffda]">
          Stats
          <span className="text-xs">▼</span>
        </button>

        <div className="invisible absolute left-0 mt-3 w-56 rounded-xl border border-[#29476A] bg-[#132544] p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">

          <Link
            to="/stats"
            className="block rounded-lg px-3 py-2 hover:bg-[#1B3155]"
          >
            All Stats
          </Link>

          <hr className="my-2 border-slate-700" />

          <Link
            to="/stats/strength"
            className="block rounded-lg px-3 py-2 hover:bg-[#1B3155]"
          >
            Strength
          </Link>

          <Link
            to="/stats/endurance"
            className="block rounded-lg px-3 py-2 hover:bg-[#1B3155]"
          >
            Endurance
          </Link>

          <Link
            to="/stats/speed"
            className="block rounded-lg px-3 py-2 hover:bg-[#1B3155]"
          >
            Speed
          </Link>

          <Link
            to="/stats/skill"
            className="block rounded-lg px-3 py-2 hover:bg-[#1B3155]"
          >
            Skill
          </Link>

          <Link
            to="/stats/flexibility"
            className="block rounded-lg px-3 py-2 hover:bg-[#1B3155]"
          >
            Flexibility
          </Link>

        </div>

      </div>

      

      <Link
        to="/landing"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        Home
      </Link>

      <Link
        to="/about"
        className="text-slate-300 transition hover:text-[#64ffda]"
      >
        About
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
            className="rounded-xl bg-[#64ffda] px-5 py-2.5 font-semibold text-[#0B1B33] shadow-[0_0_20px_rgba(100,255,218,.25)] transition hover:scale-[1.03] hover:bg-[#7AFFE2]"
          >
            Go Premium
          </Link>

          <button
            onClick={logout}
            className="rounded-xl border border-[#29476A] bg-[#132544] px-4 py-2.5 text-sm text-slate-300 transition hover:border-[#64ffda]/40 hover:bg-[#173053] hover:text-white"
          >
            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/login"
          className="rounded-xl border border-[#29476A] px-5 py-2.5 text-slate-300 transition hover:border-[#64ffda] hover:text-white"
        >
          Log In
        </Link>
      )}

    </div>

    {/* ============================
        Mobile Hamburger
    ============================= */}

    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="rounded-lg p-2 text-3xl text-white transition hover:bg-[#173053] md:hidden"
    >
      {mobileMenuOpen ? "✕" : "☰"}
    </button>

  </div>

  {/* ============================
      Mobile Menu
  ============================= */}

  {mobileMenuOpen && (

    <div className="mt-4 space-y-2 rounded-2xl border border-[#29476A] bg-[#132544] p-5 md:hidden">

      <button
        onClick={() => setStatsMenuOpen(!statsMenuOpen)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-lg hover:bg-[#173053]"
      >
        <span>Stats</span>
        <span>{statsMenuOpen ? "−" : "+"}</span>
      </button>

      {statsMenuOpen && (

        <div className="ml-4 flex flex-col">

          <Link
            to="/stats"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-[#173053]"
          >
            All Stats
          </Link>

          <Link
            to="/stats/strength"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-[#173053]"
          >
            Strength
          </Link>

          <Link
            to="/stats/endurance"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-[#173053]"
          >
            Endurance
          </Link>

          <Link
            to="/stats/speed"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-[#173053]"
          >
            Speed
          </Link>

          <Link
            to="/stats/skill"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-[#173053]"
          >
            Skill
          </Link>

          <Link
            to="/stats/flexibility"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg px-3 py-2 hover:bg-[#173053]"
          >
            Flexibility
          </Link>

        </div>

      )}

      <Link
        to="/about"
        onClick={() => setMobileMenuOpen(false)}
        className="block rounded-lg px-2 py-3 hover:bg-[#173053]"
      >
        About
      </Link>

      <Link
        to="/landing"
        onClick={() => setMobileMenuOpen(false)}
        className="block rounded-lg px-2 py-3 hover:bg-[#173053]"
      >
        Landing
      </Link>

      <Link
        to="/pricing"
        onClick={() => setMobileMenuOpen(false)}
        className="block rounded-lg px-2 py-3 hover:bg-[#173053]"
      >
        Pricing
      </Link>

      {user ? (

        <>

          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 block rounded-xl bg-[#64ffda] px-4 py-3 text-center font-semibold text-[#0B1B33]"
          >
            Go Premium
          </Link>

          <button
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
            }}
            className="mt-2 w-full rounded-xl border border-[#29476A] bg-[#173053] px-4 py-3"
          >
            Logout
          </button>

        </>

      ) : (

        <Link
          to="/login"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-3 block rounded-xl border border-[#29476A] px-4 py-3 text-center"
        >
          Log In
        </Link>

      )}

    </div>

  )}

</nav>

      {/* Main Content */}

      {isLanding ? (
        <main className="flex-grow">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </main>
      ) : (
        <main className="mx-auto flex-grow max-w-7xl px-6 py-6">
          <Routes>

            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/dashboard"
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