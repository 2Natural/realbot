// src/components/Dashboard.js (React Frontend)
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

export default function Dashboard() {
  const [botStatus, setBotStatus] = useState({});
  const [tradeAmount, setTradeAmount] = useState('');

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setBotStatus(data));
  }, []);

  return (
    <div className="dashboard">
      <div className="status-panel">
        <h2>Bot Status: {botStatus.active ? '🟢 Running' : '🔴 Stopped'}</h2>
        <div className="metrics">
          <div className="metric-box">
            <h3>Portfolio Value</h3>
            <p>${botStatus.portfolio?.totalValue?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="metric-box">
            <h3>24h Performance</h3>
            <p>{botStatus.performance?.dailyChange?.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <Line data={priceChartData} options={chartOptions} />
        <Bar data={volumeChartData} options={chartOptions} />
      </div>

      <div className="trade-panel">
        <input 
          type="number" 
          value={tradeAmount}
          onChange={(e) => setTradeAmount(e.target.value)}
          placeholder="Amount in ETH"
        />
        <div className="button-group">
          <button className="buy-button" onClick={handleBuy}>BUY</button>
          <button className="sell-button" onClick={handleSell}>SELL</button>
        </div>
      </div>

      <div className="alerts-panel">
        <h3>Recent Alerts</h3>
        {botStatus.alerts?.map((alert, i) => (
          <div key={i} className={`alert ${alert.type}`}>
            [{alert.time}] {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
}
