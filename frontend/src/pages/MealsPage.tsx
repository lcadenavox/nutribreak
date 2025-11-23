import React, { useEffect, useState } from 'react';
import { useApi, fetchMeals, MealDTO, createMeal } from '../services/api';
import { useTranslation } from 'react-i18next';

const MealsPage: React.FC = () => {
  const api = useApi();
  const { t } = useTranslation();
  const [meals, setMeals] = useState<MealDTO[]>([]);
  const [items, setItems] = useState('');

  const load = async () => {
    const data = await fetchMeals(api);
    setMeals(data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items) return;
    await createMeal({ items }, api);
    setItems('');
    load();
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3">{t('meals.title')}</h3>
      <form className="row g-2 mb-3" onSubmit={submit}>
        <div className="col-auto flex-grow-1">
          <input className="form-control" value={items} placeholder={t('meal.placeholder')} onChange={e => setItems(e.target.value)} />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">{t('btn.add')}</button>
        </div>
      </form>
      <ul className="list-group">
        {meals.map(m => <li key={m.id} className="list-group-item d-flex justify-content-between align-items-center">{m.items}</li>)}
      </ul>
    </div>
  );
};

export default MealsPage;
