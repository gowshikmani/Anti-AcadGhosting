import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Unauthorized = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReturnToDomain = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Dynamic recovery matrix based on user's legitimate profile role
    switch (user.role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'advisor':
        navigate('/advisor/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'superadmin':
        navigate('/superadmin/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="unauthorized-container">
      <div className="error-card">
        <span className="error-code">403</span>
        <h1>Access Explicitly Revoked</h1>
        <p>Your current user access profile token does not possess authorization permissions to enter this sector segment.</p>
        <button onClick={handleReturnToDomain} className="btn-return">
          Return to Authorized Workspace
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;