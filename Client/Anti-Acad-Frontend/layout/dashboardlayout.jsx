import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Structural Sidebar Fixed to Left Edge */}
      <Sidebar />

      {/* Content Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">System Operational</span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Academic Integrity Guard v1.0
          </div>
        </header>

        {/* Inner Scrollable Window for Sub-pages */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;