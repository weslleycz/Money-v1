import { useDarkMode } from '@rbnd/react-dark-mode';
import { useEffect } from 'react';
import {
  Routes as ContainerRoutes,
  Navigate,
  Route,
  MemoryRouter as Router,
} from 'react-router-dom';
import { ContainerMui } from './components/Container';
import { Config } from './screens/Config';
import { Dashboard } from './screens/Dashboard';
import { Registration } from './screens/Registration';
import { Login } from './screens/Login';

export default function Routes() {
  const { mode, setMode } = useDarkMode();

  useEffect(() => {
    setMode(window.electron.store.get('theme'));
  }, []);

  return (
    <Router>
      <ContainerMui>
        <ContainerRoutes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/config" element={<Config />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          {window.electron.store.get('user') === undefined ? (
            <Route path="/" element={<Navigate to="/registration" />} />
          ) : window.electron.store.get('block') ? (
            <Route path="/" element={<Navigate to="/login" />} />
          ) : (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          )}
        </ContainerRoutes>
      </ContainerMui>
    </Router>
  );
}
//
