import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Temporary High-Fidelity Skeletons to allow instant compilation
const PlaceholderView = ({ title, role }) => (
  <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl min-h-[calc(100vh-7rem)] backdrop-blur-sm">
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded w-max">
        {role} Tier Zone
      </span>
      <h1 className="text-2xl font-bold text-slate-100 tracking-tight">{title}</h1>
      <p className="text-sm text-slate-400 max-w-xl mt-1">
        This view pipeline is fully authenticated and bound within role-isolated memory boundaries. Backend pipeline handshakes will initialize here.
      </p>
    </div>
    <div className="mt-8 border border-dashed border-slate-800 rounded-xl h-96 flex items-center justify-center text-xs text-slate-600 font-mono tracking-wider">
      [ awaiting reactive feature-module implementation ]
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ================= PUBLIC ENTRY SEGMENTS ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ================= ROLE ISOLATION ROUTING MAPPED MATRIX ================= */}
          
          {/* STUDENT SEGMENT LAYER */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<PlaceholderView title="Workspace Hub" role="student" />} />
            <Route path="logs" element={<PlaceholderView title="Commit Trace Stream" role="student" />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* ADVISOR SEGMENT LAYER */}
          <Route path="/advisor" element={
            <ProtectedRoute allowedRoles={['advisor']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<PlaceholderView title="Control Board" role="advisor" />} />
            <Route path="trackers" element={<PlaceholderView title="Allocate Trackers" role="advisor" />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* ADMINISTRATIVE CONTROL LAYER */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<PlaceholderView title="Institutional Analytics" role="admin" />} />
            <Route path="users" element={<PlaceholderView title="Identity Profiles" role="admin" />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* ROOT GOVERNANCE LAYER */}
          <Route path="/superadmin" element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<PlaceholderView title="Platform Ecosystem" role="superadmin" />} />
            <Route path="settings" element={<PlaceholderView title="System Configurations" role="superadmin" />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* ================= FALLBACK ENGINE PROTECTION ================= */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;