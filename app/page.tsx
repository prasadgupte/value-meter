"use client";

import { useState, useEffect } from 'react';
import FlyonuiScript from '../components/FlyonuiScript';

export default function Home() {
  const [attendees, setAttendees] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [productPrice, setProductPrice] = useState(30);
  const [cost, setCost] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [flyoutKey, setFlyoutKey] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        const elapsed = (elapsedTime + 1) / 3600; // Hours
        const meetingCost = attendees * hourlyRate * elapsed;
        setCost(meetingCost);
        setFlyoutKey((prevKey) => prevKey + 1); // Trigger flyout animation
      }, 1000);
    } else if (!isRunning && startTime !== null) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, elapsedTime, attendees, hourlyRate, startTime]);

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setElapsedTime(0);
    setCost(0);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0
      ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const productsToBeSold = Math.ceil(cost / productPrice);

  return (
    <>
      <FlyonuiScript />
      <div className="grid grid-cols-1 gap-4 min-h-screen p-4 bg-gray-100">
        <header className="w-full mb-4">
          <h1 className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black text-4xl text-center">⏰ Value Meter</h1>
        </header>
        <blockquote className="w-full text-center mb-4">“Time is money.” – Benjamin Franklin</blockquote>
        {!isRunning ? (
          <div className="card bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company:</label>
              <select id="company" className="input mt-1 block w-full">
                <option value="tonies GmbH">tonies GmbH</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency:</label>
              <select id="currency" className="input mt-1 block w-full" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
                <option value="CHF">CHF</option>
                <option value="CNY">CNY</option>
                <option value="SEK">SEK</option>
                <option value="NZD">NZD</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">Attendees:</label>
              <input type="number" id="attendees" className="input mt-1 block w-full" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} />
            </div>
            <div className="mb-4">
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate ({currency}):</label>
              <input type="number" id="hourlyRate" className="input mt-1 block w-full" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
            </div>
            <div className="mb-4">
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Profit per Product ({currency}):</label>
              <input type="number" id="productPrice" className="input mt-1 block w-full" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} />
            </div>
            <div className="flex justify-between">
              <button className="btn btn-primary w-full mr-2" onClick={startTimer}>Start</button>
              <button className="btn btn-secondary w-full ml-2" onClick={stopTimer}>Reset</button>
            </div>
          </div>
        ) : (
          <div className="card bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <div key={flyoutKey} className="animate-flyout">
              <div className="card bg-white p-2 rounded-lg shadow-md">
                <img src="https://res.cloudinary.com/tonies/image/fetch/f_auto,q_60,c_fill,b_rgb:ffffff,w_1336,h_1002/https://278163f382d2bab4b036-4f5ec62496a160f3570d3b6e48fc4516.ssl.cf3.rackcdn.com/10000054-UK-d-J1S0_d-IBEbXcx_.png" alt="Flyout" className="w-full max-w-xs h-auto rounded-lg shadow" />
              </div>
            </div>
            <div className="stats stats-vertical w-full">
              <div className="stat">
                <div className="stat-title">Time Elapsed</div>
                <div className="stat-value">{formatTime(elapsedTime)}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Cost of the Meeting</div>
                <div className="stat-value">{currency} {cost.toFixed(2)}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Products to be Sold</div>
                <div className="stat-value">{productsToBeSold}</div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button className="btn btn-primary w-full mr-2" onClick={stopTimer}>End meeting</button>
              <button className="btn btn-secondary w-full ml-2" onClick={pauseTimer}>{isPaused ? 'Resume' : 'Pause'}</button>
            </div>
            
          </div>
        )}
        <footer className="w-full bg-base-200/60 items-center rounded-t-box px-6 py-4 shadow mt-auto">
          <aside className="grid-flow-col items-center">
            <p>&copy; {new Date().getFullYear()} Prasad Gupte (prasadgupte.com)</p>
          </aside>
          <nav className="text-base-content grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a className="link link-hover" href="#">Contact</a>
          </nav>
        </footer>
      </div>
    </>
  );
}