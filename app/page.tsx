"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [attendees, setAttendees] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [productPrice, setProductPrice] = useState(30);
  const [cost, setCost] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [flyoutKey, setFlyoutKey] = useState(0);
  const [productsToBeSold, setProductsToBeSold] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [triggerFlyout, setTriggerFlyout] = useState(false);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        const elapsed = (elapsedTime + 1) / 3600; // Hours
        const meetingCost = attendees * hourlyRate * elapsed;
        setCost(meetingCost);
        const newProductsToBeSold = Math.ceil(meetingCost / productPrice);
        setProductsToBeSold(newProductsToBeSold);
      }, 1000);
    } else if (!isRunning && startTime !== null) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, elapsedTime, attendees, hourlyRate, startTime]);

  useEffect(() => {
    if (isRunning) {
      setFlyoutKey((prevKey) => prevKey + 1); // Trigger flyout animation when productsToBeSold changes
      //setShowToast(true);
      setTriggerFlyout(true);
      setTimeout(() => {
        setShowToast(false);
        setTriggerFlyout(false);
      }, 2000); // Hide toast after 2 seconds
    }
  }, [productsToBeSold]);

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setElapsedTime(0);
    setCost(0);
    setProductsToBeSold(1);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0
      ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatCost = (cost: number) => {
    const roundedCost = Math.round(cost);
    if (roundedCost > 9999) {
      return `${(roundedCost / 1000).toFixed(1)}K`;
    }
    return roundedCost.toString();
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'CHF',
      CNY: '¥',
      SEK: 'kr',
      NZD: 'NZ$',
    };
    return symbols[currency] || currency;
  };

  return (
    <>
      <div className="md:container md:mx-auto min-h-screen p-4 bg-gray-100 items-center">
        <header className="w-full mb-4">
          <h1 className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black text-4xl text-center">⏰ Value Meter</h1>
        </header>
        <blockquote className="w-full text-center mb-4">“Time is money.” – Benjamin Franklin</blockquote>
        {!isRunning ? (
          <div className="card bg-white p-6 rounded-lg">
            <div className="mb-4">
              <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">Attendees:</label>
              <input type="number" id="attendees" className="input mt-1 block w-full" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} />
              <input type="range" id="attendees" min="3" max="30" className="range range-error mt-1 block w-full" step="1" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))}/>
<div class="flex w-full justify-between px-2 text-xs">
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
</div>


            </div>

            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setIsSettingsCollapsed(!isSettingsCollapsed)}>⚙️ Settings</a>
            {!isSettingsCollapsed && (
              <div className="mb-4">
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
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate ({getCurrencySymbol(currency)}):</label>
                  <input type="number" id="hourlyRate" className="input mt-1 block w-full" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
                </div>
                <div className="mb-4">
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Profit per Product ({getCurrencySymbol(currency)}):</label>
                  <input type="number" id="productPrice" className="input mt-1 block w-full" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} />
                </div>
              </div>
            )}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
              <button className="btn btn-lg btn-primary mr-2" onClick={startTimer}>Start</button>
              <button className="btn btn-lg btn-secondary ml-2" onClick={stopTimer}>Reset</button>
            </div>
          </div>
        ) : (
          <div className="shadow-md w-full max-w-md mx-auto">
            <div className="stats stats-vertical lg:stats-horizontal shadow flex">
                <div className="stat">
                  <div className="stat-title">Time Elapsed</div>
                  <div className="stat-value">{formatTime(elapsedTime)}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Meeting cost</div>
                  <div className="stat-value">{getCurrencySymbol(currency)} {formatCost(cost)}</div>
                </div>
              </div>
              <div className="stats stats-vertical lg:stats-horizontal shadow flex">
              
              
                <div className="stat bg-primary  text-primary-content strong inline-block">
                  <div className="stat-title text-primary-content"><strong>Tonieboxes to be Sold</strong></div>
                  <div className="stat-value">{productsToBeSold}</div>
                </div>
            </div>
            <div key={flyoutKey} className={`card bg-base-10 shadow-xl flex items-center `}>
              <figure>
                <img
                  className={`flex items-center ${!triggerFlyout ? 'animate-pulse' : 'animate-flyout'}`}
                  src="https://res.cloudinary.com/tonies/image/fetch/f_auto,q_60,c_fill,b_rgb:ffffff,w_1336,h_1002/https://278163f382d2bab4b036-4f5ec62496a160f3570d3b6e48fc4516.ssl.cf3.rackcdn.com/10000058-UK-d-2FIkIQJk.png"
                  alt="Toniebox" />
              </figure>
              {/*<div className="card-body">
                <h2 className="card-title">
                  Toniebox
                  <div className="badge badge-secondary">NEW</div>
                </h2>                
              </div>*/}
            </div>  
                           
              <div className="bg-base-100 items-center">
                <button className="btn btn-lg btn-primary mr-2" onClick={stopTimer}>End meeting</button>
                <button className="btn btn-lg btn-secondary ml-2" onClick={pauseTimer}>{isPaused ? 'Resume' : 'Pause'}</button>
              </div>

          </div>
        )}
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-info animate-fade-out">
              <span>And another one</span>
            </div>
          </div>
        )}
        <footer className="w-full bg-base-200/60 items-center rounded-t-box px-6 py-4 shadow mt-auto">
          <aside className="grid-flow-col items-center">
            <p>&copy; {new Date().getFullYear()} <a className="link link-hover" href="https://prasadgupte.com">Prasad Gupte</a></p>
          </aside>          
        </footer>
      </div>
    </>
  );
}