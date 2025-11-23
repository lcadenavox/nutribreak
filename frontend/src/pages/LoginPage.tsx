import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const nav = useNavigate();
  // Default to seeded admin credentials (email used as username for Basic Auth)
  const [username, setUsername] = useState('admin@nutribreak.local');
  const [password, setPassword] = useState('Admin123!');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    nav('/');
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-3">{t('login.title')}</h4>
            <form onSubmit={submit} className="vstack gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="nbUser">{t('login.username')} (email)</label>
                <input id="nbUser" className="form-control" value={username} placeholder={t('login.username')} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="nbPass">{t('login.password')}</label>
                <input id="nbPass" type="password" className="form-control" value={password} placeholder={t('login.password')} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100">{t('login.submit')}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
