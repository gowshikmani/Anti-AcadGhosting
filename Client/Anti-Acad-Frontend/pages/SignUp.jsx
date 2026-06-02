import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { user, loading, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Registration Payload State Vector
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Mutually exclusive system options: 'student' or 'advisor'
    institutionKey: '' // Safeguard validation asset key
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Route Deflection Interceptor
  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case 'student': navigate('/student/dashboard'); break;
        case 'advisor': navigate('/advisor/dashboard'); break;
        case 'admin': navigate('/admin/dashboard'); break;
        case 'superadmin': navigate('/superadmin/dashboard'); break;
        default: break;
      }
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Pre-flight client validation matrices
    if (formData.password !== formData.confirmPassword) {
      return setError('Password signatures do not match.');
    }
    if (formData.password.length < 8) {
      return setError('Password must consist of at least 8 security units.');
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          institutionKey: formData.institutionKey
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Onboarding allocation failed.');
      }

      // Automatically initialize authenticated session upon deployment success
      login(data.user, data.token);
    } catch (err) {
      setError(err.message || 'Network disruption intercepted.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased text-slate-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/10">
          <svg className="w-6 h-6 text-slate-950 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
          Create Security Profile
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400 tracking-wide uppercase font-medium">
          Onboard into Anti-Ghosting Shield Core
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/60 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-slate-800/80 sm:px-10">
          
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs font-medium text-rose-300 leading-relaxed">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Split row field layout for full visibility scaling */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Full Account Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Application Role Tier
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                >
                  <option value="student">Student Account</option>
                  <option value="advisor">Project Advisor</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Institutional Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                placeholder="id@university.edu"
              />
            </div>

            <div>
              <label htmlFor="institutionKey" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Institutional Validation Access Key
              </label>
              <input
                id="institutionKey"
                name="institutionKey"
                type="text"
                required
                value={formData.institutionKey}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                placeholder="CAMPUS-AUTH-XYZ123"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Password Signature
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Confirm Signature
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? 'Registering Access Matrix...' : 'Commit Core Registration'}
              </button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-800/60 text-center">
            <p className="text-xs text-slate-400">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4">
                Execute Core Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;