import React from 'react';
import i18n from '../i18n/config';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n: inst } = useTranslation();
  const current = inst.language;
  const change = (lng: string) => {
    inst.changeLanguage(lng);
    localStorage.setItem('nb_lang', lng);
  };
  return (
    <div className="btn-group" role="group" aria-label="Language switcher">
      <button type="button" className={`btn btn-sm btn-outline-light ${current==='en'?'active':''}`} onClick={() => change('en')}>EN</button>
      <button type="button" className={`btn btn-sm btn-outline-light ${current==='pt'?'active':''}`} onClick={() => change('pt')}>PT</button>
    </div>
  );
};
export default LanguageSwitcher;
