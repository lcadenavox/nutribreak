import React, { useEffect, useState } from 'react';
import { useApi, fetchBreaks, BreakRecordDTO, createBreak } from '../services/api';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const BreaksPage: React.FC = () => {
  const api = useApi();
  const { t } = useTranslation();
  const [breaks, setBreaks] = useState<BreakRecordDTO[]>([]);
  const [breakType, setBreakType] = useState('MICRO');
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [, setLang] = useState(i18n.language);

  const load = async () => {
    const data = await fetchBreaks(api);
    setBreaks(data);
  };

  useEffect(() => { 
    load();
    const handleLangChange = () => setLang(i18n.language);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBreak({ breakType, durationMinutes }, api);
    load();
  };

  const translateBreakType = (type: string) => {
    const map: Record<string, string> = {
      'MICRO': t('break.micro'),
      'STRETCH': t('break.stretch'),
      'MEAL': t('break.meal'),
      'HYDRATION': t('break.hydration'),
      'FOCUS_RESET': t('break.focus_reset')
    };
    return map[type] || type;
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3">{t('breaks.title')}</h3>
      <form className="row g-2 mb-3" onSubmit={submit}>
        <div className="col-auto">
          <label htmlFor="breakTypeSelect" className="form-label">{t('break.type')}</label>
          <select id="breakTypeSelect" className="form-select" value={breakType} onChange={e => setBreakType(e.target.value)}>
            <option value="MICRO">{t('break.micro')}</option>
            <option value="STRETCH">{t('break.stretch')}</option>
            <option value="MEAL">{t('break.meal')}</option>
            <option value="HYDRATION">{t('break.hydration')}</option>
            <option value="FOCUS_RESET">{t('break.focus_reset')}</option>
          </select>
        </div>
        <div className="col-auto">
          <label htmlFor="durationInput" className="form-label">{t('break.duration')}</label>
          <input id="durationInput" className="form-control" type="number" min={1} value={durationMinutes} onChange={e => setDurationMinutes(+e.target.value)} />
        </div>
        <div className="col-auto align-self-end">
          <button type="submit" className="btn btn-success">{t('btn.add')}</button>
        </div>
      </form>
      <ul className="list-group">
        {breaks.map(b => (
          <li key={b.id} className="list-group-item">
            <strong>{translateBreakType(b.breakType)}</strong>
            {b.durationMinutes && <span className="ms-2 text-muted">({b.durationMinutes} min)</span>}
            {b.startedAt && <span className="ms-2 text-muted">- {new Date(b.startedAt).toLocaleString()}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreaksPage;
