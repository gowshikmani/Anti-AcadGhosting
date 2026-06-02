import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  // 1. Establish state variables for input capturing
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role matching user profile
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // 2. Transmit payload to your Express API engine
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // 3. Hand token data over to global context memory
      login(data.user, data.token);

      // 4. Divert the navigation course based on the verified server role
      if (data.user.role === 'student') navigate('/student-dashboard');
      else if (data.user.role === 'advisor') navigate('/advisor-dashboard');
      else if (data.user.role === 'admin') navigate('/admin-dashboard');
      else if (data.user.role === 'superadmin') navigate('/system-settings');
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-950 px-4 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
        
        {/* Branding Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-400">ANTI-GHOSTING</h2>
          <p className="text-sm text-slate-400 mt-2">Academic Integrity Authentication Portal</p>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-xs px-4 py-3 rounded-lg flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Interactive Form Context */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Role Selector Deck */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Portal Access Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['student', 'advisor'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-3 text-sm font-semibold border rounded-xl capitalize transition-all ${
                    role === r
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {r} View
                </button>
              ))}
            </div>
          </div>

          {/* Email Address Block */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Institutional Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="username@university.edu"
            />
          </div>

          {/* Secure Password Block */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Security Token Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Action Execution Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
          >
            {isSubmitting ? 'Verifying Integrity Passport...' : 'Access Safe Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;