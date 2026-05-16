import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './theme/ThemeProvider.jsx';
import { IOSDevice } from './frame/IOSDevice.jsx';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { PatternsScreen } from './screens/PatternsScreen.jsx';
import { AlertsScreen } from './screens/AlertsScreen.jsx';
import { MoreScreen } from './screens/MoreScreen.jsx';
import { RegisterMenu } from './screens/RegisterMenu.jsx';
import { MealScreen } from './screens/MealScreen.jsx';
import { InsulinScreen } from './screens/InsulinScreen.jsx';
import { ActivityScreen } from './screens/ActivityScreen.jsx';
import { BottomNav } from './components/BottomNav.jsx';
import { TweaksPanel } from './components/TweaksPanel.jsx';
import { BottomSheet } from './components/BottomSheet.jsx';

function AppContent() {
  const { T, mode, toggle } = useTheme();
  const [tab, setTab] = useState('home');
  const [stateKey, setStateKey] = useState('rising');
  const [tweaksOpen, setTweaksOpen] = useState(true);
  const [registerSheet, setRegisterSheet] = useState({ open: false, type: null });

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') window.__setTweaksOpen?.(true);
      else if (e.data?.type === '__deactivate_edit_mode') window.__setTweaksOpen?.(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => { window.__setTweaksOpen = setTweaksOpen; }, []);

  const openRegister = (type) => setRegisterSheet({ open: true, type });
  const closeRegister = () => setRegisterSheet(s => ({ ...s, open: false }));

  const screen = tab === 'patterns' ? <PatternsScreen stateKey={stateKey}/>
               : tab === 'more' ? <MoreScreen/>
               : tab === 'alerts' ? <AlertsScreen stateKey={stateKey}/>
               : <HomeScreen stateKey={stateKey} setStateKey={setStateKey} onRegister={openRegister}/>;

  return (
    <IOSDevice dark={mode === 'dark'} width={430} height={932}>
      <div data-screen-label="01 Home / Predição" style={{
        position: 'absolute', inset: 0,
        background: T.bg,
        color: T.textHi,
        fontFamily: '-apple-system, "SF Pro Display", "Inter", system-ui, sans-serif',
        display: 'flex', flexDirection: 'column',
      }}>
        <div className="sg-scroll" style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          paddingTop: 54,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          {screen}
        </div>
        <BottomNav tab={tab} setTab={setTab} onPrimaryAction={() => openRegister('menu')}/>
      </div>

      <BottomSheet open={registerSheet.open} onClose={closeRegister}>
        {registerSheet.type === 'menu' && (
          <RegisterMenu onPick={openRegister} onClose={closeRegister}/>
        )}
        {registerSheet.type === 'meal' && (
          <MealScreen onClose={closeRegister} onSave={() => {}}/>
        )}
        {registerSheet.type === 'insulin' && (
          <InsulinScreen onClose={closeRegister} onSave={() => {}} stateKey={stateKey}/>
        )}
        {registerSheet.type === 'activity' && (
          <ActivityScreen onClose={closeRegister} onSave={() => {}}/>
        )}
      </BottomSheet>

      {tweaksOpen && (
        <TweaksPanel
          stateKey={stateKey} setStateKey={setStateKey}
          tab={tab} setTab={setTab}
          mode={mode} onToggleTheme={toggle}
          onClose={() => {
            setTweaksOpen(false);
            window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
          }}
        />
      )}
    </IOSDevice>
  );
}

export function App() {
  return <ThemeProvider><AppContent/></ThemeProvider>;
}
