import React, { useEffect, useState } from 'react';
import { useApi, fetchUsers, UserDTO } from '../services/api';
import { useTranslation } from 'react-i18next';

const UsersPage: React.FC = () => {
  const api = useApi();
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserDTO[]>([]);

  const load = async () => {
    try {
      const data = await fetchUsers(api);
      setUsers(data);
    } catch (e) {
      // Likely 403 if not admin; silently ignore
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="mb-4">
      <h3 className="mb-3">{t('users.title')}</h3>
      {users.length === 0 && <div className="alert alert-warning">No access or empty.</div>}
      <ul className="list-group">
        {users.map(u => <li key={u.id} className="list-group-item d-flex justify-content-between"><span>{u.username}</span><small className="text-muted">{u.roles && u.roles.join(',')}</small></li>)}
      </ul>
    </div>
  );
};

export default UsersPage;
