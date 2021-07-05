import React from 'react';
import { Suspense } from 'react';
import './App.css';
const WeatherBox = React.lazy(() => import("./Weather-box"))

function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Weather App</h1>
        <Suspense fallback={<div className="spinner">Loading...</div>}>
          <WeatherBox/>
        </Suspense>
      </header>
    </div>
  );
}

export default App;
