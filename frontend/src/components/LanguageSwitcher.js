import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
const LanguageSwitcher = () => {
    const { i18n: inst } = useTranslation();
    const current = inst.language;
    const change = (lng) => {
        inst.changeLanguage(lng);
        localStorage.setItem('nb_lang', lng);
    };
    return (_jsxs("div", { className: "btn-group", role: "group", "aria-label": "Language switcher", children: [_jsx("button", { type: "button", className: `btn btn-sm btn-outline-light ${current === 'en' ? 'active' : ''}`, onClick: () => change('en'), children: "EN" }), _jsx("button", { type: "button", className: `btn btn-sm btn-outline-light ${current === 'pt' ? 'active' : ''}`, onClick: () => change('pt'), children: "PT" })] }));
};
export default LanguageSwitcher;
