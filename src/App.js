import React from 'react';
import './App.css';

function App() {
  const [result, setResult] = React.useState(null);
  const [firstNumber, setFirstNumber] = React.useState(0);
  const [secondNumber, setSecondNumber] = React.useState(0);
  const [error, setError] = React.useState(null);

  const getAddResult = () => {
    setResult(null);
    if (firstNumber === '' || secondNumber === '') {
      setError('Please enter both numbers');
      return;
    }
    
    setError(null);

    fetch('api/v1/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: Number(firstNumber), b: Number(secondNumber)})
    })
    .then(response => response.json())
    .then(data => setResult(data.result))
    .catch(error => console.error('Error:', error));
  }

  const getSubResult = () => {
    setResult(null);
    if (firstNumber === '' || secondNumber === '') {
      setError('Please enter both numbers');
      return;
    }

    setError(null);

    fetch('api/v1/subtract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: Number(firstNumber), b: Number(secondNumber)})
    })
    .then(response => response.json())
    .then(data => setResult(data.result))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className="App" style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ padding: '20px' }}>
        <label>First Number: <input type="number" onChange={(e) => setFirstNumber(e.target.value)} /></label>
      </div>
      <div style={{ padding: '20px' }}>
        <label>Second Number: <input type="number" onChange={(e) => setSecondNumber(e.target.value)} /></label>
      </div>
      <button onClick={getAddResult}>Add</button>
      <button onClick={getSubResult}>Subtract</button>
      {result !== null && <p>Result: {result}</p>}
      {error !== null && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
