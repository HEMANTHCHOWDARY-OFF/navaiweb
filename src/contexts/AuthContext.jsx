import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const api = axios.create({
    baseURL: apiUrl,
    headers: {
      // Remove default Content-Type to allow axios to set it automatically for multipart/form-data
      // 'Content-Type': 'application/json',
    },
  });

  // Restore user and tokens from localStorage on initialization
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('navai_user');
      const storedAccessToken = localStorage.getItem('navai_access_token');
      const storedRefreshToken = localStorage.getItem('navai_refresh_token');
      if (storedUser && storedAccessToken && storedRefreshToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      setIsLoading(false);
    }
  }, []);

  // Refresh token function
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await api.post('/api/users/refresh', { refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem('navai_access_token', newAccessToken);
      localStorage.setItem('navai_refresh_token', newRefreshToken);

      return newAccessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      logout();
      return null;
    }
  }, [refreshToken]);

  // Request interceptor to handle 401 errors
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const newToken = await refreshAccessToken();
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [refreshAccessToken]);

  // Set axios default header when access token changes
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  const login = (userData, accessTokenData, refreshTokenData) => {
    setUser(userData);
    setAccessToken(accessTokenData);
    setRefreshToken(refreshTokenData);
    localStorage.setItem('navai_user', JSON.stringify(userData));
    localStorage.setItem('navai_access_token', accessTokenData);
    localStorage.setItem('navai_refresh_token', refreshTokenData);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('navai_user');
    localStorage.removeItem('navai_access_token');
    localStorage.removeItem('navai_refresh_token');
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    api,
    isAuthenticated: !!user && !!accessToken,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
