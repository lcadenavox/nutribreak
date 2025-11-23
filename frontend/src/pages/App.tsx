import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import MealsPage from './MealsPage';
import BreaksPage from './BreaksPage';
import UsersPage from './UsersPage';
import NotFoundPage from './NotFoundPage';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NutriBreak</Link>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">{t('nav.dashboard')}</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/meals">{t('nav.meals')}</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/breaks">{t('nav.breaks')}</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">{t('nav.users')}</Link></li>
            </ul>
            <div className="d-flex gap-2 align-items-center">
              <LanguageSwitcher />
              {isAuthenticated && <button className="btn btn-sm btn-outline-light" onClick={logout}>{t('nav.logout')}</button>}
            </div>
          </div>
        </div>
      </nav>
      <div className="container nb-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Protected><DashboardPage /></Protected>} />
          <Route path="/meals" element={<Protected><MealsPage /></Protected>} />
          <Route path="/breaks" element={<Protected><BreaksPage /></Protected>} />
          <Route path="/users" element={<Protected><UsersPage /></Protected>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
