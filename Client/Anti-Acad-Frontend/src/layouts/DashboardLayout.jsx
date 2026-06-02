import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Mounted globally on all protected dashboard groups */}
      <Sidebar />

      {/* Main viewport segment shifted right to clear space for the Sidebar */}
      <main className="flex-1 pl-64 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet /> {/* This will render your active dashboard page views dynamically */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;