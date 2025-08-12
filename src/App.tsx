import React from 'react';
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
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="bg-blue-600 text-white px-6 py-4 shadow">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <h1 className="text-xl font-bold">
              <Link to="/">Stat Tracker</Link>
            </h1>
            <div className="space-x-4 flex items-center">
              <Link to="/stats" className="hover:underline">All Stats</Link>
              <Link to="/stats/strength" className="hover:underline">Strength</Link>
              <Link to="/stats/endurance" className="hover:underline">Endurance</Link>
              <Link to="/stats/speed" className="hover:underline">Speed</Link>
              <Link to="/stats/skill" className="hover:underline">Skill</Link>
              <Link to="/stats/flexibility" className="hover:underline">Flexibility</Link>
              {user ? (
                <button onClick={logout} className="text-sm ml-2 hover:text-red-300">Logout</button>
              ) : (
                <Link to="/login" className="hover:underline">Login</Link>
              )}
            </div>
          </div>
        </nav>

        <main className="py-6 px-4">
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
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
