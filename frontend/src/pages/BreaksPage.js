import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useApi, fetchBreaks, createBreak } from '../services/api';
import { useTranslation } from 'react-i18next';
const BreaksPage = () => {
    const api = useApi();
    const { t } = useTranslation();
    const [breaks, setBreaks] = useState([]);
    const [breakType, setBreakType] = useState('MICRO');
    const load = async () => {
        const data = await fetchBreaks(api);
        setBreaks(data);
    };
    useEffect(() => { load(); }, []);
    const submit = async (e) => {
        e.preventDefault();
        await createBreak({ breakType }, api);
        load();
    };
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "mb-3", children: t('breaks.title') }), _jsxs("form", { className: "row g-2 mb-3", onSubmit: submit, children: [_jsxs("div", { className: "col-auto", children: [_jsx("label", { htmlFor: "breakTypeSelect", className: "form-label", children: t('break.type') }), _jsxs("select", { id: "breakTypeSelect", className: "form-select", value: breakType, onChange: e => setBreakType(e.target.value), children: [_jsx("option", { value: "MICRO", children: "MICRO" }), _jsx("option", { value: "STRETCH", children: "STRETCH" }), _jsx("option", { value: "MEAL", children: "MEAL" }), _jsx("option", { value: "FOCUS_RESET", children: "FOCUS_RESET" })] })] }), _jsx("div", { className: "col-auto align-self-end", children: _jsx("button", { type: "submit", className: "btn btn-success", children: t('btn.add') }) })] }), _jsx("ul", { className: "list-group", children: breaks.map(b => _jsx("li", { className: "list-group-item", children: b.breakType }, b.id)) })] }));
};
export default BreaksPage;
