import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useApi, fetchUsers } from '../services/api';
import { useTranslation } from 'react-i18next';
const UsersPage = () => {
    const api = useApi();
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const load = async () => {
        try {
            const data = await fetchUsers(api);
            setUsers(data);
        }
        catch (e) {
            // Likely 403 if not admin; silently ignore
        }
    };
    useEffect(() => { load(); }, []);
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "mb-3", children: t('users.title') }), users.length === 0 && _jsx("div", { className: "alert alert-warning", children: "No access or empty." }), _jsx("ul", { className: "list-group", children: users.map(u => _jsxs("li", { className: "list-group-item d-flex justify-content-between", children: [_jsx("span", { children: u.username }), _jsx("small", { className: "text-muted", children: u.roles && u.roles.join(',') })] }, u.id)) })] }));
};
export default UsersPage;
