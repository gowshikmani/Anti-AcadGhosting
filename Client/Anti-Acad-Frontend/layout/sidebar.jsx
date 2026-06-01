import { usecontext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Sidebar = () => {
    const { logout } = usecontext(AuthContext);
    const navigate = useNavigate();

    const navItems = [
        {path: '/student-dashboard', label: 'My Milestones', roles: ['student']},
        {path: '/submit-work', label: 'Submit Deliverables', roles: ['student']},

        {path: '/advisor-dashboard', label: 'Plagiarism/Ghosting Alert', roles: ['advisor', 'admin']},
        {path: '/review-milestones', label: 'Review Submissions', roles:['advisor']},
        {path: '/analomy-logos', label: 'Plagrism/Ghosting Alert', roles: ['advisor', 'admin']},

        {path: '/admin-dashboard', label: 'Department Overview', roles: ['admin', 'superadmin']},
        {path: '/system-settings', label: 'Global Infrastructure', roles: ['superadmin']}, 
    ];

    const visibleItems = navItems.filter(item => item.roles.includes(user?.role));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return (
        <div className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800">
            <div className="p-6">
                {/* Brand Header */}
                <div className="mb-8">
                    <h1 className="text-xl font-bold tracking-wider text-blue-400">ANTI-GHOSTING</h1>
          <p className="text-xs text-slate-400 uppercase font-semibold tracking-widest mt-1">Portal Platform</p>
        </div>

        {/* Dynamic Nav Links */}
        <nav className="space-y-1">
          <NavLink
            to={user?.role ? `/${user.role}-dashboard` : '/login'}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            Dashboard Home
          </NavLink>

          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between mb-4">
          <div className="truncate pr-2">
            <p className="text-sm font-medium truncate text-slate-200">{user?.name || 'Anonymous User'}</p>
            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 mt-1 rounded bg-slate-800 text-blue-400 border border-slate-700">
              {user?.role}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-center px-4 py-2 text-sm font-medium text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg hover:bg-red-900/40 hover:text-red-300 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;