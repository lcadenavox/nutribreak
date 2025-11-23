import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { getSuggestion } from '../services/api';
import { useApi } from '../services/api';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
const DashboardPage = () => {
    const api = useApi();
    const { t } = useTranslation();
    const [req, setReq] = useState({ language: i18n.language, mood: 5, energy: 5 });
    const [resp, setResp] = useState(null);
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setLoading(true);
        try {
            const data = await getSuggestion(req, api);
            setResp(data);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "mb-3", children: t('suggestion.title') }), _jsxs("form", { className: "row g-3 align-items-end", onSubmit: e => { e.preventDefault(); submit(); }, children: [_jsxs("div", { className: "col-auto", children: [_jsx("label", { className: "form-label", htmlFor: "moodInput", children: t('form.mood') }), _jsx("input", { id: "moodInput", className: "form-control", type: "number", min: 1, max: 10, value: req.mood, onChange: e => setReq(r => ({ ...r, mood: +e.target.value })) })] }), _jsxs("div", { className: "col-auto", children: [_jsx("label", { className: "form-label", htmlFor: "energyInput", children: t('form.energy') }), _jsx("input", { id: "energyInput", className: "form-control", type: "number", min: 1, max: 10, value: req.energy, onChange: e => setReq(r => ({ ...r, energy: +e.target.value })) })] }), _jsxs("div", { className: "col-auto", children: [_jsx("label", { className: "form-label", htmlFor: "screenInput", children: t('form.screen') }), _jsx("input", { id: "screenInput", className: "form-control", type: "number", value: req.screenTimeMinutes || 0, onChange: e => setReq(r => ({ ...r, screenTimeMinutes: +e.target.value })) })] }), _jsxs("div", { className: "col-auto", children: [_jsx("label", { className: "form-label", htmlFor: "langSelect", children: t('form.lang') }), _jsxs("select", { id: "langSelect", className: "form-select", value: req.language, onChange: e => setReq(r => ({ ...r, language: e.target.value })), children: [_jsx("option", { value: "en", children: "EN" }), _jsx("option", { value: "pt", children: "PT" })] })] }), _jsx("div", { className: "col-auto", children: _jsx("button", { type: "submit", className: "btn btn-primary", disabled: loading, children: loading ? '...' : t('suggestion.get') }) })] }), resp && (_jsx("div", { className: "card mt-4", children: _jsxs("div", { className: "card-body", children: [_jsx("h5", { className: "card-title", children: resp.recommendedBreakType }), _jsx("p", { className: "card-text", children: resp.suggestionText }), _jsx("span", { className: "badge text-bg-secondary", children: resp.recommendedMealIdea })] }) }))] }));
};
export default DashboardPage;
