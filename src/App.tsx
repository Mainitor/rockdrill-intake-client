import React from 'react';
import './App.css';
import SampleCollection from './pages/SampleCollection';

const MAJOR_VERSION = 1;
const MINOR_VERSION = 0;
const PATCH_VERSION = 5;

export const APP_VERSION = `v${MAJOR_VERSION}.${MINOR_VERSION} - ${PATCH_VERSION}`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SampleCollection />
        <p className='app_version'>{APP_VERSION}</p>
      </header>
    </div>
  );
}

export default App;
