import './App.css';
import './index.css';
import React, { useEffect } from 'react';
import { startBatchPolling } from './batchProcessor';

import Homepage from './Homepage/Homepage';

function App() {
  useEffect(() => {
    startBatchPolling(); 
  }, []); 

  return (
    <div className="App">
      <Homepage/>
    </div> 
  );
}

export default App;
