import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Prevent routing flash while reading localStorage authentication states
  if (loading) {
    return (
      <div className="auth-loading-screen">
        <p>Verifying role clear level...</p>
      </div>
    );
  }

  // Guard Clause 1: User is completely unauthenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Guard Clause 2: User role is not explicitly whitelisted for this route segment
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorization matches perfectly. Render child dashboard elements.
  return <Outlet />;
};

export default ProtectedRoute;