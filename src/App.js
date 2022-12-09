import './App.css';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Public } from './apps/Public';
import { Private } from './apps/Private';

function App() {
  const { token } = useContext(AuthContext);

  if(token) {
    return <Private/>;
  }
  return <Public/>;
}

export default App;
