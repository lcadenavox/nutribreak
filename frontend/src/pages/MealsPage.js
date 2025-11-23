import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useApi, fetchMeals, createMeal } from '../services/api';
import { useTranslation } from 'react-i18next';
const MealsPage = () => {
    const api = useApi();
    const { t } = useTranslation();
    const [meals, setMeals] = useState([]);
    const [items, setItems] = useState('');
    const [calories, setCalories] = useState('');
    const load = async () => {
        const data = await fetchMeals(api);
        setMeals(data);
    };
    useEffect(() => { load(); }, []);
    const submit = async (e) => {
        e.preventDefault();
        if (!items)
            return;
        await createMeal({ items, calories: Number(calories) || 0 }, api);
        setItems('');
        setCalories('');
        load();
    };
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "mb-3", children: t('meals.title') }), _jsxs("form", { className: "row g-2 mb-3", onSubmit: submit, children: [
                _jsx("div", { className: "col-md-6", children: _jsx("input", { className: "form-control", value: items, placeholder: "Descrição da refeição (ex: Café da manhã)", onChange: e => setItems(e.target.value) }) }),
                _jsx("div", { className: "col-md-3", children: _jsx("input", { type: "number", className: "form-control", value: calories, placeholder: "Calorias (ex: 300)", onChange: e => setCalories(e.target.value) }) }),
                _jsx("div", { className: "col-md-3 d-grid", children: _jsx("button", { type: "submit", className: "btn btn-success", children: t('btn.add') }) })] }), _jsx("ul", { className: "list-group", children: meals.map(m => _jsx("li", { className: "list-group-item d-flex justify-content-between align-items-center", children: _jsxs("span", { children: [m.items || m.name, m.calories != null ? ` - ${m.calories} kcal` : ''] }) }, m.id)) })] }));
};
export default MealsPage;
