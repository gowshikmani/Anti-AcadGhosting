import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  // Prevent routing flash conditions while checking localStorage credentials
  if (loading) {
    return (
      <div className="security-loading-screen">
        <p>Evaluating profile authorization level...</p>
      </div>
    );
  }

  // Guard Clause 1: User is completely unauthenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Guard Clause 2: Strict Isolation Mismatch Detected. Deflect instantly.
  if (user.role !== requiredRole) {
    console.warn(`Security Interception: Profile matching role '${user.role}' attempted unauthorized access to '${requiredRole}' sector.`);
    
    // Explicit 1-to-1 deflection layout logic to return users to their valid workspace
    switch (user.role) {
      case 'student':
        return <Navigate to="/student/dashboard" replace />;
      case 'advisor':
        return <Navigate to="/advisor/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'superadmin':
        return <Navigate to="/superadmin/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // Verification successful. Grant authorization and render children components.
  return <Outlet />;
};

export default ProtectedRoute;