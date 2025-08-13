import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, signup, loginWithGoogle, logout, resetPassword, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/');
      } else if (mode === 'signup') {
        await signup(email, password);
        navigate('/');
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setMessage('Password reset email sent! Please check your inbox.');
        setMode('login');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed.';
      setError(message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google login failed.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a192f] px-4">
      <h1 className="text-3xl font-bold text-[#64ffda] mb-8">Stat Tracker</h1>

      {user ? (
        <div className="bg-[#112240] p-6 rounded-md shadow-lg w-full max-w-sm text-center">
          <p className="mb-4 text-[#ccd6f6]">
            You’re logged in as <strong>{user.email}</strong>
          </p>
          <button
            onClick={() => logout()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-[#112240] p-6 rounded-md shadow-lg w-full max-w-sm">
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#0a192f] text-[#ccd6f6] border border-[#233554] focus:border-[#64ffda] focus:outline-none"
            />

            {mode !== 'forgot' && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-[#0a192f] text-[#ccd6f6] border border-[#233554] focus:border-[#64ffda] focus:outline-none"
              />
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <button
              type="submit"
              className="w-full bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:brightness-110 transition"
            >
              {mode === 'login' && 'Log In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Email'}
            </button>

            {mode === 'login' && (
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-[#0a192f] border border-[#64ffda] text-[#64ffda] py-2 mt-3 rounded hover:bg-[#112240] transition"
              >
                Continue with Google
              </button>
            )}

            <div className="text-sm text-center mt-4 text-[#8892b0]">
              {mode === 'login' && (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-[#64ffda] hover:underline"
                    onClick={() => setMode('signup')}
                  >
                    Create one
                  </button>
                  <br />
                  <button
                    type="button"
                    className="text-[#64ffda] hover:underline mt-2"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot your password?
                  </button>
                </>
              )}
              {mode === 'signup' && (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="text-[#64ffda] hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Log in
                  </button>
                </>
              )}
              {mode === 'forgot' && (
                <>
                  Remember your password?{' '}
                  <button
                    type="button"
                    className="text-[#64ffda] hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
