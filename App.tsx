
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { AuthProvider, useAuth } from './context/AuthContext';

import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import QDFManagementPage from './pages/QDFManagementPage';
import QualificationWorkspacePage from './pages/QualificationWorkspacePage';
import ValidationReviewPage from './pages/ValidationReviewPage';
import RegistryPage from './pages/RegistryPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import QDFDetailPage from './pages/QDFDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
};

const MainApp: React.FC = () => {
    const { theme } = useTheme();
    const { user } = useAuth();

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="qdf-management" element={<QDFManagementPage />} />
                    <Route path="qdf/:id" element={<QDFDetailPage />} />
                    <Route path="workspace/:formType" element={<QualificationWorkspacePage />} />
                    <Route path="workspace" element={<Navigate to="/workspace/profiling" replace />} />
                    <Route path="review" element={<ValidationReviewPage />} />
                    <Route path="registry" element={<RegistryPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;