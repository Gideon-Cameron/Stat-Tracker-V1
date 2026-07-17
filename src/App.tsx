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
<<<<<<< HEAD
import LandingPage from './pages/LandingPage';
=======
>>>>>>> 30019b2e1f1baff8571eab07503bdad94e3f8870
import Footer from './components/Footer';

import Success from './pages/Success';
import Cancel from './pages/Cancel';
<<<<<<< HEAD
import About from './pages/About';
import Pricing from './pages/Pricing';
=======
import About from './pages/About';   // <-- About page
import Pricing from './pages/Pricing'; // <-- Pricing page
>>>>>>> 30019b2e1f1baff8571eab07503bdad94e3f8870

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

<<<<<<< HEAD
      {/* Navbar */}

      <nav className="sticky top-0 z-50 border-b border-[#233554] bg-[#112240] px-6 py-4 text-[#ccd6f6] shadow-lg">

        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <h1 className="text-xl font-bold text-[#64ffda] transition-colors hover:text-[#52e0c4]">
            <Link to="/">Stat Tracker</Link>
          </h1>

          <div className="flex items-center space-x-4">

            <Link to="/stats" className="transition-colors hover:text-[#64ffda]">
              All Stats
            </Link>

            <Link
              id="strength-link"
              to="/stats/strength"
              className="transition-colors hover:text-[#64ffda]"
            >
              Strength
            </Link>

            <Link
              to="/stats/endurance"
              className="transition-colors hover:text-[#64ffda]"
            >
              Endurance
            </Link>

            <Link
              to="/stats/speed"
              className="transition-colors hover:text-[#64ffda]"
            >
              Speed
            </Link>

            <Link
              to="/stats/skill"
              className="transition-colors hover:text-[#64ffda]"
            >
              Skill
            </Link>

            <Link
              to="/stats/flexibility"
              className="transition-colors hover:text-[#64ffda]"
            >
              Flexibility
            </Link>

            <Link
              to="/about"
              className="transition-colors hover:text-[#64ffda]"
            >
              About
            </Link>

            <Link
              to="/landing"
              className="transition-colors hover:text-[#64ffda]"
            >
              Landing
            </Link>

            <Link
              to="/pricing"
              className="transition-colors hover:text-[#64ffda]"
            >
              Pricing
            </Link>

            {user ? (
              <>
=======
              {user ? (
                <>
                  <Link
                    to="/pricing"
                    className="bg-[#64ffda] text-[#0a192f] font-semibold px-3 py-1 rounded hover:bg-[#52e0c4] transition-colors"
                  >
                    Go Premium
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm ml-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
>>>>>>> 30019b2e1f1baff8571eab07503bdad94e3f8870
                <Link
                  to="/pricing"
                  className="rounded bg-[#64ffda] px-3 py-1 font-semibold text-[#0a192f] transition-colors hover:bg-[#52e0c4]"
                >
                  Go Premium
                </Link>

<<<<<<< HEAD
                <button
                  onClick={logout}
                  className="ml-2 text-sm text-red-400 transition-colors hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="transition-colors hover:text-[#64ffda]"
              >
                Login
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
=======
        {/* Main Content */}
        <main className="flex-grow py-8 px-4">
          <div className="max-w-6xl mx-auto">
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

              {/* ✅ Public Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </div>
>>>>>>> 30019b2e1f1baff8571eab07503bdad94e3f8870
        </main>
      )}

<<<<<<< HEAD
      <Footer />

    </div>
=======
        
        <Footer />
      </div>
    </Router>
>>>>>>> 30019b2e1f1baff8571eab07503bdad94e3f8870
  );
}

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;