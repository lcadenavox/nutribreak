import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
const LoginPage = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    const nav = useNavigate();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const submit = (e) => {
        e.preventDefault();
        login(username, password);
        nav('/');
    };
    return (_jsx("div", { className: "row justify-content-center mt-5", children: _jsx("div", { className: "col-md-4", children: _jsx("div", { className: "card shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h4", { className: "card-title mb-3", children: t('login.title') }), _jsxs("form", { onSubmit: submit, className: "vstack gap-3", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", htmlFor: "nbUser", children: t('login.username') }), _jsx("input", { id: "nbUser", className: "form-control", value: username, placeholder: t('login.username'), onChange: e => setUsername(e.target.value) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", htmlFor: "nbPass", children: t('login.password') }), _jsx("input", { id: "nbPass", type: "password", className: "form-control", value: password, placeholder: t('login.password'), onChange: e => setPassword(e.target.value) })] }), _jsx("button", { type: "submit", className: "btn btn-primary w-100", children: t('login.submit') })] })] }) }) }) }));
};
export default LoginPage;
