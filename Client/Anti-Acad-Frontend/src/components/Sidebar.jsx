import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  // Centralized Tailwind styling blueprints for unified nav states
  const linkBaseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group";
  const activeClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5";
  const inactiveClass = "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent";

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between fixed top-0 left-0 z-40 select-none">
      
      {/* 1. BRANDING & APPLICATION HEADER */}
      <div>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800/60">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            {/* Embedded Mini App Logo referencing the Favicon design asset */}
            <svg className="w-5 h-5 text-slate-900 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-100">AcadGhosting</span>
            <span className="text-[11px] font-medium tracking-wider text-emerald-500 uppercase -mt-0.5">Guard Shield</span>
          </div>
        </div>

        {/* 2. DYNAMIC MUTUALLY EXCLUSIVE NAVIGATION ENGINE */}
        <nav className="p-4 flex flex-col gap-1.5">
          
          {/* ====== STUDENT BOUNDARY LAYER ====== */}
          {user?.role === 'student' && (
            <>
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Student Workspace</div>
              <NavLink 
                to="/student/dashboard" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-workspace" />
                </svg>
                <span>Workspace Hub</span>
              </NavLink>
              <NavLink 
                to="/student/logs" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-trace" />
                </svg>
                <span>Commit Trace Stream</span>
              </NavLink>
            </>
          )}

          {/* ====== ADVISOR BOUNDARY LAYER ====== */}
          {user?.role === 'advisor' && (
            <>
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Advisor Portal</div>
              <NavLink 
                to="/advisor/dashboard" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-control" />
                </svg>
                <span>Control Board</span>
              </NavLink>
              <NavLink 
                to="/advisor/trackers" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-tracker" />
                </svg>
                <span>Allocate Trackers</span>
              </NavLink>
            </>
          )}

          {/* ====== ADMINISTRATIVE BOUNDARY LAYER ====== */}
          {user?.role === 'admin' && (
            <>
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Admin Control Panel</div>
              <NavLink 
                to="/admin/dashboard" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-analytics" />
                </svg>
                <span>Institutional Analytics</span>
              </NavLink>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-users" />
                </svg>
                <span>Identity Profiles</span>
              </NavLink>
            </>
          )}

          {/* ====== SUPERADMIN GLOBAL BOUNDARY LAYER ====== */}
          {user?.role === 'superadmin' && (
            <>
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Root Governance</div>
              <NavLink 
                to="/superadmin/dashboard" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-global" />
                </svg>
                <span>Platform Ecosystem</span>
              </NavLink>
              <NavLink 
                to="/superadmin/settings" 
                className={({ isActive }) => `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <svg className="w-5 h-5 transition-colors duration-200">
                  <use href="/icons.svg#icon-settings" />
                </svg>
                <span>System Configurations</span>
              </NavLink>
            </>
          )}

        </nav>
      </div>

      {/* 3. FOOTER IDENTITY & TERMINATE SESSION BLOCK */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
        <div className="flex items-center gap-3 px-2 py-3 mb-3 bg-slate-900/40 border border-slate-800/40 rounded-xl">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700/60 flex items-center justify-center font-bold text-slate-200 text-xs border border-slate-700/50 uppercase tracking-wider shadow-inner">
            {user?.name ? user.name.substring(0, 2) : 'US'}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Active Officer'}</span>
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400 mt-0.5 bg-emerald-500/5 border border-emerald-500/10 rounded px-1.5 py-0.5 w-max">
              {user?.role}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 active:scale-[0.98] transition-all duration-150"
        >
          <svg className="w-4 h-4 text-rose-400">
            <use href="/icons.svg#icon-logout" />
          </svg>
          Terminate Session
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;