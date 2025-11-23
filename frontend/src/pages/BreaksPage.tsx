import React, { useEffect, useState } from 'react';
import { useApi, fetchBreaks, BreakRecordDTO, createBreak } from '../services/api';
import { useTranslation } from 'react-i18next';

const BreaksPage: React.FC = () => {
  const api = useApi();
  const { t } = useTranslation();
  const [breaks, setBreaks] = useState<BreakRecordDTO[]>([]);
  const [breakType, setBreakType] = useState('MICRO');

  const load = async () => {
    const data = await fetchBreaks(api);
    setBreaks(data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBreak({ breakType }, api);
    load();
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3">{t('breaks.title')}</h3>
      <form className="row g-2 mb-3" onSubmit={submit}>
        <div className="col-auto">
          <label htmlFor="breakTypeSelect" className="form-label">{t('break.type')}</label>
          <select id="breakTypeSelect" className="form-select" value={breakType} onChange={e => setBreakType(e.target.value)}>
            <option value="MICRO">MICRO</option>
            <option value="STRETCH">STRETCH</option>
            <option value="MEAL">MEAL</option>
            <option value="FOCUS_RESET">FOCUS_RESET</option>
          </select>
        </div>
        <div className="col-auto align-self-end">
          <button type="submit" className="btn btn-success">{t('btn.add')}</button>
        </div>
      </form>
      <ul className="list-group">
        {breaks.map(b => <li key={b.id} className="list-group-item">{b.breakType}</li>)}
      </ul>
    </div>
  );
};

export default BreaksPage;
