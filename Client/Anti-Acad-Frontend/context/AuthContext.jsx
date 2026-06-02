import { useState, useEffect } from 'react';
import { AuthContext } from './authContextSetup';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronous session initialization loop on mount
  useEffect(() => {
    const restoreSession = () => {
      try {
        const storedToken = localStorage.getItem('acad_ghosting_token');
        const storedUser = localStorage.getItem('acad_ghosting_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Session tracking violation. Purging storage stacks:", error);
        localStorage.removeItem('acad_ghosting_token');
        localStorage.removeItem('acad_ghosting_user');
      } finally {
        // Drop barrier to allow ProtectedRoute execution to begin safely
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * Safe onboarding trigger upon clean backend login verification
   * @param {Object} userData - Expected shape: { id: string, email: string, role: 'student'|'advisor'|'admin'|'superadmin' }
   * @param {String} jwtToken - Valid authorization bearer token
   */
  const login = (userData, jwtToken) => {
    setLoading(true);
    localStorage.setItem('acad_ghosting_token', jwtToken);
    localStorage.setItem('acad_ghosting_user', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
    setLoading(false);
  };

  /**
   * Complete memory cleanup routine
   */
  const logout = () => {
    localStorage.removeItem('acad_ghosting_token');
    localStorage.removeItem('acad_ghosting_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};