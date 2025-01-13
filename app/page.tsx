"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [attendees, setAttendees] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [annualSalary, setAnnualSalary] = useState(80000);    
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
  const [showAlert, setShowAlert] = useState(false);
  const [lastProductsToBeSold, setLastProductsToBeSold] = useState(0);
  const [productName, setProductName] = useState('Tonieboxes');
  const [productImageUrl, setProductImageUrl] = useState('https://res.cloudinary.com/tonies/image/fetch/f_auto,q_60,c_fill,b_rgb:ffffff,w_1336,h_1002/https://278163f382d2bab4b036-4f5ec62496a160f3570d3b6e48fc4516.ssl.cf3.rackcdn.com/Toniebox_red_d-DrP5n54q.png');

  useEffect(() => {
    let timer: number | null = null;
    //let timer: NodeJS.Timeout | null = null; // Initialize with null
    if (isRunning && !isPaused) {
      timer = window.setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        const elapsed = (elapsedTime + 1) / 3600; // Hours
        const meetingCost = attendees * hourlyRate * elapsed;
        setCost(meetingCost);
        const newProductsToBeSold = Math.ceil(meetingCost / productPrice);
        setProductsToBeSold(newProductsToBeSold);
      }, 1000);
    } else if (!isRunning && startTime !== null) {
      if (timer !== null) {
        clearTimeout(timer);
      }
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
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
    setLastProductsToBeSold(productsToBeSold);
    setProductsToBeSold(1);
    setShowAlert(true);
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

  const handleAnnualSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const annualSalary = Number(e.target.value);
    setAnnualSalary(annualSalary);
    const calculatedHourlyRate = Math.round(annualSalary / (12 * 22 * 8)*1.3);
    setHourlyRate(calculatedHourlyRate);
  };


  return (
    <>
      <div className="md:container md:mx-auto min-h-screen flex w-full flex-col p-4 bg-gray-100 items-center">
        <header className="w-full mt-4">
          <h1 className="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black text-4xl text-center">⏰ Time is money 💰</h1>
        </header>
        {showAlert && (
          <div className="alert alert-warning shadow-lg mt-4">
            <div>
              <span>🤑 We spent the <strong>margin from {lastProductsToBeSold} {productName}</strong> for the last meeting. You can do better! 💪</span>
            </div>
          </div>
        )}
        {!isRunning ? (
          <div className="bg-white p-6 rounded-lg">
            <div className="mt-4">
              <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">Attendees:</label>
              <input type="number" id="attendees" className="input mt-1 block w-full" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} />
              <input type="range" id="attendees" min="3" max="30" className="range range-error mt-1 block w-full" step="1" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))}/>
<div className="flex w-full justify-between px-2 text-xs">
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
                  <label htmlFor="annualSalary" className="block text-sm font-medium text-gray-700">Avg. Annual Salary ({getCurrencySymbol(currency)}):</label>
                  <input type="number" id="annualSalary" className="input mt-1 block w-full" value={annualSalary} onChange={handleAnnualSalaryChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Avg. Hourly Rate ({getCurrencySymbol(currency)}):</label>
                  <input type="number" id="hourlyRate" className="input mt-1 block w-full" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
                </div>
                <div className="mb-4">
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Profit per Product ({getCurrencySymbol(currency)}):</label>
                  <input type="number" id="productPrice" className="input mt-1 block w-full" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} />
                </div>
                <div className="mb-4">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name (plural):</label>
                  <input type="text" id="productName" className="input mt-1 block w-full" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-700">Product Image URL (png, jpg, gif):</label>
                  <input type="text" id="productImageUrl" className="input mt-1 block w-full" value={productImageUrl} onChange={(e) => setProductImageUrl(e.target.value)} />
                </div>
              </div>
            )}
            <div className="divider"></div>
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
                  <div className="stat-title">Cost incurred</div>
                  <div className="stat-value">{getCurrencySymbol(currency)} {formatCost(cost)}</div>
                </div>
              </div>
              <div className="stats stats-vertical lg:stats-horizontal shadow flex">
              
              
                <div className="stat bg-primary  text-primary-content strong inline-block">
                  <div className="stat-title text-primary-content"><strong>{productName} needed to be sold to recover cost</strong></div>
                  <div className="stat-value">{productsToBeSold}</div>
                </div>
            </div>
            <div key={flyoutKey} className={`card bg-base-10 shadow-xl flex items-center `}>
              <figure>
                <img
                  className={`flex items-center ${!triggerFlyout ? 'animate-pulse' : 'animate-flyout'}`}
                  src={productImageUrl}
                  alt={productName} />
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