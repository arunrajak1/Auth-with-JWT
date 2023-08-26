import { useState } from 'react';
import './App.css';
import LoginPage from './Componets/LoginPage/LoginPage';
import RecordScreen from './Componets/RecordingMedia/RecordScreen';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };
  return (
    <div className="App">
    {!user ? (
      <LoginPage onLogin={handleLogin} />
    ) : (
      <div className='mt-5'>
        <h1 className='text-2xl mb-5 font-serif'>Welcome, {user.name}!</h1>
        <RecordScreen></RecordScreen>
      </div>
    )}
  </div>
  );
}

export default App;
