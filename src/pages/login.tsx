import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, signup, loginWithGoogle, logout, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        if (mode === 'login') {
          await login(email, password);
        } else {
          await signup(email, password);
        }
        navigate('/stats');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Authentication failed.';
        setError(message);
      }
  };

  const handleGoogleLogin = async () => {
    try {
        await loginWithGoogle();
        navigate('/stats');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Google login failed.';
        setError(message);
      }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Stat Tracker</h1>

      {user ? (
        <div className="text-center">
          <p className="mb-4">You’re logged in as <strong>{user.email}</strong></p>
          <button
            onClick={() => logout()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 mt-3 rounded hover:bg-gray-100"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4">
            {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
