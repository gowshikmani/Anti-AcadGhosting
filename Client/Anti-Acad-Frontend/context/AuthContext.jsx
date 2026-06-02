import { createContext, useState, useEffect } from 'react';

// Create the context identity gate
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronous session initialization loop on mount
  useEffect(() => {
    const initializeSession = () => {
      try {
        const storedToken = localStorage.getItem('integrity_token');
        const storedUser = localStorage.getItem('integrity_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Session restoration failure. Securing perimeter:", error);
        // Wipe contaminated or corrupt state instances
        localStorage.removeItem('integrity_token');
        localStorage.removeItem('integrity_user');
      } finally {
        // Drop loading flag to signal ProtectedRoute that evaluations can begin
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  /**
   * Orchestrate explicit, safe user onboarding upon API clearance
   * @param {Object} userData - Contains unique identifiers and exact isolated role string
   * @param {String} jwtToken - Verified signature payload from your Express API
   */
  const login = (userData, jwtToken) => {
    setLoading(true);
    
    // Lock into physical localStorage memory bounds
    localStorage.setItem('integrity_token', jwtToken);
    localStorage.setItem('integrity_user', JSON.stringify(userData));
    
    // Set active memory hooks
    setToken(jwtToken);
    setUser(userData);
    
    setLoading(false);
  };

  /**
   * Explicitly purge access tokens and clear memory stacks
   */
  const logout = () => {
    localStorage.removeItem('integrity_token');
    localStorage.removeItem('integrity_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};