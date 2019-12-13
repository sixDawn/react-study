import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.less'
import styles from './index.module.less'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.itemWrarp}>1644</div>
        <div className='boxred'>1644</div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
