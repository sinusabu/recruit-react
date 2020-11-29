import React from 'react';
import './styles/App.css';
import Container from '../src/components/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container containerType={1} />
      </header>
    </div>
  );
}

export default App;
