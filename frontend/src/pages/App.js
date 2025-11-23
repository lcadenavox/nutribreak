import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const Protected = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/login", replace: true });
};
const AppContent = () => {
    const { t } = useTranslation();
    const { isAuthenticated, logout } = useAuth();
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark mb-3", children: _jsxs("div", { className: "container-fluid", children: [_jsx(Link, { className: "navbar-brand", to: "/", children: "NutriBreak" }), _jsxs("div", { className: "collapse navbar-collapse show", children: [_jsxs("ul", { className: "navbar-nav me-auto mb-2 mb-lg-0", children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/", children: t('nav.dashboard') }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/meals", children: t('nav.meals') }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/breaks", children: t('nav.breaks') }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link", to: "/users", children: t('nav.users') }) })] }), _jsxs("div", { className: "d-flex gap-2 align-items-center", children: [_jsx(LanguageSwitcher, {}), isAuthenticated && _jsx("button", { className: "btn btn-sm btn-outline-light", onClick: logout, children: t('nav.logout') })] })] })] }) }), _jsx("div", { className: "container nb-container", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/", element: _jsx(Protected, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/meals", element: _jsx(Protected, { children: _jsx(MealsPage, {}) }) }), _jsx(Route, { path: "/breaks", element: _jsx(Protected, { children: _jsx(BreaksPage, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(Protected, { children: _jsx(UsersPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) })] }));
};
const App = () => (_jsx(AuthProvider, { children: _jsx(AppContent, {}) }));
export default App;
