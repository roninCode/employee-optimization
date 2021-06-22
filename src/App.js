import logo from './logo.svg';
import './App.css';
import {createStafing} from 'util/helpers'


function App() {
  createStafing()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
