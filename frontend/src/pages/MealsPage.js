import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useApi, fetchMeals, createMeal } from '../services/api';
import { useTranslation } from 'react-i18next';
const MealsPage = () => {
    const api = useApi();
    const { t } = useTranslation();
    const [meals, setMeals] = useState([]);
    const [name, setName] = useState('');
    const load = async () => {
        const data = await fetchMeals(api);
        setMeals(data);
    };
    useEffect(() => { load(); }, []);
    const submit = async (e) => {
        e.preventDefault();
        if (!name)
            return;
        await createMeal({ name }, api);
        setName('');
        load();
    };
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "mb-3", children: t('meals.title') }), _jsxs("form", { className: "row g-2 mb-3", onSubmit: submit, children: [_jsx("div", { className: "col-auto flex-grow-1", children: _jsx("input", { className: "form-control", value: name, placeholder: t('meal.placeholder'), onChange: e => setName(e.target.value) }) }), _jsx("div", { className: "col-auto", children: _jsx("button", { type: "submit", className: "btn btn-success", children: t('btn.add') }) })] }), _jsx("ul", { className: "list-group", children: meals.map(m => _jsx("li", { className: "list-group-item d-flex justify-content-between align-items-center", children: m.name }, m.id)) })] }));
};
export default MealsPage;
