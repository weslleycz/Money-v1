import { DarkModeProvider } from '@rbnd/react-dark-mode';
import './App.scss';
import Routes from './Routes';

export default function App() {
  return (
    <>
      <DarkModeProvider>
        <Routes />
      </DarkModeProvider>
    </>
  );
}
