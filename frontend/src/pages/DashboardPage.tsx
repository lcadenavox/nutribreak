import React, { useState, useEffect } from 'react';
import { getSuggestion, SuggestionRequestDTO, SuggestionResponseDTO } from '../services/api';
import { useApi } from '../services/api';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const DashboardPage: React.FC = () => {
  const api = useApi();
  const { t } = useTranslation();
  const [req, setReq] = useState<SuggestionRequestDTO>({ language: i18n.language, mood: 5, energy: 5 });
  const [resp, setResp] = useState<SuggestionResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const data = await getSuggestion(req, api);
      setResp(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3">{t('suggestion.title')}</h3>
      <form className="row g-3 align-items-end" onSubmit={e => { e.preventDefault(); submit(); }}>
        <div className="col-auto">
          <label className="form-label" htmlFor="moodInput">{t('form.mood')}</label>
          <input id="moodInput" className="form-control" type="number" min={1} max={10} value={req.mood} onChange={e => setReq(r => ({ ...r, mood: +e.target.value }))} />
        </div>
        <div className="col-auto">
          <label className="form-label" htmlFor="energyInput">{t('form.energy')}</label>
          <input id="energyInput" className="form-control" type="number" min={1} max={10} value={req.energy} onChange={e => setReq(r => ({ ...r, energy: +e.target.value }))} />
        </div>
        <div className="col-auto">
          <label className="form-label" htmlFor="screenInput">{t('form.screen')}</label>
          <input id="screenInput" className="form-control" type="number" value={req.screenTimeMinutes || 0} onChange={e => setReq(r => ({ ...r, screenTimeMinutes: +e.target.value }))} />
        </div>
        <div className="col-auto">
          <label className="form-label" htmlFor="langSelect">{t('form.lang')}</label>
          <select id="langSelect" className="form-select" value={req.language} onChange={e => setReq(r => ({ ...r, language: e.target.value }))}>
            <option value="en">EN</option>
            <option value="pt">PT</option>
          </select>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? '...' : t('suggestion.get')}</button>
        </div>
      </form>
      {resp && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{resp.recommendedBreakType}</h5>
            <p className="card-text">{resp.suggestionText}</p>
            <span className="badge text-bg-secondary">{resp.recommendedMealIdea}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
